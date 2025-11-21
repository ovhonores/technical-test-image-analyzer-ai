# Etapa 1: build
FROM node:24.11.1-alpine AS builder

WORKDIR /app

# Copiar dependencias
COPY package*.json ./



# Copiar el resto del proyecto
COPY . .
# En etapa builder
COPY next.config.ts . 
COPY .env.local . 
RUN npm install
# Build del proyecto (Next.js, React, etc.)
RUN npm run build

# Etapa 2: producción
FROM node:24.11.1-alpine AS production

ENV NODE_ENV=production

WORKDIR /app

# Copiar solo lo necesario desde el builder
COPY --from=builder /app/package*.json ./
COPY --from=builder /app/.next .next
COPY --from=builder /app/public ./public
COPY --from=builder /app/node_modules ./node_modules

# (Opcional) Copiar otros archivos que necesite Next.js
COPY --from=builder /app/next.config.ts ./
COPY --from=builder /app/.env.local ./
# Crear usuario no-root para seguridad
RUN addgroup -g 1001 -S nodejs && \
    adduser -S nodejs -u 1001

USER nodejs

EXPOSE 3000

CMD ["npm", "start"]
