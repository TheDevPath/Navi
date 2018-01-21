const bodyParser = require('body-parser');
const express = require('express');
const mongoose = require('mongoose');  // using ODM wrapper for MongoDB
const database = require('./config/database');
const morgan = require('morgan');  // log requests to the console
const app = express();

// set up MongoDB connection using the global promise library and then get connection
mongoose.connect(database.url, {promiseLibrary: global.Promise}, error => {
  if (error) {
    console.log(`MongoDB connection error: ${error}`);
    process.exit(1);  // should consider alternative to exiting the app due to db conn issue
  }
});
const db = mongoose.connection;

// To allow access on headers and also to avoid CORS issues
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Access, Authorization',
  );

  if (req.method === 'OPTIONS') {
    res.header('Access-Control-Allow-Methods', 'GET, PUT, POST, PATCH, DELETE');

    return res.status(200).json({});
  }

  next();
});

// Parse incoming requests
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(morgan('dev'));  // log every request to the console

// Routes
/*
  TODO:
  Update application routes
*/
app.get('/', (req, res) => {
  res.status(200).send('Hello, World!');
});

// API Routes
app.use('/api', require('./routes/api'));

module.exports = app;
