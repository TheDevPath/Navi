const express = require('express');
const router = express.Router();

// require controller modules
const googleApiController = require('../controllers/saved-directions-controller');

/**
 * TODO - hook up url route end points to constroller functions
 */

 // temporary hook to confirm base routing is working
 router.get('/', function(req, res) {
     res.send('NOT IMPLEMENTED: Map View');
 })

module.exports = router;