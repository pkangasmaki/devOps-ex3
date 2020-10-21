FROM node:latest

WORKDIR /app

COPY package.json .

COPY consumer.js .

RUN npm install

CMD ["node","consumer.js"]

