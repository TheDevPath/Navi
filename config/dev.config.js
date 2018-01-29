module.exports = {
    NODE_ENV: process.env.NODE_ENV || 'development',
    HOST: process.env.HOST || 'http://localhost',
    PORT: process.env.PORT || 8081,
    DB_URL: 'mongodb://mongo/app_db' // using default port (27017)
};