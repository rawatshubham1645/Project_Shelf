package com.masai.projectshelf.dto;

import javax.validation.constraints.Email;
import javax.validation.constraints.Size;

import com.masai.projectshelf.model.User;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class UserDto {
	private Long id;
    private String firstName;
    private String lastName;

    @Email(message = "Email Format is not correct")
    private String email;
    
    @Size(min = 8, message = "Password must be at least 8 characters")
    private String password;
    private String role;
    
    private String mobileNumber;
    
    public static UserDto fromUser(User user) {
        return new UserDto().builder()
        		.id(user.getId())
        		.firstName(user.getFirstName())
        		.lastName(user.getLastName())
        		.email(user.getEmail())
        		.role(user.getRole().toString())
        		.mobileNumber(user.getMobileNumber())
          		.build();
    }
}
