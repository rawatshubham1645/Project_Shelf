package com.mesogi.portfolioBuilder.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;

import com.mesogi.portfolioBuilder.model.User;
import com.mesogi.portfolioBuilder.repository.UserRepository;

@Service
public class ContextService {
    @Autowired
    private UserRepository userRepository;

    public User getCurrentUser() {
        Object principal = SecurityContextHolder.getContext().getAuthentication().getPrincipal();
		String username = "";
		if (principal instanceof UserDetails) {
			username = ((UserDetails) principal).getUsername();
		} else {
			username = principal.toString();
		}
		return userRepository.findByEmail(username).get();
    } 
}
