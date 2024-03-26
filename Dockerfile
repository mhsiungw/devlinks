FROM node:latest
WORKDIR /app

RUN npm install -g nodemon
RUN npm install -g @moonrepo/cli

COPY package.json /app/package.json
COPY ./app/server/package.json /app/app/server/package.json

RUN npm install

COPY . .

# RUN moon run <project>:<task>

CMD ["moon", "r", ":dev"]