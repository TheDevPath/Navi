const SECRETS = require('./secrets.json');

module.exports = {
  NODE_ENV: process.env.NODE_ENV || 'production',
  HOST: process.env.HOST,
  PORT: process.env.PORT,
  DB_URL: SECRETS.mongodb_prod.db_url,
  GOOGLE_API_KEY: SECRETS.google_maps.api_key,
  JWT_KEY: SECRETS.jwt.key,
};
