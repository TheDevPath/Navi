const express = require('express');
const router = express.Router();

// require controller modules
const savedDirectionsController = require('../controllers/saved-directions-controller');
const savedPinsController = require('../controllers/saved-pins-controller');
const searchHistoryController = require('../controllers/search-history-controller');
/* TODO - require specific functions needed for search from google-api-controller */

/**
 * TODO - hook up url route end points to constroller functions
 */


module.exports = router;