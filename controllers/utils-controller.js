/**
 * Utility controller module.
 * @module controller/utils-controller
 */

const jwt = require('jsonwebtoken');
const { JWT_KEY } = require('../config');

/**
 * @description Authorization middleware for verifying user access rights
 *
 * @apiError 401 {request error} Unauthorized - no token provided.
 * @apiError 403 {request error} Unable to authenticate user.
 *
 * @param {string} req.headers['x-access-token'] - request header key used for
 *   tracking token
 */
exports.verifyToken = (req, res, next) => {
  const token = req.headers['x-access-token'];

  if (!token) {
    return res.status(401).send({
      auth: false,
      message: 'No token provided.',
    });
  }

  jwt.verify(token, JWT_KEY, (err, decoded) => {
    if (err) {
      return res.status(403).send({
        auth: false,
        message: 'Failed to authenticate token.',
      });
    }

    // if good, save to request for next route
    req.userId = decoded.id;
    req.token = token;
    next();
  });
};

/**
 * @description Utility function for generating query string from an object with
 *   key-value pairs for params needed for http request using native node https.
 *
 * @param {Object} paramsObject: key-value pairs for params needed for request
 *   to be parsed as query string
 */
exports.convertToQueryString = (paramsObject) => {
  const str = [];
  const keys = Object.keys(paramsObject);
  keys.forEach((element) => {
    str.push(`${encodeURIComponent(element)}=${encodeURIComponent(paramsObject[element])}`);
  });
  return str.join('&');
};

/**
 * @description Utility function for processing google places autocomplete
 *   results.
 * 
 * @param {Object} queryResult: JSON response containing two root elememts:
 *   - status: contains metadata on the request along with status codes
 *   - predictions: an array of query predictions
 * 
 * @returns {[Ojbect]} An array of suggestions as object with two root elements:
 *   - prediction: the predicted query
 *   - placeID: if prediction is a place else ''
 */
exports.processAutocomplete = (queryResult) => {
  const descriptions = [];
  const placeIds = [];
  queryResult.predictions.forEach((result) => {
    const description = result.description;
    const placeId = result.place_id || '';
    descriptions.push(description);
    placeIds.push(placeId);
  });
  return {descriptions, placeIds};
};
