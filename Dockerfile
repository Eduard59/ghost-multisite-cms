FROM ghost:5-alpine

# Install S3 storage adapter for images (Render doesn't have persistent storage)
RUN npm install ghost-storage-adapter-s3 \
    && mkdir -p /var/lib/ghost/content/adapters/storage \
    && cp -r node_modules/ghost-storage-adapter-s3 /var/lib/ghost/content/adapters/storage/s3

# Copy custom configuration
COPY config.production.json /var/lib/ghost/config.production.json

# Copy custom theme
COPY themes/dentalprice /var/lib/ghost/content/themes/dentalprice

# Set proper permissions
RUN chown -R node:node /var/lib/ghost/content

# Use non-root user
USER node

# Expose Ghost port
EXPOSE 2368

# Health check
HEALTHCHECK --interval=30s --timeout=3s --start-period=60s \
  CMD node /var/lib/ghost/current/index.js health

# Start Ghost
CMD ["node", "current/index.js"]