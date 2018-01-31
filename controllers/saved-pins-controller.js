const SavedPins = require('../models/saved-pins');

/**
 * TODO - export functions to be used for completing requests in ../routes/search.js
 */

exports.getSavedPins = (appReq, appRes) => {
  SavedPins.find().then((savedPins) => {
    appRes.send({ savedPins });
  }, (e) => {
    appRes.status(400).send(e);
  });
};

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

