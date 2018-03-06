// Package Dependencies
const bodyParser = require('body-parser');
const express = require('express');
const helmet = require('helmet');
const mongoose = require('mongoose');
const morgan = require('morgan');

// Local Dependencies
const { DB_URL, NODE_ENV: ENV } = require('./config');

// Instantiate Express Server
const app = express();

/**
 * MONGODB CONNECTION
 */

// Setup MongoDB connection using the global promise library and then get connection
mongoose.connect(DB_URL, { promiseLibrary: global.Promise }, (error) => {
  if (error) {
    console.log(`MongoDB connection error: ${error}`);

    // should consider alternative to exiting the app due to db conn issue
    process.exit(1);
  }
});

const db = mongoose.connection;

/**
 * MIDDLEWARE
 */

// Set security-related HTTP headers (https://expressjs.com/en/advanced/best-practice-security.html#use-helmet)
app.use(helmet());

// Allow access on headers and avoid CORS issues
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Access, Authorization, x-access-token',
  );

  if (req.method === 'OPTIONS') {
    res.header('Access-Control-Allow-Methods', 'GET, PUT, POST, PATCH, DELETE');

    res.header(
      'Access-Control-Allow-Headers',
      'Origin, X-Requested-With, Content-Type, Access, Authorization, x-access-token',
    );

    return res.status(200).json({});
  }

  next();
});

// Parse incoming requests
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Log every request to the console
app.use(morgan('dev'));

/**
 * ROUTES
 */

// API Routes
app.use('/', require('./routes/index'));
app.use('/map', require('./routes/map'));
app.use('/search', require('./routes/search'));
app.use('/users', require('./routes/users'));

// TODO: Create additional routes as necessary

// Serve static assets and index.html in production
if (ENV === 'production') {
  // Serve static assets
  app.use(express.static('client/build'));

  // Serve index.html file if no other routes were matched
  const { resolve } = require('path');

  app.get('**', (req, res) => {
    res.sendFile(resolve(__dirname, 'client', 'build', 'index.html'));
  });
}

module.exports = app;
