import {route} from 'preact-router';
import { makeRequest, token, BASE_ENDPOINTS } from './server-requests-utils';
import { LOGIN_PATH, REGISTER_PATH, RESET_PATH, UPDATE_PATH } from '../../config';

const validEmail = (email) => {
  const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
};

const validPassword = (password) => {
  const re = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,}$/;
  return re.test(String(password));
};

const passwordsMatch = (password1, password2) => {
  return password1 === password2;
};

const validateReset = (formData) => {
  const {name, email, password, new_password, confirm_password} = formData;

  // passwords form fields are required so if any is null then user info update
  if (password && new_password && confirm_password) {
    // validate passwords
    if (!validPassword(password) || !validPassword(new_password) ||
      !validPassword(confirm_password)) {
        return {
          status: false,
          message: 'Password should have atleast 6 characts, should have atleast one letter, number, and special character',
          body: null,
        };
    } else if (!passwordsMatch(new_password, confirm_password)) {
      return {
        status: false,
        message: 'Try again, new passwords don\'t match!',
        body: null,
      };
    } else {
      return {
        status: true,
        message: 'Success - valid request!',
        body: {password, new_password, confirm_password},
      };
    }
  }

  // validate user info has at least one field completed
  if (!name && !email) {
    return {
      status: false,
      message: 'Please enter a new name and/or email address!',
      body: null,
    };
  }
  
  return {
    status: true,
    message: 'Success - valid request!',
    body: {name, email},
  };
};

const validateLogin = (formData) => {
  const {email, password} = formData;

  if (!validPassword(password)) {
    return {
      status: false,
      message: 'Password should have atleast 6 characts, should have atleast one letter, number, and special character',
      body: null,
    };
  }

  return {
    status: true,
    message: 'Success - valid request!',
    body: {email, password},
  };
};

const validateRegister = (formData) => {
  const {name, email, password, confirm_password} = formData;

  if (!validPassword(password) || !validPassword(confirm_password)) {
      return {
        status: false,
        message: 'Password should have atleast 6 characts, should have atleast one letter, number, and special character',
        body: null,
      };
  } else if (!passwordsMatch(password, confirm_password)) {
    return {
      status: false,
      message: 'Try again, passwords don\'t match!',
      body: null,
    };
  } else {
    return {
      status: true,
      message: 'Success - valid request!',
      body: {name, email, password, confirm_password},
    };
  }
};

// Exports below
export const validateAccountForm = (args) => {

  let {path, formData} = args;

  let result = null;

  if (path === RESET_PATH) {
    result = validateReset(formData);
    
    if (result.body.email || result.body.name) {
      path = BASE_ENDPOINTS.userUpdate;
    }
  }

  if (path === REGISTER_PATH) {
    result = validateRegister(formData);
  }

  if (path == LOGIN_PATH) {
    result = validateLogin(formData);
  }

  const {status, message, body} = result;

  // return if validation fails
  if (!status) {
    return new Promise((resolve, reject) => {
      resolve({status, message});
    });
  }

  // otherwise process server request
  return new Promise((resolve, reject) => {
    makeRequest('POST', path, '', body)
    .then(function (response) {
      // TODO - need to better handle token assignment and update
      // because depending on the type of response this is accidentally
      // removing the token. This temp change should prevent that
      // from happening for now.
      if (response.data.token) {
        token.setCookie(response.data.token);
      }
        resolve({status, message});
      })
      .catch(function (error) {
        reject(error);
      });
  });
};

export const clearForms = () => {
  for (let form of document.getElementsByTagName("form")) {
    form.reset();
  }
};

export const logout = () => {
  token.deleteCookie();
};

export const setStateUserOrRedirectToSignIn = (component) => {
  return makeRequest('GET','user')
    .then((response) => {
      component.setState({
        user: response.data,
        isSignedIn: true,
      });
      }
    ).catch(() => {
      route('/signin', true);
  });
}
