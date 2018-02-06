const express = require('express');
const usersController = require('../controllers/users-controller');
const { verifyToken } = require('../controllers/utils-controller');

const router = express.Router();

/**
 * Users endpoints
 */

router.post('/register', usersController.registerUser);
router.get('/user', verifyToken, usersController.getUser);
router.post('/login', usersController.loginUser);
router.get('/logout', usersController.logoutUser);

module.exports = router;
