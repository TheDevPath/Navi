const bodyParser = require('body-parser');
const express = require('express');

const app = express();

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
