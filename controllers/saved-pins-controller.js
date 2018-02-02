const SavedPins = require('../models/saved-pins');

/**
 * @description Handles request for user saved pins
 *
 * @api {GET} /savedpins
 * @apiSuccess 200 {SavedPins} The collection of saved pins.
 * @apiError 500 {server error} Problem finding all saved pins.
 */
exports.getSavedPins = (appReq, appRes) => {
  SavedPins.find().then((savedPins) => {
    appRes.send({ savedPins });
  }, (e) => {
    appRes.status(500).send(e);
  });
};

/**
 * @description Handles request to save a pin
 *
 * @api {POST} /savedpins
 * @apiSuccess 200 {SavedPins} The document representing the saved pin.
 * @apiError 500 {server error} Problem saving the requested pin.
 *
 * @param {number} appReq.body.lat - lattitude coordinate for pin location
 * @param {number} appReq.body.lng - longitude coordinate for pin location
 * @param {string} appReq.body.place_id - name of pin location
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
    appRes.status(500).send(e);
  });
};
