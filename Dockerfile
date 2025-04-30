# Base image with Node.js and required dependencies for building
FROM node:20-alpine AS base

# Install necessary dependencies for building and SQLite
RUN apk add --no-cache libc6-compat python3 make g++ sqlite sqlite-dev

# Set working directory
WORKDIR /app

# Copy package files and install dependencies
COPY package.json package-lock.json ./ 
RUN npm install --legacy-peer-deps

# Build the Next.js application
FROM base AS builder
WORKDIR /app

# Copy dependencies installed in the base image
COPY --from=base /app/node_modules ./node_modules

# Copy the rest of the application source
COPY . .

# Fix libsql native modules issue with explicit install
RUN npm install @libsql/linux-x64-musl || echo "Native module installation attempted"

# Run build step
RUN npm run build

# Create media directory if it doesn't exist
RUN mkdir -p /app/media

# Production image (final image for running the app)
FROM node:20-alpine AS runner

# Set working directory
WORKDIR /app

# Install SQLite for runtime
RUN apk add --no-cache sqlite sqlite-libs sqlite-dev

# Set environment variables for production
ENV NODE_ENV=production
ENV DATABASE_URL=file:/app/data/database/travel-agency-main.db
ENV PAYLOAD_CONFIG_PATH=/app/src/payload.config.ts
ENV PAYLOAD_SECRET=your-f8dffbd6e18a8e8b34585758
ENV PORT=3105
ENV NEXTAUTH_SECRET=your-nextauth-secret-should-be-very-secure

# For a Next.js app with standalone output, copy the standalone folder structure
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static
COPY --from=builder /app/public ./public

# Copy node_modules to get native modules
COPY --from=builder /app/node_modules ./node_modules

# Copy SQLite database folder structure
COPY --from=builder /app/data ./data
# Copy uploads directory for Payload CMS media
COPY --from=builder /app/uploads ./uploads
# Copy media folder if needed by your application
COPY --from=builder /app/media ./media

# Copy Payload CMS configuration
COPY --from=builder /app/src/payload.config.ts ./src/payload.config.ts

# Copy the .env.local file for environment variables
COPY .env.local .env.local

# Create and ensure permissions for essential directories
RUN mkdir -p /app/data/database \
  && mkdir -p /app/uploads \
  && mkdir -p /app/.next/cache \
  && mkdir -p /app/media \
  && touch /app/data/database/travel-agency-main.db \
  && sqlite3 /app/data/database/travel-agency-main.db "VACUUM;"

# Add a non-root user
RUN addgroup -S nodejs && adduser -S nextjs -G nodejs
# Set permissions for non-root user
RUN chown -R nextjs:nodejs /app

# Switch to the non-root user
USER nextjs

# Expose the application port
EXPOSE 3105

# Start the application - Next.js standalone server
CMD ["node", "server.js"]