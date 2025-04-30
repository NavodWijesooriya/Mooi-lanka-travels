# Base image for dependency installation
FROM node:20-alpine AS base

# Install build dependencies (no SQLite here)
RUN apk add --no-cache libc6-compat python3 make g++

WORKDIR /app

# Copy and install dependencies
COPY package.json package-lock.json ./
RUN npm install --legacy-peer-deps

# Build stage
FROM base AS builder

WORKDIR /app

# Copy installed modules
COPY --from=base /app/node_modules ./node_modules

# Copy source code
COPY . .

# Install native module for libsql (skip errors if optional)
RUN npm install @libsql/linux-x64-musl || echo "Native module install skipped"

# Build the Next.js application
RUN npm run build

# Final runtime image
FROM node:20-alpine AS runner

WORKDIR /app

# Only install runtime SQLite (no dev libs)
RUN apk add --no-cache sqlite sqlite-libs

# Environment variables
ENV NODE_ENV=production
ENV DATABASE_URL=file:/app/data/database/travel-agency-main.db
ENV PAYLOAD_CONFIG_PATH=/app/src/payload.config.ts
ENV PAYLOAD_SECRET=your-f8dffbd6e18a8e8b34585758
ENV PORT=3105
ENV NEXTAUTH_SECRET=your-nextauth-secret-should-be-very-secure

# Copy only the required files from the builder
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static
COPY --from=builder /app/public ./public
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/data ./data
COPY --from=builder /app/uploads ./uploads
COPY --from=builder /app/media ./media
COPY --from=builder /app/src/payload.config.ts ./src/payload.config.ts
COPY .env.local .env.local

# Ensure required directories exist
RUN mkdir -p /app/data/database \
    && mkdir -p /app/uploads \
    && mkdir -p /app/media

# Set correct permissions and add non-root user
RUN addgroup -S nodejs && adduser -S nextjs -G nodejs \
    && chown -R nextjs:nodejs /app

USER nextjs

EXPOSE 3105

CMD ["node", "server.js"]
