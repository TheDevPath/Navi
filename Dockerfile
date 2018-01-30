FROM node:8.9.4
RUN mkdir -p /app/client
WORKDIR /app/client
RUN npm install -g nodemon
ENV NPM_CONFIG_LOGLEVEL warn
COPY package.json /app/client

RUN npm install
COPY . /app/client
ENV NPM_CONFIG_LOGLEVEL warn
CMD nodemon -L src/index.js
EXPOSE 8080 8081
