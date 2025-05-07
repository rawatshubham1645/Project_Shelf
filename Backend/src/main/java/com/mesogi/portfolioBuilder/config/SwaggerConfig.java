package com.mesogi.portfolioBuilder.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import io.swagger.v3.oas.models.OpenAPI;
import io.swagger.v3.oas.models.info.Contact;
import io.swagger.v3.oas.models.info.Info;

@Configuration
public class SwaggerConfig {

    @Bean
    public OpenAPI customOpenAPI() {
        return new OpenAPI()
            .info(new Info()
                .title("Dynamic-Form-Builder API Docs")
                .version("1.0")
                .description("API documentation for Backend System")
                .contact(new Contact().name("Shubham Rawat").email("support@PortfolioBuilder.com")));
    }
}
