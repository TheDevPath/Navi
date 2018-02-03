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
