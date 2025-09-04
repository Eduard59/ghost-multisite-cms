FROM ghost:5-alpine

# Copy config file
COPY config.production.json /var/lib/ghost/config.production.json

# Set ownership
RUN chown node:node /var/lib/ghost/config.production.json

EXPOSE 2368