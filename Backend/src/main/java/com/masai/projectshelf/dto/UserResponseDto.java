package com.masai.projectshelf.dto;

import java.util.Map;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class UserResponseDto {
	private String email;
    private String ipAddress;
    private String submittedAt;
    private Map<String, Object> answers; // parsed from JSON
}
