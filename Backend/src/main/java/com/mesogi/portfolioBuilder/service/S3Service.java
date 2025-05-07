package com.mesogi.portfolioBuilder.service;

import java.io.IOException;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.amazonaws.services.s3.AmazonS3;

@Service
public class S3Service {

	@Autowired
	private AmazonS3 amazonS3;

	@Value("${aws.bucket}")
	private String bucketName;

	public String updateFile(String existingFileKey, MultipartFile newFile) throws IOException {

		deleteFile(existingFileKey);
		return uploadFile(newFile);
	}

	public void deleteFile(String fileKey) {
		try {
			amazonS3.deleteObject(bucketName, fileKey);
		} catch (Exception e) {
			throw new RuntimeException("Error deleting file from S3", e);
		}
	}

	public String getFileUrl(String fileKey) {
		try {
			String fileUrl = amazonS3.getUrl(bucketName, fileKey).toString();
			return fileUrl;
		} catch (Exception e) {
			throw new RuntimeException("Error retrieving file URL from S3", e);
		}
	}

	private String generateFileName(String originalFileName) {
		String uniqueFileName = UUID.randomUUID().toString() + "_" + originalFileName;
		return uniqueFileName;
	}

	public String uploadFile(MultipartFile file) {
		try {
			String key = "uploads/" + file.getOriginalFilename(); // File path in S3 bucket
			amazonS3.putObject(bucketName, key, file.getInputStream(), null);

			// Return public URL
			return amazonS3.getUrl(bucketName, key).toString();
		} catch (IOException e) {
			throw new RuntimeException("Failed to upload file to S3", e);
		}
	}
}
