module.exports = {
  NODE_ENV: process.env.NODE_ENV || 'production',
  HOST: process.env.HOST,
  PORT: process.env.PORT,
  // TODO - replace 'your_secret' with shorthand app name once that is decided
  DB_URL : 'mongodb://localhost/your_secret'  // using default port (27017)
};
