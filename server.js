const http = require('http');

const config = require('./config');
const app = require('./app.js');

const server = http.createServer(app);

server.listen(config.PORT, () => {
  console.info(`Server is running at ${config.HOST}:${config.PORT}`);
});

module.exports = server;
