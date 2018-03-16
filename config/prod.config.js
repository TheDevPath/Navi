module.exports = {
  NODE_ENV: process.env.NODE_ENV || 'production',
  HOST: process.env.HOST,
  PORT: process.env.PORT,
  DB_URL: process.env.MONGODB_URI,
  GOOGLE_API_KEY: process.env.GOOGLE_API_KEY,
  JWT_KEY: process.env.JWT_KEY,
};
