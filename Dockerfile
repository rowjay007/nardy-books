FROM node:22-alpine

RUN apk add --no-cache python3 make g++

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

COPY . .

RUN npm rebuild bcrypt --build-from-source

RUN npm install -g typescript

RUN npm run build --verbose

EXPOSE 3001

ARG TZ=GMT
ENV TZ=${TZ}
RUN apk --no-cache add tzdata \
  && cp /usr/share/zoneinfo/${TZ} /etc/localtime \
  && echo "${TZ}" > /etc/timezone

CMD ["npm", "start"]
