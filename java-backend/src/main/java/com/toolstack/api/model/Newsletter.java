package com.toolstack.api.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.Instant;
import java.util.UUID;

@Document(collection = "newsletter")
public class Newsletter {

    @Id
    private String id;
    private String email;
    private String createdAt;

    public Newsletter() {}

    public Newsletter(String email) {
        this.id = UUID.randomUUID().toString();
        this.email = email.toLowerCase().trim();
        this.createdAt = Instant.now().toString();
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(String createdAt) {
        this.createdAt = createdAt;
    }
}
