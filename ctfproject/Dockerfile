FROM node:lts-alpine

# Install pnpm and Docker client
RUN apk add --no-cache docker-cli
RUN corepack enable && corepack prepare pnpm@latest --activate

# Set working directory
WORKDIR /app

# Copy package files
COPY package.json pnpm-lock.yaml ./

# Install dependencies with legacy peer deps
RUN pnpm install --frozen-lockfile

# Copy application code
COPY . .

# Build the Next.js application
RUN pnpm build

# Expose port
EXPOSE 3000

# Start the application
CMD ["pnpm", "start"]