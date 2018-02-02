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

// temporary hook to confirm base routing is working
router.get('/', (req, res) => {
  res.send('NOT IMPLEMENTED: Search View');
});

router.get('/savedpins', savedPinsController.getSavedPins);
router.get('/savedpins/:id', savedPinsController.getSavedPinsById);
router.post('/savedpins', savedPinsController.postSavedPins);
router.delete('/savedpins/:id', savedPinsController.deleteSavedPinsById);
module.exports = router;
