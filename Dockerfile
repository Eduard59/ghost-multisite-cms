FROM ghost:5-alpine

# Install SQLite3 and create data directory
RUN apk add --no-cache sqlite \
    && mkdir -p /var/data \
    && chown -R node:node /var/data

# Copy custom configuration
COPY config.production.json /var/lib/ghost/config.production.json

# Copy reset script and startup script
COPY --chown=node:node reset-admin.sql /tmp/reset-admin.sql
COPY --chown=node:node startup.sh /usr/local/bin/startup.sh
RUN chmod +x /usr/local/bin/startup.sh

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

# Start Ghost with startup script
CMD ["/usr/local/bin/startup.sh"]