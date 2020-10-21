FROM node:latest

WORKDIR /app

COPY package.json .

COPY publisher.js .

RUN npm install

CMD ["node","publisher.js"]

