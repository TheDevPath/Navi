/**
 * Library for handling frontend requests to server api endpoints
 */

 // node_modules imports
import axios from 'axios';
import Cookies from "universal-cookie";

// app module imports
import { API_SERVER } from '../../config';

// module constants
const TOKEN_COOKIE = 'token';
export const BASE_ENDPOINTS = { // Key-value pairs for existing base server endpoints
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
  userReset: '/users/reset-password',
  userUpdate: '/users/update',
  geocode: '/map/geocode',
  directions: '/map/directions',
}

export const token = {
  setCookie: val => {
    const cookies = new Cookies();
    cookies.set(TOKEN_COOKIE, val, {path: '/'});
  },
  
  deleteCookie: () => {
    const cookies = new Cookies();
    cookies.remove(TOKEN_COOKIE);
  },
  
  getCookie: () => {
    const cookies = new Cookies();
    return cookies.get(TOKEN_COOKIE);
  }
  
}

/* makeRequest(...)

__include__ import {makeRequest} from "../../js/server-requests-utils"
__exmample__  makeRequest('GET','savedPins').then(res => {return res.data})

__output__ Promise that returns an object with the following keys:
* config
* data: response body
* headers
* request
* status
* statusText

* See: https://www.npmjs.com/package/axios#response-schema for more on the output
*
* Configuration of Axios for making server requests
* See 'Creating an instance' and 'Request Config' sections for more information:
* https://www.npmjs.com/package/axios
*/

export const makeRequest = (method='GET', baseEndPoint, endPointAddon='', bodyData={}, params={}, headers={}) => {

  const validMethod = ['GET', 'POST', 'DELETE', 'PATCH','PUT']; //determined by axios

  //if it's not a valid method, return rejected promise
  if (!validMethod.includes(method)) {
    return new Promise(function (res,rej) {
      rej(TypeError(`Invalid request method: ${method}`));
    })
  }

  const url = ((BASE_ENDPOINTS[baseEndPoint] || baseEndPoint) + endPointAddon).trim();
  headers['x-access-token'] = token.getCookie();
  const config = {method,
    url,
    params,
    headers,
    baseURL: API_SERVER,
    data: bodyData
  }

  console.log('makeRequest().config: ', config);

  return axios.request(config);
}
