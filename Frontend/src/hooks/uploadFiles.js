import { FILES_UPLOAD } from "@/imports/api";
import BACKEND_URL from "@/imports/baseUrl";
import { getToken } from "@/imports/localStorage";
import { showToast } from "@/utils/toast";

// Maximum file size in bytes (10MB)
const MAX_FILE_SIZE = 10 * 1024 * 1024;

/**
 * Uploads files to the server with size validation and improved error handling
 * @param {File[]} files - Array of files to upload
 * @param {Object} options - Options for file upload
 * @param {number} options.maxSize - Maximum file size in bytes (defaults to 10MB)
 * @returns {Promise<Object>} - Response from the server
 */
const uploadFiles = async (files, options = {}) => {
  const maxSize = options.maxSize || MAX_FILE_SIZE;
  
  // Validate file sizes before attempting upload
  const oversizedFiles = files.filter(file => file.size > maxSize);
  if (oversizedFiles.length > 0) {
    const filenames = oversizedFiles.map(f => f.name).join(', ');
    const sizeInMB = Math.round(maxSize / (1024 * 1024));
    showToast.error(`Files too large: ${filenames}. Maximum size is ${sizeInMB}MB.`);
    throw new Error(`Files exceed maximum size of ${sizeInMB}MB`);
  }

  // Create form data with valid files
  const formData = new FormData();
  files.forEach((file) => {
    formData.append("file", file);
  });
  
  try {
    const response = await fetch(`${BACKEND_URL}${FILES_UPLOAD}`, {
      method: "POST",
      body: formData,
      headers: {
        Authorization: `Bearer ${getToken()}`,
      },
    });
    
    // Handle different error scenarios
    if (!response.ok) {
      const statusCode = response.status;
      
      // Handle specific status codes
      if (statusCode === 413) {
        showToast.error("File size too large for server. Please reduce file size.");
        throw new Error("File size exceeds server limits");
      } else if (statusCode === 401 || statusCode === 403) {
        showToast.error("Authentication error. Please log in again.");
        throw new Error("Authentication failed");
      } else {
        showToast.error("File upload failed. Please try again later.");
        throw new Error(`Upload failed with status: ${statusCode}`);
      }
    }
    
    return await response.json();
  } catch (error) {
    console.error("Upload error:", error);
    // Only show toast if it wasn't already shown in specific error handlers
    if (!error.message.includes("Maximum size") && 
        !error.message.includes("server limits") && 
        !error.message.includes("Authentication")) {
      showToast.error("File Size too Large.");
    }
    throw error;
  }
};

export default uploadFiles;