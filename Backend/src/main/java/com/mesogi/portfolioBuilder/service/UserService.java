package com.mesogi.portfolioBuilder.service;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.mesogi.portfolioBuilder.dto.DashBoardReport;
import com.mesogi.portfolioBuilder.dto.UserDto;
import com.mesogi.portfolioBuilder.enums.Role;
import com.mesogi.portfolioBuilder.exception.BadRequestException;
import com.mesogi.portfolioBuilder.model.User;
import com.mesogi.portfolioBuilder.repository.UserRepository;

@Service
public class UserService {
    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;
    
    @Autowired
    private ContextService contextService;

    public User register(UserDto userDTO) {
        if (userRepository.findByEmail(userDTO.getEmail()).isPresent()) {
            throw new RuntimeException("User already exists");
        }

        User user = new User();
        user.setEmail(userDTO.getEmail());
        user.setPassword(passwordEncoder.encode(userDTO.getPassword()));
        user.setFirstName(userDTO.getFirstName());
        user.setLastName(userDTO.getLastName());
        user.setMobileNumber(userDTO.getMobileNumber());
        user.setRole(Role.valueOf("ADMIN"));
        return userRepository.save(user);
    }

    public Optional<User> findByEmail(String email) {
        return userRepository.findByEmail(email);
    }
    
    public User updateProfile(UserDto profileDto) {
        User user = contextService.getCurrentUser();

        if (profileDto.getFirstName() != null) user.setNameToShow(profileDto.getFirstName());
        if (profileDto.getLastName() != null) user.setProfileSummary(profileDto.getLastName());
        if (profileDto.getDisplayName() != null) user.setNameToShow(profileDto.getDisplayName());
        if (profileDto.getBio() != null) user.setProfileSummary(profileDto.getBio());
        if (profileDto.getProfilePicUrl() != null) user.setPhotoUrl(profileDto.getProfilePicUrl());
        if (profileDto.getMobileNumber() != null) user.setMobileNumber(profileDto.getMobileNumber());
        if (profileDto.getTemplateId() != null) user.setThemeId(profileDto.getTemplateId());

        if (profileDto.getLinkedinUrl() != null) user.setLinkedinLink(profileDto.getLinkedinUrl());
        if (profileDto.getTwitterUrl() != null) user.setTwitterLink(profileDto.getTwitterUrl());
        if (profileDto.getFacebookUrl() != null) user.setFacebookLink(profileDto.getFacebookUrl());
        if (profileDto.getAddress() != null) user.setContactAddress(profileDto.getAddress());
        if (profileDto.getDesignation() != null) user.setJobTitle(profileDto.getDesignation());

        if (user.getProfileId() == null && profileDto.getUniqueName() != null) {
            if (userRepository.existsByProfileIdIgnoreCase(profileDto.getUniqueName())) {
                throw new BadRequestException("Oops! That profile ID is already in use.");
            } else {
                user.setProfileId(profileDto.getUniqueName());
            }
        }

        return userRepository.save(user);
    }

    public DashBoardReport getDashBoardData() {
    	User user = contextService.getCurrentUser();
    	return DashBoardReport.mapToResponse(user);
    }
}
