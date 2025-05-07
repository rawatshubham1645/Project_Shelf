package com.mesogi.portfolioBuilder.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.mesogi.portfolioBuilder.dto.PortfolioProjectDto;
import com.mesogi.portfolioBuilder.exception.BadRequestException;
import com.mesogi.portfolioBuilder.model.PortfolioProjects;
import com.mesogi.portfolioBuilder.model.User;
import com.mesogi.portfolioBuilder.repository.IPortfolioProjectsRepoitory;

@Service
public class PortfolioPojectsServiceImpl {

	@Autowired
	private ContextService contextService;
	
	@Autowired
	private IPortfolioProjectsRepoitory iPortfolioProjectsRepoitory;
	
	
    public PortfolioProjects createPortfolioProject(PortfolioProjectDto dto) {
        User currentUser = contextService.getCurrentUser();

        PortfolioProjects portfolioProjects = new PortfolioProjects();
        portfolioProjects.setProjectTitle(dto.getTitle());
        portfolioProjects.setProjectSummary(dto.getOverview());
        portfolioProjects.setProjectStartDate(dto.getStartTime());
        portfolioProjects.setProjectEndDate(dto.getEndTime());
        portfolioProjects.setTechnologiesUsed(dto.getToolsUsed());
        portfolioProjects.setKeyResults(dto.getOutcomes());
        portfolioProjects.setMediaLinks(dto.getMediaUrls());
        portfolioProjects.setVideoDemoUrl(dto.getYouTubeUrl());
        portfolioProjects.setLayoutThemeId(dto.getThemeId());
        portfolioProjects.setOwner(currentUser);

        return iPortfolioProjectsRepoitory.save(portfolioProjects);
    }
    
    public PortfolioProjects updatePortfolioProject(Long id, PortfolioProjectDto dto) {
        PortfolioProjects project = iPortfolioProjectsRepoitory.findById(id)
                .orElseThrow(() -> new BadRequestException("Portfolio project not found"));

        User currentUser = contextService.getCurrentUser();
        if (!project.getOwner().getId().equals(currentUser.getId())) {
            throw new BadRequestException("Unauthorized to update this portfolio project");
        }

        project.setProjectTitle(dto.getTitle());
        project.setProjectSummary(dto.getOverview());
        project.setProjectStartDate(dto.getStartTime());
        project.setProjectEndDate(dto.getEndTime());
        project.setTechnologiesUsed(dto.getToolsUsed());
        project.setKeyResults(dto.getOutcomes());
        project.setMediaLinks(dto.getMediaUrls());
        project.setVideoDemoUrl(dto.getYouTubeUrl());
        project.setLayoutThemeId(dto.getThemeId());

        return iPortfolioProjectsRepoitory.save(project);
    }

    public PortfolioProjects getPortfolioProjectById(Long id) {
        return iPortfolioProjectsRepoitory.findById(id)
                .orElseThrow(() -> new BadRequestException("Portfolio project not found"));
    }

    public void deletePortfolioProjectById(Long id) {
        PortfolioProjects project = iPortfolioProjectsRepoitory.findById(id)
                .orElseThrow(() -> new BadRequestException("Portfolio project not found"));
        iPortfolioProjectsRepoitory.delete(project);
    }

    public List<PortfolioProjects> getPortfolioProjectsByCurrentUser() {
        User currentUser = contextService.getCurrentUser();
        return iPortfolioProjectsRepoitory.findByOwner(currentUser);
    }

}
