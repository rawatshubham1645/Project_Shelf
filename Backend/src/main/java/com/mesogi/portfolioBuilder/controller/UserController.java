package com.mesogi.portfolioBuilder.controller;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.ApplicationEventPublisher;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.mesogi.portfolioBuilder.config.JwtUtil;
import com.mesogi.portfolioBuilder.dto.AuthenticationResponse;
import com.mesogi.portfolioBuilder.dto.MessageResponse;
import com.mesogi.portfolioBuilder.dto.UserDto;
import com.mesogi.portfolioBuilder.exception.InvalidCredentialsException;
import com.mesogi.portfolioBuilder.model.User;
import com.mesogi.portfolioBuilder.repository.UserRepository;
import com.mesogi.portfolioBuilder.service.ContextService;
import com.mesogi.portfolioBuilder.service.OtpService;
import com.mesogi.portfolioBuilder.service.UserService;

@RestController
@RequestMapping("/api/users")
public class UserController {

    @Autowired
    private UserService userService;
    
    @Autowired
    private UserRepository userRepository;

    @Autowired
    private JwtUtil jwtUtil;

    @Autowired
    private PasswordEncoder passwordEncoder;
    
    @Autowired
    private ApplicationEventPublisher publisher;
    
    @Autowired
    private OtpService otpService;  
    
    @Autowired
    private ContextService ContextService;
    
    @PostMapping("/register/request-otp")
    public ResponseEntity<?> requestOtp(@Valid @RequestBody UserDto userDTO) {
        if (userService.findByEmail(userDTO.getEmail()).isPresent()) {
            return ResponseEntity.badRequest().body(new MessageResponse("User already exists"));
        }
        otpService.generateAndSendOtp(userDTO.getEmail(), userDTO.getFirstName()+" "+userDTO.getLastName(), "");
        return ResponseEntity.ok(new MessageResponse("OTP sent to your email"));
    }

    @PostMapping("/register")
    public ResponseEntity<?> registerUser(@Valid @RequestBody UserDto userDTO, @RequestParam("otp") String otp) {
    	if (!otpService.validateOtp(userDTO.getEmail(), otp)) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(new MessageResponse("Invalid or expired OTP"));
        }
        User user = userService.register(userDTO);
        String token = jwtUtil.generateToken(user.getEmail());
        return ResponseEntity.ok(new MessageResponse("Welcome! You’ve logged in successfully.", AuthenticationResponse.mapToResponse(user, token)));
    }
    
    @PostMapping("/forgot-password/request-otp")
    public ResponseEntity<?> requestPasswordResetOtp(@RequestParam("email") String email) {
        return userService.findByEmail(email)
                .map(user -> {
                    otpService.generateAndSendOtp(email, user.getFirstName() + " " + user.getLastName(), "FORGOT_PASSWORD");
                    return ResponseEntity.ok(new MessageResponse("OTP sent to your email"));
                })
                .orElse(ResponseEntity.status(HttpStatus.BAD_REQUEST).body(new MessageResponse("User not found")));
    }

    @PostMapping("/forgot-password/reset")
    public ResponseEntity<?> resetPassword(@RequestParam("email") String email, @RequestParam("otp") String otp, @RequestParam("newPassword") String newPassword) {
        if (!otpService.validateOtp(email, otp)) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(new MessageResponse("Invalid or expired OTP"));
        }

        return userService.findByEmail(email)
                .map(user -> {
                    user.setPassword(passwordEncoder.encode(newPassword));
                    userRepository.save(user);
                    return ResponseEntity.ok(new MessageResponse("Password reset successful"));
                })
                .orElse(ResponseEntity.status(HttpStatus.NOT_FOUND).body(new MessageResponse("User not found")));
    }

    @PostMapping("/login")
    public ResponseEntity<?> loginUser(@RequestBody UserDto userDTO) {
        User user = userService.findByEmail(userDTO.getEmail())
                .orElseThrow(() -> new InvalidCredentialsException("Invalid credentials"));

        if (!passwordEncoder.matches(userDTO.getPassword(), user.getPassword())) {
            throw new InvalidCredentialsException("Invalid credentials");
        }

        String token = jwtUtil.generateToken(user.getEmail());
        return ResponseEntity.ok(new MessageResponse("Welcome! You’ve logged in successfully.", AuthenticationResponse.mapToResponse(user, token)));
    }
    
    @PutMapping("/profile")
    public ResponseEntity<?> updateUserProfile(@RequestBody UserDto profileDto) {
        User updatedUser = userService.updateProfile(profileDto);
        return ResponseEntity.ok(new MessageResponse("Profile updated successfully", UserDto.fromUser(updatedUser)));
    }
    
    @GetMapping("/profile")
    public ResponseEntity<?> getUserProfile() {
        User currentUser = ContextService.getCurrentUser();
        return ResponseEntity.ok(UserDto.fromUser(currentUser));
    }
    
    @GetMapping("/dashboard-data")
    public ResponseEntity<?> getUserDashBoardData() {
        return ResponseEntity.ok(new MessageResponse("", userService.getDashBoardData()));
    }
 }