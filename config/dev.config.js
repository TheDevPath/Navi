const SECRETS = require('./secrets.json'); // nodejs will auto read json

module.exports = {
  NODE_ENV: process.env.NODE_ENV || 'development',
  HOST: process.env.HOST || 'http://localhost',
  PORT: process.env.PORT || 8081,
  DB_URL: SECRETS.mongodb_dev.db_url,
  GOOGLE_API_KEY: SECRETS.google_maps.api_key,
  JWT_KEY: SECRETS.jwt.key,
};
