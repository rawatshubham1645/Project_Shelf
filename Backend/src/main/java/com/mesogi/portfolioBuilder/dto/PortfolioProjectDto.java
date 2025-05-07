package com.mesogi.portfolioBuilder.dto;

import java.util.List;

import com.mesogi.portfolioBuilder.model.PortfolioProjects;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class PortfolioProjectDto {

	private Long id;
	private String uid;
    private String title;
    private String overview;
    private String startTime;
    private String endTime;
    private List<String> toolsUsed;
    private List<String> outcomes;
    private List<String> mediaUrls;
    private String youTubeUrl;
    private String themeId;
    private int totalViews;
    private int uniqueViews;
    private Long createdUserId;
    
    public static PortfolioProjectDto mapToResponse(PortfolioProjects cs) {
    	return PortfolioProjectDto.builder()
    			.id(cs.getId())
    			.uid(cs.getUid())
    			.title(cs.getProjectTitle())
    			.overview(cs.getProjectSummary())
    			.startTime(cs.getProjectStartDate())
    			.endTime(cs.getProjectEndDate())
    			.toolsUsed(cs.getTechnologiesUsed())
    			.outcomes(cs.getKeyResults())
    			.mediaUrls(cs.getMediaLinks())
    			.youTubeUrl(cs.getVideoDemoUrl())
    			.themeId(cs.getLayoutThemeId())
    			.totalViews(cs.getViewCount())
    			.uniqueViews(cs.getUniqueViewCount())
    			.createdUserId(cs.getOwner().getId())
    			.build();
    }
}
