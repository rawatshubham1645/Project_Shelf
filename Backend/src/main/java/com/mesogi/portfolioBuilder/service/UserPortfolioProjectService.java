package com.mesogi.portfolioBuilder.service;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.mesogi.portfolioBuilder.dto.PortfolioProjectDto;
import com.mesogi.portfolioBuilder.dto.UserPortfolioProjectResponse;
import com.mesogi.portfolioBuilder.exception.BadRequestException;
import com.mesogi.portfolioBuilder.model.PortfolioProjects;
import com.mesogi.portfolioBuilder.model.User;
import com.mesogi.portfolioBuilder.repository.IPortfolioProjectsRepoitory;
import com.mesogi.portfolioBuilder.repository.UserRepository;

@Service
public class UserPortfolioProjectService {
	
    @Autowired
    private UserRepository userRepository;

    @Autowired
    private IPortfolioProjectsRepoitory iPortfolioProjectsRepoitory;
    
    public PortfolioProjectDto userPortfolioProjectGet(String uniqueName, String uid, String ip) {
        User user = userRepository.findByProfileIdIgnoreCase(uniqueName)
                .orElseThrow(() -> new BadRequestException("User with unique name '" + uniqueName + "' not found"));

        PortfolioProjects project = iPortfolioProjectsRepoitory.findByUid(uid);
        if (project == null) {
            throw new BadRequestException("No portfolio project found");
        }

        if (!project.getOwner().getId().equals(user.getId())) {
            throw new BadRequestException("The requested portfolio project does not belong to this user.");
        }

        // Update view counts
        project.setViewCount(project.getViewCount() + 1);
        if (project.getDistinctVisitorIps().add(ip)) {
            project.setUniqueViewCount(project.getUniqueViewCount() + 1);
        }

        iPortfolioProjectsRepoitory.save(project);

        return PortfolioProjectDto.mapToResponse(project);
    }
    
    public UserPortfolioProjectResponse getUserPortfolioProjects(String profileId, String ip) {
        User user = userRepository.findByProfileIdIgnoreCase(profileId)
                .orElseThrow(() -> new BadRequestException("User with profile ID '" + profileId + "' not found"));

        List<PortfolioProjects> projects = iPortfolioProjectsRepoitory.findByOwner(user);

        // Update view counts
        user.setViewCount(user.getViewCount() + 1);
        if (user.getDistinctVisitorIps().add(ip)) {
            user.setUniqueViewCount(user.getUniqueViewCount() + 1);
        }
        userRepository.save(user);

        List<PortfolioProjectDto> projectDtos = projects.stream()
                .map(PortfolioProjectDto::mapToResponse)
                .collect(Collectors.toList());

        return new UserPortfolioProjectResponse(
                user.getFirstName(),
                user.getLastName(),
                user.getEmail(),
                user.getNameToShow(),
                user.getProfileSummary(),
                user.getMobileNumber(),
                user.getPhotoUrl(),
                user.getLinkedinLink(),
                user.getTwitterLink(),
                user.getFacebookLink(),
                user.getJobTitle(),
                user.getContactAddress(),
                user.getProfileId(),
                user.getThemeId(),
                projectDtos
        );
    }
}
