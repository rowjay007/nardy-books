FROM node:22-alpine

# Install necessary packages
RUN apk add --no-cache python3 make g++ cron

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

COPY . .

RUN npm rebuild bcrypt --build-from-source
RUN npm install -g typescript
RUN npm run build

# Set up timezone
ARG TZ=GMT
ENV TZ=${TZ}
RUN apk --no-cache add tzdata \
  && cp /usr/share/zoneinfo/${TZ} /etc/localtime \
  && echo "${TZ}" > /etc/timezone

# Add and configure cron jobs
COPY ./cron-jobs /etc/cron.d/cron-jobs
RUN chmod 0644 /etc/cron.d/cron-jobs
RUN crontab /etc/cron.d/cron-jobs

# Expose port
EXPOSE 3001

# Start cron and the app
CMD ["sh", "-c", "crond && npm start"]
