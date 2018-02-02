const { ObjectID } = require('mongodb');

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
 * @description GET single saved pin from database by id
 * @api GET /search/savedpins/:id Request single pin
 * @apiSuccess 200 {Pin} returns a single pin.
 * @apiError 500 returns {error}
 * @apiError 404 returns - not found
 * @param {any} appReq.params.id - id of pin
 */
exports.getSavedPinsById = (appReq, appRes) => {
  const params = { id: appReq.params.id };
  if (!ObjectID.isValid(params.id)) {
    return appRes.status(404).send();
  }
  SavedPins.findById(params.id).then((pin) => {
    if (!pin) {
      return appRes.status(404).send();
    }
    return appRes.send({ pin });
  }).catch((e) => {
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
    appRes.send({ pin });
  }, (e) => {
    appRes.status(500).send(e);
  });
};

/**
 * @description DELETE all savedpins from database
 * @api DELETE /search/savedpins Delete all pins
 * @apiSuccess 200
 * @apiError 500 returns {error}
 */
exports.deleteSavedPins = (appReq, appRes) => {
  SavedPins.remove({}).then(() => {
    appRes.status(200).send();
  }).catch((e) => {
    appRes.status(500).send(e);
  });
};

/**
 * @description DELETE single saved pin from database by id
 * @api DELETE /search/savedpins/:id Delete single pin
 * @apiSuccess 200 {Pin} returns deleted pin.
 * @apiError 500 returns {error}
 * @apiError 404 returns - Not Found
* @param {any} appReq.params.id - id of pin
 */
exports.deleteSavedPinsById = (appReq, appRes) => {
  const params = { id: appReq.params.id };

  if (!ObjectID.isValid(params.id)) {
    return appRes.status(404).send();
  }

  SavedPins.findByIdAndRemove(params.id).then((pin) => {
    if (!pin) {
      return appRes.status(404).send();
    }

    appRes.send({ pin });
  }).catch((e) => {
    appRes.status(500).send(e);
  });
};
