const User = require('../models/users');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const events = require('events');
const { JWT_KEY } = require('../config');

// create event handler for this controller
const usersControllerEE = new events.EventEmitter();

/**
 * Helper functions
 */

const validateEmail = (email) => {
  const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
};

const validatePassword = (password) => {
  const re = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,}$/;
  return re.test(String(password));
};

const comparePassword = (password1, password2) => bcrypt.compareSync(password1, password2);

const getInvalidPasswordResponse = appRes => appRes.status(401).send({
  auth: false,
  token: null,
});

/**
 * Helper function to query database to ensure a validated email
 *  isn't already assigned to a user.
 *
 * @param {string} validEmail email address that has passed validation
 * @returns {boolean} promise object that resolves to boolean confirming whether
 *  or not email is already assigned to a user.
 */
const uniqueEmail = (validEmail) => {
  return new Promise((resolve, reject) => {
    User.count({ email: validEmail }, (err, result) => {
      if (err) {
        reject(err);
      }

      if (result > 0) {
        resolve(false);
      }
      resolve(true);
    });
  });
};

/**
 * Request handler functions
 */

/**
 * @description Handles user registeration
 *
 * @api {POST} /users/register
 * @apiSuccess 200 {auth: true, token: token} jsonwebtoken.
 * @apiError 409 {request error} Email already exists.
 * @apiError 500 {server error} Registeration failed.
 *
 * @param {string} appReq.body.name - name provided by user
 * @param {string} appReq.body.email - email provided by user
 * @param {string} appReq.body.password - user provided password
 */
exports.registerUser = (appReq, appRes) => {
  /**
   *  Checks whether any of the fields are empty while submission.
   *  Checks whether the email address is of a valid format
   *  Checks whether password is of minimum 6 characters & that it has atleast one number,
   *   one letter, & atleast one specail character.
   */
  // validate user info
  if (appReq.body.email && appReq.body.name && appReq.body.password) {
    if (!validateEmail(appReq.body.email)) return appRes.status(400).send('Email is not of the valid format');
    if (!validatePassword(appReq.body.password)) {
      return appRes.status(400)
        .send('Password should have minimum length of 6 & it should have atleast one letter, one number, and one special character');
    }
  } else {
    return appRes.status(400).send('One or more fields were left empty');
  }

  // check whether user already exists with given email
  uniqueEmail(appReq.body.email).then((result) => {
    if (!result) {
      return appRes.status(409).send('Email already in use.');
    }

    // encrypt password
    const HASHED_PASSWORD = bcrypt.hashSync(appReq.body.password, 8);
  
    User.create(
      {
        name: appReq.body.name,
        email: appReq.body.email,
        password: HASHED_PASSWORD,
      },
      (err, user) => {
        if (err) {
          return appRes.status(500)
            .send('There was a problem registering the user.');
        }
  
        // create token
        const token = jwt.sign({ id: user._id }, JWT_KEY, {
          expiresIn: 86400, // expires in 24 hours
        });
  
        appRes.status(200).send({ auth: true, token });
      },
    );
  }).catch(() => {
    return appRes.status(500)
      .send('There was a problem registering the user.');
  });
};

/**
 * @description Get users information by utilizing verifyToken to
 *  authenticate user informtion.
 *
 * @api {GET} /users/user
 * @apiSuccess 200 {_id: db._id, name: user_name, email: user_email} User info.
 * @apiError 400 {request error} User not found.
 * @apiError 500 {server error} Problem finding user.
 */
exports.getUser = (appReq, appRes) => {
  User.findById(
    appReq.userId,
    { password: 0 },
    (err, user) => {
      if (err) return appRes.status(500).send('There was a problem with finding the user.');

      if (!user) return appRes.status(400).send('No user found.');

      appRes.status(200).send(user);
    },
  );
};

/**
 * @description Handles user login
 *
 * @api {POST} /users/login
 * @apiSuccess 200 {auth: true, token: token} jsonwebtoken.
 * @apiError 401 {auth: false, token: null} Invalid password.
 * @apiError 404 {request error} User not found.
 * @apiError 500 {server error} Problem finding user.
 *
 * @param {string} appReq.body.email - email provided by user
 * @param {string} appReq.body.password - user provided password
 */
