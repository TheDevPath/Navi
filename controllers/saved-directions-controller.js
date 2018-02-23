const SavedDirections = require('../models/saved-directions');

/**
 * @description Handles request for user saved directions
 *
 * @api {GET} /search/directions
 * @apiSuccess 200 {SavedDirections} The collection of all saved directions.
 * @apiError 500 {server error} Problem with server.
 */
exports.getSavedDirections = (appReq, appRes) => {
  SavedDirections.find({ user: appReq.userId }).then((directions) => {
    appRes.status(200).send({ directions });
  }, (err) => {
    appRes.status(500).send(err);
  });
};

/**
 * @description Handle request for getting a specified number of recently
 *  saved directions
 *
 * @api {GET} /search/directions/recent/:num
 * @apiSuccess 200 {directions} The requested recent num of saved directions.
 * @apiError 500 {server error} Server error
 * @apiError 404 {request error} Invalid req.params.num
 *
 * @param {String} appReq.params.num - Number of most recent saved directions to return.
 */
exports.getRecentDirections = (appReq, appRes) => {
  const num = parseInt(appReq.params.num);
  if (isNaN(num)) {
    return appRes.status(404).send({
      error: 'Invalid params passed.',
      param: appReq.params.num,
      parsedInt: num
    });
  }

  SavedDirections.find({ user: appReq.userId })
    .sort({save_date: 'desc'})
    .then((result) => {
      const directions = result.slice(0, num);
      appRes.send({ directions });
  }, (err) => {
    appRes.status(500).send(err);
  });
};

/**
 * @description Handles request to save a search query if not already in db
 *
 * @api {POST} /search/directions/
 * @apiSuccess 200 {directions} The document representing the saved query.
 * @apiError 500 {server error} Problem saving the requested pin.
 *
 * @param {lat, lng} appReq.body.origin - starting location
 * @param {lat, lng} appReq.body.destination - ending location
 * @param {[{lat, lng}]} appReq.body.waypoints - array of geocoded waypoints
 *  from origin to destination
 * @param {[String]} appReq.body.directions - array of string representing
 *  turn-by-turn directions
 * @param {string} appReq.body.label - (optional) user provided label description
 */
exports.saveDirections = (appReq, appRes) => {
  const saveQuery = {
    origin: appReq.body.origin,
    destination: appReq.body.destination,
    waypoints: appReq.body.waypoints,
    directions: appReq.body.directions,
    label: appReq.body.label || `${appReq.body.origin} - ${appReq.body.destination}`,
    user: appReq.userId,
  }

  const update = {
    lastModified: true,
    $currentDate : {
      save_date: {$type: 'date'},
    },
    $set: {
      waypoints: saveQuery.waypoints,
      directions: saveQuery.directions,
      label: saveQuery.label,
    }
  }

  const options = {
    new: true, // return modified doc instead of original
    upsert: true, // create if doesn't exist
  }

  SavedDirections.findOneAndUpdate({
    origin: saveQuery.origin,
    destination: saveQuery.destination,
    user: saveQuery.user,
  },
    update,
    options,
    (err, directions) => {
      if (err) {
        return appRes.status(500).send(err);
      }

      return appRes.status(200).send({directions});
    });
};

/**
 * @description Handles request to delete all saved directions
 *
 * @api {DELETE} /search/directions
 * @apiSuccess 200 {success} Sucessfully deleted all directions data
 * @apiError 500 {server error}
 */
exports.deleteSavedDirections = (appReq, appRes) => {
  SavedDirections.remove({ user: appReq.userId }).then(() => {
    appRes.status(200).send({ success: true });
  }).catch((err) => {
    appRes.status(500).send({
      error: err,
      success: false,
    });
  });
};

