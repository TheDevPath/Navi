const express = require('express');

const router = express.Router();

// require controller modules
const savedDirectionsController = require('../controllers/saved-directions-controller');
const savedPinsController = require('../controllers/saved-pins-controller');
const searchHistoryController = require('../controllers/search-history-controller');
const { verifyToken } = require('../controllers/utils-controller');
const { autocomplete, placeDetails, textSearch } = require('../controllers/google-api-controller');

/**
 * @description Handle requests to search main end point
 *
 * @api {GET} /search
 * @return {success: false, error: err} Not a valid end point
 */
router.get('/', (req, res) => {
  res.status(404).send({
    success: false,
    error: 'Not a valid end point!',
  });
});

/**
 * Saved pins end points
 */
router.get('/savedpins', verifyToken, savedPinsController.getSavedPins);
router.get('/savedpins/:id', verifyToken, savedPinsController.getSavedPinsById);
router.post('/savedpins', verifyToken, savedPinsController.postSavedPins);
router.delete('/savedpins', verifyToken, savedPinsController.deleteSavedPins);
router.delete('/savedpins/:id', verifyToken, savedPinsController.deleteSavedPinsById);

/**
 * Search and Places query endpoints
 */
router.get('/places/:id', placeDetails);
router.post('/autocomplete', autocomplete);
router.get('/textsearch', textSearch);
router.post('/textsearch', textSearch);

/**
 * Saved search history end points
 */
router.get('/history', verifyToken, searchHistoryController.getSearchHistory);
router.get('/history/recent/:num', verifyToken, searchHistoryController.getRecent);
router.post('/history/:query', verifyToken, searchHistoryController.saveQuery);
router.delete('/history', verifyToken, searchHistoryController.deleteSearchHistory);

/**
 * Saved directions end points
 */
router.get('/directions', verifyToken, savedDirectionsController.getSavedDirections);
router.get('/directions/recent/:num', verifyToken, savedDirectionsController.getRecentDirections);
router.post('/directions', verifyToken, savedDirectionsController.saveDirections);
router.delete('/directions', verifyToken, savedDirectionsController.deleteSavedDirections);

module.exports = router;
