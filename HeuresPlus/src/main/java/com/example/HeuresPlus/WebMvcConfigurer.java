package com.example.HeuresPlus;

import org.springframework.web.servlet.config.annotation.CorsRegistry;

public class WebMvcConfigurer implements org.springframework.web.servlet.config.annotation.WebMvcConfigurer {
    @Override
    public void addCorsMappings(CorsRegistry registry) {
        // This method is used to configure CORS mappings
        registry.addMapping("/**") // Allow all endpoints
                .allowedOrigins("http://localhost:4200") // Allow requests from this origin
                .allowedMethods("GET", "POST", "PUT", "DELETE", "OPTIONS") // Allow specific HTTP methods
                .allowCredentials(true); // Allows cookies and authorization headers to be sent
    }
}
