# Stage 1: Base - common foundation
FROM node:lts AS base
WORKDIR /app
COPY package.json package-lock.json ./

# Stage 2: Production dependencies only
FROM base AS prod-deps
RUN npm install --omit=dev

# Stage 3: All dependencies (including dev)
FROM base AS build-deps
RUN npm install

# Stage 4: Build the site
FROM build-deps AS build
COPY . .
RUN npm run build

# Stage 5: Runtime - Nginx with built assets only
FROM nginx:alpine AS runtime

# Copy nginx configuration
COPY nginx.conf /etc/nginx/nginx.conf

# Copy built static files from build stage
COPY --from=build /app/dist /usr/share/nginx/html/

# Security: Run as non-root user (INFR-04)
# nginx:alpine includes nginx user by default
USER nginx

# Health check (INFR-06)
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s \
  CMD wget --no-verbose --tries=1 --spider http://localhost/ || exit 1

# Expose port 80
EXPOSE 80

# Start nginx (must run in foreground for Docker)
CMD ["nginx", "-g", "daemon off;"]
