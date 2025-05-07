package com.mesogi.portfolioBuilder.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.mesogi.portfolioBuilder.model.PortfolioProjects;
import com.mesogi.portfolioBuilder.model.User;

public interface IPortfolioProjectsRepoitory extends JpaRepository<PortfolioProjects, Long> {

	  List<PortfolioProjects> findByOwner(User creator);
	  
	  PortfolioProjects findByUid(String uid);
}
