FROM node:18-alpine

# Install runtime and build dependencies
RUN apk add --no-cache curl postgresql-client netcat-openbsd

WORKDIR /app

# Copy package files
COPY package*.json ./

# Install all dependencies (including devDependencies for building)
RUN npm install --silent

# Copy source code and other files
COPY . .

# Build the application
RUN npm run build

# Copy dist contents to src folder as requested
RUN cp -r dist/* src/ 2>/dev/null || echo "No dist files to copy to src"

# Verify that both dist and src folders have the compiled content
RUN echo "Verifying build output..." && \
    test -d dist || (echo "ERROR: No dist folder found!" && exit 1) && \
    test -f dist/main.js || (echo "ERROR: main.js not found in dist folder!" && exit 1) && \
    test -f src/main.js || (echo "ERROR: main.js not found in src folder!" && exit 1) && \
    echo "Build verification successful!" && \
    echo "Dist folder contents:" && \
    ls -la dist/ && \
    echo "Src folder contents:" && \
    ls -la src/

# Clean up dev dependencies to reduce image size (optional - keep if you need them for runtime)
# RUN npm prune --production

# Make startup script executable
RUN chmod +x start.sh

# Create non-root user for security
RUN addgroup -g 1001 -S nodejs && \
    adduser -S nodeuser -u 1001 -G nodejs

# Change ownership of the app directory to the nodeuser
RUN chown -R nodeuser:nodejs /app

USER nodeuser

EXPOSE 3000

# Health check
HEALTHCHECK --interval=30s --timeout=10s --start-period=60s --retries=3 \
  CMD curl -f http://localhost:3000/health || exit 1

# Start the application using our startup script
CMD ["sh", "start.sh"]
