FROM ghost:5-alpine

# Copy production configuration
COPY config.production.json /var/lib/ghost/config.production.json

# Create content directory
RUN mkdir -p /var/lib/ghost/content

# Set proper permissions
RUN chown -R node:node /var/lib/ghost

# Use non-root user
USER node

# Expose port
EXPOSE 2368

# Health check
HEALTHCHECK --interval=30s --timeout=3s --start-period=60s \
  CMD node /var/lib/ghost/current/index.js health