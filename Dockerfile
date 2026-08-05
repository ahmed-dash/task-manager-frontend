# ---- Build stage: compile the React app into static files ----
FROM node:20-alpine AS builder

WORKDIR /build

# Copy manifests first so this layer is cached unless dependencies change
COPY package.json package-lock.json* ./
RUN npm ci

COPY . .

# VITE_API_BASE_URL is baked into the static bundle at build time.
# Override it with --build-arg when the backend lives at a different URL
# (e.g. your AWS EC2 domain in production).
ARG VITE_API_BASE_URL=http://localhost:8000/api/v1
ENV VITE_API_BASE_URL=$VITE_API_BASE_URL

RUN npm run build


# ---- Runtime stage: serve the static build with Nginx ----
FROM nginx:1.27-alpine AS runtime

COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=builder /build/dist /usr/share/nginx/html

# Nginx's stock image already runs as root by default for port 80 binding,
# but the worker processes themselves run as the unprivileged "nginx" user —
# no extra USER directive needed here.

EXPOSE 80

HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
    CMD wget -q --spider http://localhost:80 || exit 1

CMD ["nginx", "-g", "daemon off;"]
