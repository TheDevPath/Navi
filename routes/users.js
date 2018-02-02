const express = require('express');
const jwt = require('jsonwebtoken');
const usersController = require('../controllers/users-controller');
const { JWT_KEY } = require('../config');

const router = express.Router();

/** TODO - move verifyToken into utilsController so it can be used for
 *   other user specific data. E.g. saved pins and directions and search
 *   history.
 * /
/**
 * @description Authorization middleware for verifying access rights
 *
 * @param {string} req.headers['x-access-token'] - request header key used for
 *   tracking token
 */
const verifyToken = (req, res, next) => {
  const token = req.headers['x-access-token'];

  if (!token) {
    return res.status(403).send({
      auth: false,
      message: 'No token provided.',
    });
  }

  jwt.verify(token, JWT_KEY, (err, decoded) => {
    if (err) {
      return res.status(500).send({
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
 * Users endpoints
 */

router.post('/register', usersController.registerUser);
router.get('/user', verifyToken, usersController.getUser);
router.post('/login', usersController.loginUser);
router.get('/logout', usersController.logoutUser);

module.exports = router;
