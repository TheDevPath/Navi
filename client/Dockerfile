FROM node:8.9.4
RUN mkdir -p /app/client
WORKDIR /app/client

ENV NPM_CONFIG_LOGLEVEL warn
COPY package.json /app/client

RUN npm install
COPY . /app/client
ENV NPM_CONFIG_LOGLEVEL warn
CMD npm run start
EXPOSE 8080 8081
