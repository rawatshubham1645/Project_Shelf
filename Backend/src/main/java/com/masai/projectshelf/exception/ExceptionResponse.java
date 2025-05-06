package com.masai.projectshelf.exception;

import java.time.LocalDateTime;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class ExceptionResponse {
	private LocalDateTime timestamp;
    private int status;
    private String error;
    private String message;
    private String path;
    
    private String stackTrace;
}
