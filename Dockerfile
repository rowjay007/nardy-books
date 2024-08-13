# Stage 1: Build
FROM node:22-alpine AS builder

# Install necessary packages
RUN apk add --no-cache python3 make g++

WORKDIR /usr/src/app

# Copy package files and install dependencies
COPY package*.json ./
RUN npm ci --only=production

# Copy source files and build the project
COPY . .
RUN npm rebuild bcrypt --build-from-source
RUN npm install -g typescript
RUN npm run build

# Stage 2: Final image
FROM node:22-alpine

# Set up timezone
ARG TZ=GMT
ENV TZ=${TZ}
RUN apk --no-cache add tzdata \
  && cp /usr/share/zoneinfo/${TZ} /etc/localtime \
  && echo "${TZ}" > /etc/timezone

# Create app directory and set permissions
WORKDIR /usr/src/app
RUN addgroup -S appgroup && adduser -S appuser -G appgroup
COPY --from=builder /usr/src/app /usr/src/app
RUN chown -R appuser:appgroup /usr/src/app

# Install cron
RUN apk add --no-cache cron

# Add and configure cron jobs
COPY ./cron-jobs /etc/cron.d/cron-jobs
RUN chmod 0644 /etc/cron.d/cron-jobs \
  && crontab /etc/cron.d/cron-jobs

# Expose port
EXPOSE 3001

# Use non-root user
USER appuser

# Start cron and the app
CMD ["sh", "-c", "crond && npm start"]