const express = require('express');

const router = express.Router();

// require controller modules
const savedDirectionsController = require('../controllers/saved-directions-controller');
const savedPinsController = require('../controllers/saved-pins-controller');
const searchHistoryController = require('../controllers/search-history-controller');
const { verifyToken } = require('../controllers/utils-controller');
/* TODO - require specific functions needed for search from google-api-controller */

/**
 * TODO - hook up url route end points to constroller functions
 */

// temporary hook to confirm base routing is working
router.get('/', (req, res) => {
  res.send('NOT IMPLEMENTED: Search View');
});

router.get('/savedpins', verifyToken, savedPinsController.getSavedPins);
router.get('/savedpins/:id', verifyToken, savedPinsController.getSavedPinsById);
router.post('/savedpins', verifyToken, savedPinsController.postSavedPins);
router.delete('/savedpins', verifyToken, savedPinsController.deleteSavedPins);
router.delete('/savedpins/:id', verifyToken, savedPinsController.deleteSavedPinsById);

module.exports = router;
