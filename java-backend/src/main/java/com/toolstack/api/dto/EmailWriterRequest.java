package com.toolstack.api.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.validation.constraints.NotBlank;

public record EmailWriterRequest(
    @NotBlank(message = "Prompt is required")
    String prompt,
    String tone,
    String length,
    String audience,
    @JsonProperty("email_type")
    String emailType
) {
    public EmailWriterRequest {
        if (tone == null || tone.isBlank()) tone = "professional";
        if (length == null || length.isBlank()) length = "medium";
        if (audience == null || audience.isBlank()) audience = "general";
        if (emailType == null || emailType.isBlank()) emailType = "business";
    }
}
