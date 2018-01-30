const fs = require('fs');
const path = require('path');

const JSON_SECRETS = JSON.parse(fs.readFileSync(path.join(__dirname, 'secrets.json')));

module.exports = {
  NODE_ENV: process.env.NODE_ENV || 'development',
  HOST: process.env.HOST || 'http://localhost',
  PORT: process.env.PORT || 8081,
  DB_URL : JSON_SECRETS.mongodb_dev.db_url,
  GOOGLE_API_KEY: JSON_SECRETS.google_maps.api_key
};
