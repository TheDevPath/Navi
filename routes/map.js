const express = require('express');

const router = express.Router();

// require controller modules
const googleApiController = require('../controllers/google-api-controller');

/**
 * TODO - hook up url route end points to constroller functions
 */

// temporary hook to confirm base routing is working
router.get('/', (req, res) => {
  res.status(404).send({
    success: false,
    error: 'Not a valid end point!',
  });
});

router.get('/geolocation', googleApiController.getGeolocation);
router.post('/staticmap', googleApiController.getStaticMap);
router.post('/directions', googleApiController.directions);
router.post('/geocode', googleApiController.geocode);

module.exports = router;
