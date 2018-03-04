/**
 * Library for handling frontend requests to server api endpoints
 */

import axios from 'axios';
import { API_SERVER } from '../../config';
import { url } from 'inspector';
import Cookies from "universal-cookie";

/**
* Configuration of Axios for making server requests
* See 'Creating an instance' and 'Request Config' sections for more information:
* https://www.npmjs.com/package/axios
*/
const AXIOS_INSTANCE = axios.create({
  baseURL: API_SERVER
});

const TOKEN_COOKIE = 'token';

/**
 * Key-value pairs for existing base server endpoints
 */
const BASE_ENDPOINTS = {
  savedPins: '/search/savedpins',
  savedDirections: '/search/directions',
  savedHistory: '/search/history',
  autocomplete: '/search/autocomplete',
  places: '/search/places',
  user: '/users/user',
  userLogin: '/users/login',
  userLogout: '/users/logout',
  userRegister: '/users/register',
  textsearch: '/search/textsearch',
}

/**
 * Utility functions
 */

const token = {
  setCookie: val => {
    const cookies = new Cookies();
    cookies.set(TOKEN_COOKIE, val, {path: '/'});
  },

  deleteCookie: () => {
    const cookies = new Cookies();
    cookies.remove(TOKEN_COOKIE);
  },

  get: () => {
    const cookies = new Cookies();
    return cookies.get(TOKEN_COOKIE);  
  }

}


exports.postAutocomplete = (input='') => {
  return AXIOS_INSTANCE.post(url=BASE_ENDPOINTS.autocomplete, {input});
}

/**
 * Exported functions
 */
// TODO - generalized method
exports.makeRequest = (method='GET', baseEndPoint, endPointAddon={}, bodyData={}, params={}) => {
  switch (method) {
    case 'GET':
      break;
    case 'POST':
      break;
    case 'DELETE':
      break;
    default:
      return new TypeError(`Invalid request method: ${method}`);
  }
}