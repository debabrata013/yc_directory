# ---------- Base image ----------
FROM node:20-alpine AS base
WORKDIR /app
ENV NEXT_TELEMETRY_DISABLED=1
ENV NODE_ENV=production

# ---------- Dependencies ----------
FROM base AS deps
COPY package.json package-lock.json ./
RUN npm ci

# ---------- Builder ----------
FROM deps AS builder
COPY . .

# Ensure standalone output is enabled
# (Add: output: 'standalone' in next.config.js)
RUN npm run build

# ---------- Production runner ----------
FROM node:20-alpine AS runner
WORKDIR /app
ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1
ENV PORT=3000

# Create a non-root user
RUN addgroup -S nextjs && adduser -S nextjs -G nextjs

# Copy standalone build and static assets
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static
COPY --from=builder /app/public ./public

# Use non-root user
USER nextjs

EXPOSE 3000

CMD ["node", "server.js"]
