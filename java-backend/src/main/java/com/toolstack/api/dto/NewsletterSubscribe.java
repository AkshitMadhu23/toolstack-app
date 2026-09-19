package com.toolstack.api.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;

public record NewsletterSubscribe(
    @NotBlank(message = "Email is required")
    @Email(message = "Invalid email format")
    String email
) {}
