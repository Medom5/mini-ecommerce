package com.miniecommerce.ecommerce.dto;

import jakarta.validation.constraints.NotBlank;

public record RegisterRequest(
        @NotBlank(message = "Username is required") String username,
        @NotBlank(message = "Password is required") String password,
        @NotBlank(message = "Role is required") String role
) {}
