package com.mesogi.portfolioBuilder.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.mesogi.portfolioBuilder.model.User;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {
	
    Optional<User> findByEmail(String email);
    
    boolean existsByProfileIdIgnoreCase(String profileId);
    
    Optional<User> findByProfileIdIgnoreCase(String profileId);

}
