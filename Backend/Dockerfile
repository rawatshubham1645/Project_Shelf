# Step 1: Use official OpenJDK 21 runtime image
FROM eclipse-temurin:21-jdk-alpine

# Step 2: Set the working directory inside the container
WORKDIR /app

# Step 3: Copy the jar file into the container
COPY build/libs/projectShelf-0.0.1-SNAPSHOT.jar app.jar

# Step 4: Expose port 8081 (since your app runs on this)
EXPOSE 8081

# Step 5: Run the app
ENTRYPOINT ["java", "-jar", "app.jar"]
