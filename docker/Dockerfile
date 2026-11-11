# Se construye desde la raíz del repo: docker build -f docker/Dockerfile .
# ── 1. Descarga y optimiza imágenes/video, luego compila el sitio estático ──
FROM node:24-bookworm-slim AS build
RUN apt-get update \
 && apt-get install -y --no-install-recommends ffmpeg ca-certificates \
 && rm -rf /var/lib/apt/lists/*
WORKDIR /app

COPY package.json package-lock.json ./
RUN npm ci

# Capa aparte: Docker la cachea y no vuelve a descargar las imágenes en cada deploy
# (salvo que cambie el script). Si ya subiste public/media al repo, no descarga nada.
COPY scripts ./scripts
COPY public ./public
RUN npm run assets

COPY . .
RUN npm run build

# ── 2. Servidor final: nginx con gzip y caché ──
FROM nginx:1.27-alpine
COPY docker/nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=build /app/dist /usr/share/nginx/html
EXPOSE 80
