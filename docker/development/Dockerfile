FROM node:20
WORKDIR /app

RUN npm install -g nodemon

COPY package.json .
COPY ./app/server/package.json ./app/server/package.json
COPY ./app/client/package.json ./app/client/package.json

RUN npm install

COPY . .
