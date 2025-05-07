package com.mesogi.portfolioBuilder.model;

import java.util.HashSet;
import java.util.List;
import java.util.Set;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.ElementCollection;
import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.OneToMany;
import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;

import com.mesogi.portfolioBuilder.enums.Role;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity(name = "users")
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    private String firstName;

    private String lastName;

    @Email(message = "Please enter a valid email")
    @NotBlank(message = "Email can't be empty")
    private String email;

    @NotBlank(message = "Password can't be empty")
    private String password;

    @Enumerated(EnumType.STRING)
    private Role role = Role.ADMIN;  
    
    private String mobileNumber;
    
    private String nameToShow;
    
    private String profileId;
    
    private String profileSummary;
    
    private String photoUrl;
    
    private String themeId;
    
    private String linkedinLink;
    
    private String twitterLink;
    
    private String facebookLink;
    
    private String contactAddress;
    
    private String jobTitle;
    
    @Column(columnDefinition = "INT DEFAULT 0")
    private int viewCount = 0;

    @Column(columnDefinition = "INT DEFAULT 0")
    private int uniqueViewCount = 0;

    @ElementCollection(fetch = FetchType.EAGER)
    private Set<String> distinctVisitorIps = new HashSet<>();
    
    @OneToMany(mappedBy = "owner", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<PortfolioProjects> portfolioProjects;    
}
