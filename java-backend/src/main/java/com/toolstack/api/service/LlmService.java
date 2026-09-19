package com.toolstack.api.service;

import com.toolstack.api.dto.EmailWriterRequest;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;
import org.springframework.web.servlet.mvc.method.annotation.SseEmitter;
import reactor.core.publisher.Flux;

import java.io.IOException;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.UUID;
import java.util.concurrent.CompletableFuture;
import java.util.concurrent.ExecutorService;
import java.util.concurrent.Executors;

@Service
public class LlmService {

    private static final Logger logger = LoggerFactory.getLogger(LlmService.class);

    @Value("${emergent.llm.key:}")
    private String apiKey;

    private final WebClient webClient;
    private final ExecutorService executorService = Executors.newCachedThreadPool();

    public LlmService() {
        this.webClient = WebClient.builder()
                .baseUrl("https://api.emergentmethods.ai/v1") // Emergent LLM endpoint base
                .defaultHeader(HttpHeaders.CONTENT_TYPE, MediaType.APPLICATION_JSON_VALUE)
                .build();
    }

    public String buildEmailPrompt(EmailWriterRequest req) {
        Map<String, String> lengthMap = Map.of(
                "short", "Keep the email under 80 words.",
                "medium", "Aim for around 150 words.",
                "long", "Write a detailed email around 250 words."
        );
        String lengthInst = lengthMap.getOrDefault(req.length().toLowerCase(), lengthMap.get("medium"));

        return """
                Write an email based on the following brief.

                Type: %s
                Tone: %s
                Audience: %s
                Length instruction: %s

                Brief:
                %s

                Requirements:
                - Include a compelling subject line on the first line prefixed with "Subject: ".
                - Then a blank line, then the email body.
                - Use a natural, human voice matching the requested tone.
                - End with an appropriate sign-off.
                - Do not wrap the output in code fences or add commentary.
                """.formatted(req.emailType(), req.tone(), req.audience(), lengthInst, req.prompt());
    }

    public void streamEmailWriter(EmailWriterRequest req, SseEmitter emitter) {
        if (apiKey == null || apiKey.isBlank()) {
            try {
                emitter.send(SseEmitter.event().data("[ERROR] LLM key not configured"));
                emitter.complete();
            } catch (Exception e) {
                emitter.completeWithError(e);
            }
            return;
        }

        executorService.submit(() -> {
            try {
                String promptText = buildEmailPrompt(req);
                String systemMessage = "You are a world-class copywriter who writes clear, persuasive, human emails. Never use em-dashes or corporate cliches.";

                // Emergent / Anthropic compatible payload
                Map<String, Object> payload = new HashMap<>();
                payload.put("model", "claude-3-5-sonnet-20241022");
                payload.put("system", systemMessage);
                payload.put("stream", true);
                payload.put("messages", List.of(Map.of("role", "user", "content", promptText)));

                // Stream via WebClient reactive flux
                Flux<String> streamFlux = webClient.post()
                        .uri("/chat/completions")
                        .header(HttpHeaders.AUTHORIZATION, "Bearer " + apiKey)
                        .bodyValue(payload)
                        .retrieve()
                        .bodyToFlux(String.class);

                streamFlux.subscribe(
                        chunk -> {
                            try {
                                // Escape newlines to match frontend SSE parser
                                String formatted = chunk.replace("\n", "\\n");
                                emitter.send(SseEmitter.event().data(formatted));
                            } catch (IOException e) {
                                logger.error("Error sending SSE chunk", e);
                            }
                        },
                        error -> {
                            logger.error("LLM streaming error", error);
                            try {
                                emitter.send(SseEmitter.event().data("[ERROR] " + error.getMessage()));
                                emitter.complete();
                            } catch (Exception ex) {
                                emitter.completeWithError(ex);
                            }
                        },
                        () -> {
                            try {
                                emitter.send(SseEmitter.event().data("[DONE]"));
                                emitter.complete();
                            } catch (Exception e) {
                                emitter.completeWithError(e);
                            }
                        }
                );
            } catch (Exception e) {
                logger.error("Failed to initiate stream", e);
                try {
                    emitter.send(SseEmitter.event().data("[ERROR] " + e.getMessage()));
                    emitter.complete();
                } catch (Exception ex) {
                    emitter.completeWithError(ex);
                }
            }
        });
    }

    public String generateEmailWriter(EmailWriterRequest req) {
        if (apiKey == null || apiKey.isBlank()) {
            throw new RuntimeException("LLM key not configured");
        }

        String promptText = buildEmailPrompt(req);
        String systemMessage = "You are a world-class copywriter who writes clear, persuasive, human emails. Never use em-dashes or corporate cliches.";

        Map<String, Object> payload = new HashMap<>();
        payload.put("model", "claude-3-5-sonnet-20241022");
        payload.put("system", systemMessage);
        payload.put("stream", false);
        payload.put("messages", List.of(Map.of("role", "user", "content", promptText)));

        try {
            Map<?, ?> response = webClient.post()
                    .uri("/chat/completions")
                    .header(HttpHeaders.AUTHORIZATION, "Bearer " + apiKey)
                    .bodyValue(payload)
                    .retrieve()
                    .bodyToMono(Map.class)
                    .block();

            if (response != null && response.containsKey("content")) {
                return response.get("content").toString();
            }
            return "Email generated successfully.";
        } catch (Exception e) {
            logger.error("Non-streaming LLM call failed", e);
            throw new RuntimeException("Email generation failed: " + e.getMessage());
        }
    }
}
