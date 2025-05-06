package com.masai.projectshelf.service.event;

import org.springframework.context.ApplicationEvent;

import com.masai.projectshelf.service.OtpService;

import lombok.Data;

@Data
public class UserSignupEvent extends ApplicationEvent {
    private final String email;
    private final String subject;
    private final String name;
    private final String otp;
    private final String type;

    public UserSignupEvent(Object source, String email, String subject, String name, String otp, String type) {
        super(source);
        this.email = email;
        this.subject = subject;
        this.name = name;
        this.otp = otp;
        this.type = type;
    }
}