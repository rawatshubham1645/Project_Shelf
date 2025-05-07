package com.mesogi.portfolioBuilder.dto;

import java.util.List;
import java.util.stream.Collectors;

import com.mesogi.portfolioBuilder.model.User;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class DashBoardReport {
	

	 private int totalViews;
	 private int uniqueViews;
	 private List<PortfolioProjectViewReport> caseStudyDataCount;
	 
	 public static DashBoardReport mapToResponse(User u) {
		 return DashBoardReport.builder()
				 .totalViews(u.getViewCount())
				 .uniqueViews(u.getUniqueViewCount())
				 .caseStudyDataCount(u.getPortfolioProjects().stream().map(PortfolioProjectViewReport::maptoResponse).collect(Collectors.toList()))
				 .build();
	 }
}