exports.loginUser = (appReq, appRes) => {
  User.findOne({ email: appReq.body.email }, (err, user) => {
    if (err) return appRes.status(500).send('Error on the server.');
    if (!user) return appRes.status(404).send('No user found.');
    if (!comparePassword(appReq.body.password, user.password)) {
      return getInvalidPasswordResponse(appRes);
    }

    const token = jwt.sign({ id: user._id }, JWT_KEY, {
      expiresIn: 86400,
    });

    return appRes.status(200).send({
      auth: true,
      token,
    });
  });
};

/**
 * @description Handles logout request for backend testing purposes.
 *  NOTE - frontend should handle user logout by deleting cached token
 *
 * @api {GET} /users/logout
 * @apiSuccess 200 {auth: false, token: null} jsonwebtoken.
 */
exports.logoutUser = (appReq, appRes) => {
  appRes.status(200).send({
    auth: false,
    token: null,
  });
};


/**
 * @description Handles resetting password
 *
 * @api {POST} /users/reset-password
 * @apiSuccess 200 {auth: true, token: token} jsonwebtoken.
 * @apiError 401 {auth: false, token: null} Invalid password.
 * @apiError 404 {request error} User not found.
 * @apiError 500 {server error} Problem finding user.
 *
 * @param {string} appReq.body.password - current user password
 * @param {string} appReq.body.new_password - user provided new password
 * @param {string} appReq.body.confirm_password - user provided password
 */
exports.resetPassword = (appReq, appRes) => {
  const HASHED_PASSWORD = bcrypt.hashSync(appReq.body.new_password, 8);

  User.findById(appReq.userId, (err, user) => {
    if (err) return appRes.status(500).send('Error on the server.');
    if (!user) return appRes.status(404).send('No user found.');
    if (!comparePassword(appReq.body.password, user.password)) {
      return getInvalidPasswordResponse(appRes);
    }

    user.password = HASHED_PASSWORD;

    user.save((error, updatedUser) => {
      if (error) return appRes.status(500).send('Error on the server.');

      // TODO - do we need resend the token again? It already exists...
      const token = jwt.sign({ id: updatedUser._id }, JWT_KEY, {
        expiresIn: 86400,
      });

      return appRes.status(200).send({
        auth: true,
        token,
      });
    });
  });
};

/**
 * @description Handles updating user info
 *
 * @api {POST} /users/update
 * @apiSuccess 200 {auth: true, token: token} jsonwebtoken.
 * @apiError 401 {auth: false, token: null} Invalid password.
 * @apiError 404 {request error} User not found.
 * @apiError 500 {server error} Problem finding user.
 *
 * @param {string} appReq.body.name - name provided by user
 * @param {string} appReq.body.email - email provided by user
 */
exports.update = (appReq, appRes) => {
  const updateFields = {};

  // event lister for when to process update
  usersControllerEE.on('update', () => {
    User.findByIdAndUpdate(
      appReq.userId,
      { $set: updateFields },
      { new: true },
      (error, updatedUser) => {
        if (error) {
          return appRes.status(500).send('Error on the server.');
        }

        return appRes.status(200).send({
          // don't send password!!
          user: {
            name: updatedUser.name,
            email: updatedUser.email,
            _id: updatedUser._id,
          },
        });
      },
    );
  });

  // prepare name for update
  if (appReq.body.name) {
    updateFields.name = appReq.body.name;
  }

  // process email verification and rest of user update accordingly
  // halt if email request not unique even if name request included
  if (appReq.body.email && validateEmail(appReq.body.email)) {
    uniqueEmail(appReq.body.email).then((result) => {
      if (result) {
        updateFields.email = appReq.body.email;
        usersControllerEE.emit('update');
      }
      
      appRes.status(400).send('Email is already in use!');
    }).catch((error) => {
      appRes.status(500).send(error);
    });
  } else if (appReq.body.name) { // handle name only update
    usersControllerEE.emit('update');
  } else { // only email update requested but invalid email
    appRes.status(400)
      .send('Email is not of the valid format!');
  }
};
