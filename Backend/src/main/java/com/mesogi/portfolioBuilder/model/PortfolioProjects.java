package com.mesogi.portfolioBuilder.model;

import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;
import java.util.UUID;

import javax.persistence.CollectionTable;
import javax.persistence.Column;
import javax.persistence.ElementCollection;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.validation.constraints.NotBlank;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity
public class PortfolioProjects {

	@Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
	
	@Column(name = "uid", columnDefinition = "VARCHAR(255)")
	private String uid = UUID.randomUUID().toString();
	
	@NotBlank(message = "Project title is required")
	private String projectTitle;

	@Column(columnDefinition = "TEXT")
	private String projectSummary;

	private String projectStartDate;

	private String projectEndDate;

	@ElementCollection
	@CollectionTable(name = "project_tools", joinColumns = @JoinColumn(name = "project_id"))
	@Column(name = "tool_name")
	private List<String> technologiesUsed = new ArrayList<>();

	@ElementCollection
	@CollectionTable(name = "project_outcomes", joinColumns = @JoinColumn(name = "project_id"))
	@Column(name = "project_outcome")
	private List<String> keyResults;

	@ElementCollection
	@CollectionTable(name = "project_media", joinColumns = @JoinColumn(name = "media_id"))
	@Column(name = "media_link")
	private List<String> mediaLinks;

	private String videoDemoUrl;

	private String layoutThemeId;

	@Column(columnDefinition = "INT DEFAULT 0")
	private int viewCount = 0;

	@Column(columnDefinition = "INT DEFAULT 0")
	private int uniqueViewCount = 0;

	@ElementCollection(fetch = FetchType.EAGER)
	private Set<String> distinctVisitorIps = new HashSet<>();

	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "owner_id", nullable = false)
	private User owner;
}
