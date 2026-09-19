package com.toolstack.api.controller;

import com.toolstack.api.dto.ContactMessage;
import com.toolstack.api.dto.EmailWriterRequest;
import com.toolstack.api.dto.NewsletterSubscribe;
import com.toolstack.api.model.Contact;
import com.toolstack.api.model.Newsletter;
import com.toolstack.api.repository.ContactRepository;
import com.toolstack.api.repository.NewsletterRepository;
import com.toolstack.api.service.LlmService;
import jakarta.validation.Valid;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.mvc.method.annotation.SseEmitter;

import java.time.Instant;
import java.util.Map;

@RestController
@RequestMapping("/api")
public class ApiController {

    private static final Logger logger = LoggerFactory.getLogger(ApiController.class);

    // Optional MongoDB Repositories (Commented out until MongoDB is enabled)
    // private final NewsletterRepository newsletterRepository;
    // private final ContactRepository contactRepository;
    private final LlmService llmService;

    @Autowired
    public ApiController(
            // NewsletterRepository newsletterRepository,
            // ContactRepository contactRepository,
            LlmService llmService) {
        // this.newsletterRepository = newsletterRepository;
        // this.contactRepository = contactRepository;
        this.llmService = llmService;
    }

    // ---------- Health / Root ----------

    @GetMapping("")
    public Map<String, String> root() {
        return Map.of(
                "message", "Toolstack API is running",
                "version", "1.0.0"
        );
    }

    @GetMapping("/health")
    public Map<String, String> health() {
        return Map.of(
                "status", "ok",
                "timestamp", Instant.now().toString()
        );
    }

    // ---------- Newsletter ----------

    @PostMapping("/newsletter/subscribe")
    public Map<String, Object> subscribe(@Valid @RequestBody NewsletterSubscribe payload) {
        /* MongoDB Integration Disabled
        try {
            Newsletter newsletter = new Newsletter(payload.email());
            newsletterRepository.save(newsletter);
            logger.info("New subscriber saved: {}", payload.email());
        } catch (Exception e) {
            logger.warn("Database storage skipped (local mode without MongoDB): {}", e.getMessage());
        }
        */
        logger.info("Newsletter subscription received (in-memory mode): {}", payload.email());
        return Map.of(
                "success", true,
                "message", "You're on the list."
        );
    }

    // ---------- Contact ----------

    @PostMapping("/contact")
    public Map<String, Object> contact(@Valid @RequestBody ContactMessage payload) {
        /* MongoDB Integration Disabled
        try {
            Contact contact = new Contact(payload.name(), payload.email(), payload.message());
            contactRepository.save(contact);
            logger.info("New contact message from: {}", payload.email());
        } catch (Exception e) {
            logger.warn("Database storage skipped (local mode without MongoDB): {}", e.getMessage());
        }
        */
        logger.info("Contact message received (in-memory mode): {}", payload.email());
        return Map.of("success", true);
    }

    // ---------- AI Email Writer (Streaming SSE) ----------

    @PostMapping(value = "/ai/email-writer/stream", produces = MediaType.TEXT_EVENT_STREAM_VALUE)
    public SseEmitter emailWriterStream(@Valid @RequestBody EmailWriterRequest req) {
        SseEmitter emitter = new SseEmitter(180_000L); // 3 minutes timeout
        llmService.streamEmailWriter(req, emitter);
        return emitter;
    }

    // ---------- AI Email Writer (Non-streaming fallback) ----------

    @PostMapping("/ai/email-writer")
    public ResponseEntity<?> emailWriter(@Valid @RequestBody EmailWriterRequest req) {
        try {
            String content = llmService.generateEmailWriter(req);
            return ResponseEntity.ok(Map.of("content", content));
        } catch (Exception e) {
            logger.error("Email writer non-streaming failed", e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(Map.of("detail", e.getMessage()));
        }
    }

    // ---------- Tools metadata ----------

    @GetMapping("/tools")
    public Map<String, Object> listTools() {
        return Map.of(
                "count", 8,
                "message", "See frontend registry for details."
        );
    }
}
