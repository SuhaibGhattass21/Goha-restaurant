# Multi-stage build for TypeScript Node.js application
# Stage 1: Build dependencies and compile TypeScript
FROM node:20-alpine AS builder

# Set working directory
WORKDIR /app

# Install build dependencies (needed for native modules like bcrypt, pg)
RUN apk add --no-cache python3 make g++

# Copy package files
COPY package*.json ./

# Install all dependencies (including dev dependencies for building)
RUN npm ci --only=production=false

# Copy source code
COPY . .

# Build TypeScript to JavaScript
RUN npm run build

# Stage 2: Production image
FROM node:20-alpine AS production

# Install runtime dependencies
RUN apk add --no-cache \
    postgresql-client \
    curl \
    dumb-init

# Create app directory and non-root user
RUN addgroup -g 1001 -S nodejs && \
    adduser -S nodeapp -u 1001

WORKDIR /app

# Copy package files and install production dependencies only
COPY package*.json ./
RUN npm ci --only=production && npm cache clean --force

# Copy built application from builder stage
COPY --from=builder /app/dist ./dist

# Copy necessary runtime files
COPY --from=builder /app/seed-prod.js ./
COPY --from=builder /app/start.sh ./
COPY --from=builder /app/init-db.sql ./

# Make start script executable
RUN chmod +x start.sh

# Change ownership to non-root user
RUN chown -R nodeapp:nodejs /app
USER nodeapp

# Expose port
EXPOSE 3000

# Health check
HEALTHCHECK --interval=30s --timeout=10s --start-period=30s --retries=3 \
    CMD curl -f http://localhost:3000/health || exit 1

# Use dumb-init to handle signals properly
ENTRYPOINT ["dumb-init", "--"]

# Start the application
CMD ["./start.sh"]
