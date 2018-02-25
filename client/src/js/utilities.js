import {h, Component, render} from 'preact';
import Cookies from "universal-cookie";
import axios from "axios/index";
import {API_SERVER} from "../../config";
import {route} from "preact-router";

const TOKEN_COOKIE = 'token';

const renderElement = (content, element_id) => {
  let element = document.getElementById(element_id);
  render(content, element, element.lastChild);
}

const passwordsMatch = (formData) => {
  //If there is no confirm_password field (like signin page), return true
  return formData.confirm_password === undefined || formData.password === formData.confirm_password;
}

const deleteTokenCookie = () => {
  const cookies = new Cookies();
  cookies.remove(TOKEN_COOKIE);
}

const getToken = () => {
  const cookies = new Cookies();
  return cookies.get(TOKEN_COOKIE);
}

const getSignInPromise = () => {
  return axios.get(`${API_SERVER}/users/user`, {headers: {'x-access-token': getToken()}});
}

const formDataForAxios = (form) => {
  let formData = {};
  for (var pair of new FormData(form).entries()) {
    formData[pair[0]] = pair[1];
  }
  return formData;
}

const setTokenCookie = (val) => {
  const cookies = new Cookies();
  cookies.set(TOKEN_COOKIE, val, {path: '/'});
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

  axios.post(`${API_SERVER}${path}`, formData)
    .then(function (response) {
      setTokenCookie(response.data.token);
      populateSignInOut();
      route('/profile', true);
    })
    .catch(function (error) {
      if (error.response === undefined) {
        renderElement(error, MESSAGE_AREA);
        return;
      }
      if (error.response.status === 401) {
        deleteTokenCookie();
        renderElement('Wrong password.', MESSAGE_AREA);
      } else {
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
  deleteTokenCookie();
  populateSignInOut();
  route('/', true);
}

export const handleRegisterSubmit = (event) => {
  handleSubmit(event, '/users/register');
}

export const handleSigninSubmit = (event) => {
  handleSubmit(event, '/users/login');
}

