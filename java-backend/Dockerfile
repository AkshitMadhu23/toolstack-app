# Stage 1: Build Java Application using Maven Wrapper
FROM eclipse-temurin:17-jdk-alpine AS builder
WORKDIR /app

# Copy project files
COPY . .

# Ensure Maven wrapper has execution permissions and build artifact
RUN chmod +x mvnw
RUN ./mvnw clean package -DskipTests

# Stage 2: Minimal JRE Runtime
FROM eclipse-temurin:17-jre-alpine
WORKDIR /app

# Copy packaged jar from builder stage
COPY --from=builder /app/target/*.jar app.jar

# Expose port 8000
EXPOSE 8000

# Run Spring Boot app
ENTRYPOINT ["java", "-jar", "app.jar"]
