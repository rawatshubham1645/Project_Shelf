package com.masai.projectshelf.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.masai.projectshelf.model.User;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {
    Optional<User> findByEmail(String email);
//    boolean existsByUniqueNameIgnoreCase(String uniqueName);
    
//    Optional<User> findByUniqueNameIgnoreCase(String uniqueName);

}
