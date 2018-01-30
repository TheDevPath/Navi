FROM node:8.9.4
RUN mkdir -p /app
WORKDIR /app
RUN npm install -g nodemon
ENV NPM_CONFIG_LOGLEVEL warn
COPY package.json /app

RUN npm install
COPY . /app
ENV NPM_CONFIG_LOGLEVEL warn
CMD nodemon -L server.js
EXPOSE 8080 8081
