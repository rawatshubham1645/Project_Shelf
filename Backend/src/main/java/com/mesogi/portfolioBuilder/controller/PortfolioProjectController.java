package com.mesogi.portfolioBuilder.controller;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.mesogi.portfolioBuilder.dto.MessageResponse;
import com.mesogi.portfolioBuilder.dto.PortfolioProjectDto;
import com.mesogi.portfolioBuilder.model.PortfolioProjects;
import com.mesogi.portfolioBuilder.service.PortfolioPojectsServiceImpl;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/case-studies")
@RequiredArgsConstructor
public class PortfolioProjectController {
	

	@Autowired
    private PortfolioPojectsServiceImpl pojectsServiceImpl;
	
    @PostMapping
    public ResponseEntity<?> createCaseStudy(@RequestBody PortfolioProjectDto dto) {
    	PortfolioProjects cs = pojectsServiceImpl.createPortfolioProject(dto);
        return ResponseEntity.ok(new MessageResponse("Portfolio project created successfully"));
    }
    
    @PutMapping("/{id}")
    public ResponseEntity<?> updatePortfolioProject(@PathVariable Long id, @RequestBody PortfolioProjectDto dto) {
        PortfolioProjects pp = pojectsServiceImpl.updatePortfolioProject(id, dto);
        return ResponseEntity.ok(new MessageResponse("Portfolio project updated successfully"));
    }
    
    @DeleteMapping("/{id}")
    public ResponseEntity<?> deletePortfolioProject(@PathVariable Long id) {
        pojectsServiceImpl.deletePortfolioProjectById(id);
        return ResponseEntity.ok(new MessageResponse("Portfolio project deleted successfully"));
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> getPortfolioProjectById(@PathVariable Long id) {
        PortfolioProjects pp = pojectsServiceImpl.getPortfolioProjectById(id);
        return ResponseEntity.ok(new MessageResponse("Portfolio project fetched successfully", PortfolioProjectDto.mapToResponse(pp)));
    }

    @GetMapping
    public ResponseEntity<?> getPortfolioProjectsByUser() {
        List<PortfolioProjects> projects = pojectsServiceImpl.getPortfolioProjectsByCurrentUser();
        return ResponseEntity.ok(new MessageResponse("Your portfolio projects fetched successfully", 
                projects.stream().map(PortfolioProjectDto::mapToResponse).collect(Collectors.toList())));
    }

}
