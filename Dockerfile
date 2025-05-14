# Etapa 1: Build da aplicação Vue
FROM node:22 AS builder

WORKDIR /app
COPY . .
RUN npm install
RUN npm run build

# Etapa 2: NGINX com app + runtime env
FROM nginx:stable-alpine

RUN apk add --no-cache gettext

# Copia app buildada
COPY --from=builder /app/dist /usr/share/nginx/html

# Copia entrypoint e dá permissão
COPY entrypoint /entrypoint
RUN chmod +x /entrypoint

# Substitui entrypoint padrão
ENTRYPOINT /entrypoint
CMD ["nginx", "-g", "daemon off;"]
