const express = require('express');

const router = express.Router();

// require controller modules
const googleApiController = require('../controllers/google-api-controller');

/**
 * TODO - hook up url route end points to constroller functions
 */

// temporary hook to confirm base routing is working
router.get('/', (req, res) => {
  res.send('NOT IMPLEMENTED: Map View');
});

// Geolocation api hook
router.get('/geolocation', googleApiController.getGeolocation);

module.exports = router;
