import {h, Component, render} from 'preact';
import {route} from "preact-router";
import {makeRequest, token} from './server-requests-utils';

const renderElement = (content, element_id) => {
  let element = document.getElementById(element_id);
  render(content, element, element.lastChild);
}

const passwordsMatch = (formData) => {
  //If there is no confirm_password field (like signin page), return true
  return formData.confirm_password === undefined || formData.password === formData.confirm_password;
}

const getSignInPromise = () => {
  return makeRequest('GET','user');
}

const formDataForAxios = (form) => {
  let formData = {};
  for (var pair of new FormData(form).entries()) {
    formData[pair[0]] = pair[1];
  }
  return formData;
}

const handleSubmit = (event, path) => {
  event.preventDefault();
  const MESSAGE_AREA = 'message_area';

  const formData = formDataForAxios(event.target);
  const formDataClone = formData;
  if (!passwordsMatch(formDataClone)) {
    renderElement('Passwords do not match', MESSAGE_AREA);
    return;
  }

  makeRequest('POST', path, '', formData)
  .then(function (response) {
      token.setCookie(response.data.token);
      populateSignInOut();
      route('/profile', true);
    })
    .catch(function (error) {
      if (error.response === undefined) {
        renderElement(error, MESSAGE_AREA);
        return;
      }
      if (error.response.status === 401) {
        token.deleteCookie();
        renderElement('Wrong password.', MESSAGE_AREA);
      } else {
        console.log(error);
        renderElement(error.response.data, MESSAGE_AREA);
      }
    });
}

// Exports below
export const populateSignInOut = () => {
  getSignInPromise().then(() => {
    document.getElementById("signInOut").innerHTML = '<a href="/signout" >Sign Out</a>';
  }).catch(() => {
    document.getElementById("signInOut").innerHTML = '<a href="/signin">Sign In</a>';
  });
}

export const clearForms = () => {
  for (let form of document.getElementsByTagName("form")) {
    form.reset();
  }
}

export const logout = () => {
  token.deleteCookie();
  populateSignInOut();
  route('/', true);
}

export const handleRegisterSubmit = (event) => {
  handleSubmit(event, '/users/register');
}

export const handleSigninSubmit = (event) => {
  handleSubmit(event, '/users/login');
}