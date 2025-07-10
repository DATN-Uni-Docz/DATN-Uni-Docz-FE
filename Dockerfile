# syntax=docker/dockerfile:1

FROM node:23 AS builder
WORKDIR /app
COPY . .

ARG VITE_BACKEND_URL
ARG VITE_BASE_URL

ENV VITE_BACKEND_URL=$VITE_BACKEND_URL
ENV VITE_BASE_URL=$VITE_BASE_URL

RUN npm ci && npm run build

FROM nginx:alpine
COPY --from=builder /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
