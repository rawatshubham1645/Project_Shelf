package com.masai.projectshelf.service.eventListeners;

import javax.mail.MessagingException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.ApplicationListener;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Component;

import com.masai.projectshelf.service.EmailService;
import com.masai.projectshelf.service.event.UserSignupEvent;

@Component
public class UserSignupEventListener implements ApplicationListener<UserSignupEvent> {

    @Autowired
    private EmailService emailService;

    @Async
    @Override
    public void onApplicationEvent(UserSignupEvent event) {
    	 try {
	        if ("FORGOT_PASSWORD".equalsIgnoreCase(event.getType())) {
	            emailService.sendForgotPasswordOtpEmail(event.getEmail(), event.getSubject(), event.getName(), event.getOtp());
	        } else {
	            emailService.sendSignupOtpEmail(event.getEmail(), event.getSubject(), event.getName(), event.getOtp());
	        }
    	 }catch (MessagingException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
    }
}
