const SavedPins = require('../models/saved-pins');

/**
 * TODO - export functions to be used for completing requests in ../routes/search.js
 */

/**
 * Function to GET saved pins from the SavedPins model
 * @api {GET} /savedpins Request SavedPins information
 * @apiSuccess 200 {SavedPins} returns a collection of SavedPins.
 * @apiError 400 returns {error}
 *
 * @param {any} appReq
 * @param {any} appRes
 */
exports.getSavedPins = (appReq, appRes) => {
  SavedPins.find().then((savedPins) => {
    appRes.send({ savedPins });
  }, (e) => {
    appRes.status(400).send(e);
  });
};

/**
 * Function to POST saved pins from the SavedPins model
 * @api {POST} /savedpins saves {SavedPins}
 * @apiSuccess 200 {SavedPins} returns the mongodb {SavedPins} after saved.
 * @apiError 400 returns {error}
 *
 * @param {any} appReq
 * @param {any} appRes
 */
exports.postSavedPins = (appReq, appRes) => {
  const savedPin = new SavedPins({
    lat: appReq.body.lat,
    lng: appReq.body.lng,
    place_id: appReq.body.place_id,
  });

  savedPin.save().then((pin) => {
    appRes.send(pin);
  }, (e) => {
    appRes.status(400).send(e);
  });
};

