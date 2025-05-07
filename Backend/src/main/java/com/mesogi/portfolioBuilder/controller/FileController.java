package com.mesogi.portfolioBuilder.controller;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.mesogi.portfolioBuilder.service.S3Service;

@RestController
@RequestMapping("/api/files")
public class FileController {

	@Autowired
    private S3Service s3Service;

    @PostMapping("/upload")
    public ResponseEntity<?> uploadFile(@RequestParam("file") List<MultipartFile> files) {
        try {
        	List<String> urls = new ArrayList<>();
        	for(MultipartFile fi : files) {
    			try {
    				urls.add(s3Service.uploadFile(fi));
    	        } catch (Exception e) {
    	            System.out.println(("Error: " + e.getMessage()));
    	        }
    		}
            return ResponseEntity.ok(urls);
        } catch (Exception e) {
            return ResponseEntity.internalServerError().body("Error: " + e.getMessage());
        }
    }
}
