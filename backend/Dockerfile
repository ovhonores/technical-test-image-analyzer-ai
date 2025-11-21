# ============================
# 1. Build image
# ============================
FROM node:24.11.1-alpine AS builder

WORKDIR /app

# Copy package files
COPY package.json package-lock.json ./

# Install dependencies
RUN npm install

# Copy all source code
COPY tsconfig.json ./
COPY src ./src
# Build TypeScript
RUN npm run build


# ============================
# 2. Production image
# ============================
FROM node:24.11.1-alpine AS production

WORKDIR /app

# Copy only what is needed for execution
COPY package.json package-lock.json ./
RUN npm install --omit=dev

# Copy compiled files from builder
COPY --from=builder /app/dist ./dist

# Crear usuario no-root para seguridad
RUN addgroup -g 1001 -S nodejs && \
    adduser -S nodejs -u 1001

USER nodejs

# Expose backend port
EXPOSE 3050

# Start backend server
CMD ["npm", "start"]
