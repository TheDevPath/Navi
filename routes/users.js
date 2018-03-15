const express = require('express');
const usersController = require('../controllers/users-controller');
const { verifyToken } = require('../controllers/utils-controller');

const router = express.Router();

/**
 * Users endpoints
 */
/**
 * @description Handle requests to users main end point
 *
 * @api {GET} /users
 * @return {success: false, error: err} Not a valid end point
 */
router.get('/', (req, res) => {
  res.status(404).send({
    success: false,
    error: 'Not a valid end point!',
  });
});

/**
 * Valid Users endpoints
 */
router.post('/register', usersController.registerUser);
router.get('/user', verifyToken, usersController.getUser);
router.post('/login', usersController.loginUser);
router.get('/logout', usersController.logoutUser);
router.post('/reset-password', verifyToken, usersController.resetPassword);
router.post('/update', verifyToken, usersController.update);

module.exports = router;
