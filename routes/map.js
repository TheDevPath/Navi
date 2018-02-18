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

router.get('/geolocation', googleApiController.getGeolocation);
router.post('/staticmap', googleApiController.getStaticMap);
router.post('/directions', googleApiController.directions);

module.exports = router;
