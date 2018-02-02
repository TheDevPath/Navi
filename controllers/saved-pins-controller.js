const { ObjectID } = require('mongodb');

const SavedPins = require('../models/saved-pins');

/**
 * @description Handles request for user saved pins
 *
 * @api {GET} /search/savedpins
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
 * @description Handle request for getting saved pin with a given id
 *
 * @api {GET} /search/savedpins/:id
 * @apiSuccess 200 {Pin} The requested pin object.
 * @apiError 500 {server error}
 * @apiError 404 {request error} Invalid pin id.
 *
 * @param {String} appReq.params.id - Unique id for the requested pin
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
 * @api {POST} /search/savedpins
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
 * @description Handles request to delete all saved pins
 *
 * @api {DELETE} /search/savedpins
 * @apiSuccess 200
 * @apiError 500 {server error}
 */
exports.deleteSavedPins = (appReq, appRes) => {
  SavedPins.remove({}).then(() => {
    appRes.status(200).send();
  }).catch((e) => {
    appRes.status(500).send(e);
  });
};

/**
 * @description Handles request to delete a saved pin with given id
 *
 * @api {DELETE} /search/savedpins/:id
 * @apiSuccess 200 {Pin} The deleted pin object.
 * @apiError 500 {server error}
 * @apiError 404 {request error} Invalid pin id.
 *
 * @param {String} appReq.params.id - Unique id for the requested pin
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
