FROM ghost:5-alpine

# Install SQLite3 for database
RUN apk add --no-cache sqlite

# Copy custom configuration
COPY config.production.json /var/lib/ghost/config.production.json

# Create necessary directories
RUN mkdir -p /var/lib/ghost/content/data /var/lib/ghost/content/images

# Set proper permissions
RUN chown -R node:node /var/lib/ghost/content

# Use non-root user
USER node

# Expose Ghost port
EXPOSE 2368

# Health check
HEALTHCHECK --interval=30s --timeout=3s --start-period=60s \
  CMD node /var/lib/ghost/current/index.js health

# Start Ghost with memory optimization
CMD ["node", "--max-old-space-size=256", "current/index.js"]