package com.masai.projectshelf.dto;

import org.apache.commons.lang3.text.WordUtils;

import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

@NoArgsConstructor
@ToString
@Data
public class MessageResponse {
	private String message;
	private Object data;

	public MessageResponse(String message) {
		super();
		this.message = WordUtils.capitalize(message.toLowerCase());
	}

	public MessageResponse(String message, Object data) {
		super();
		this.message = WordUtils.capitalize(message.toLowerCase());
		this.data = data;
	}
}
