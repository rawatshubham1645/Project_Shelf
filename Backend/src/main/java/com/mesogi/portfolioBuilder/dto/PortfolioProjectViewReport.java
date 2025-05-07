package com.mesogi.portfolioBuilder.dto;

import com.mesogi.portfolioBuilder.model.PortfolioProjects;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class PortfolioProjectViewReport {

	private String uid;
	private Long id;
	private String title;
	private int totalViews;
	private int uniqueViews;
	
	public static PortfolioProjectViewReport maptoResponse(PortfolioProjects pf) {
		return PortfolioProjectViewReport.builder()
				.uid(pf.getUid())
				.id(pf.getId())
				.title(pf.getProjectTitle())
				.totalViews(pf.getViewCount())
				.uniqueViews(pf.getUniqueViewCount())
				.build();
	}
}
