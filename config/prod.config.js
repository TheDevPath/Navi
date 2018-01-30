const fs = require('fs');
const path = require('path');

const JSON_SECRETS = JSON.parse(fs.readFileSync(path.join(__dirname, 'secrets.json')));

module.exports = {
  NODE_ENV: process.env.NODE_ENV || 'production',
  HOST: process.env.HOST,
  PORT: process.env.PORT,
  DB_URL : JSON_SECRETS.mongodb_prod.db_url,
  GOOGLE_API_KEY: JSON_SECRETS.google_maps.api_key
};
