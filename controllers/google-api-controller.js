const http = require('https');
const { URL } = require('url');
const { GOOGLE_API_KEY } = require('../config');
const { convertToQueryString } = require('./utils-controller');

/**
 * Geolocation API access
 * Geolocation requests are sent using POST to the following URL:
 * https://www.googleapis.com/geolocation/v1/geolocate?key=<YOUR_KEY>
 */
const GEOLOCATION_OPTIONS = {
  method: 'POST',
  hostname: 'www.googleapis.com',
  port: null,
  path: `/geolocation/v1/geolocate?key=${GOOGLE_API_KEY}`,
  headers: {
    'content-type': 'application/json',
    'cache-control': 'no-cache',
  },
};

/**
 * @description Hanlder for Geolocation API call
 * @returns {JSON} 'location': estimated 'lat' and 'lng'; 'accuracy': accuracy of
 * the estimated location, in meters
 */
exports.getGeolocation = (appReq, appRes) => {
  const req = http.request(GEOLOCATION_OPTIONS, (res) => {
    const chunks = [];

    res.on('data', (chunk) => {
      chunks.push(chunk);
    });

    res.on('end', () => {
      const body = Buffer.concat(chunks);
      appRes.send(JSON.parse(body.toString()));
    });
  });

  req.write(JSON.stringify({}));
  req.end();
};

/**
 * Static Maps API
 * Returns an image (either GIF, PNG, or JPEG) in response to URL request.
 * For each request, you can specifiy the location, size, zoom level, type of
 * map, and placement of optional markers at locations on the map; including
 * labels.
 *
 * API URL must be of the following form:
 * https://maps.googleapis.com/maps/api/staticmap?parameters
 */

/**
 * @description Handles request to get static map via google api
 *
 * @param {number} appReq.body.centerLat - lattitude for map center
 * @param {number} appReq.body.centerLng - longitude for map center
 * @param {number} appReq.body.zoom - resolution of the current view [0 - 21+], default 15
 * @param {string} appReq.body.size - size of image to return in pixels, default 640x640
 * @param {string} appReq.body.scale - image size multiplier[1, 2], default 1
 * @param {string} appReq.body.maptype - map format: [roadmap, satellite, terrain, hybrid],
 *   default is roadmap
 * @param {string} appReq.body.markers - map pin for given location, default sets it
 *   to center of the map (https://developers.google.com/maps/documentation/static-maps/intro#Markers)
 * @param {string} appReq.body.format - image type [png8, png32, gif, jpg, jpg-baseline],
 *   default is png8
 *
 * @returns {binary} Image file in the requested format
 */
exports.getStaticMap = (appReq, appRes) => {
  const BASE_URL = 'https://maps.googleapis.com/maps/api/staticmap?';
  const params = {
    key: GOOGLE_API_KEY,
    center: `${appReq.body.centerLat},${appReq.body.centerLng}`,
    zoom: appReq.body.zoom || 15,
    size: appReq.body.size || '640x640',
    scale: appReq.body.scale || 1,
    maptype: appReq.body.maptype || 'roadmap',
    markers: appReq.body.markers || `${appReq.body.lat},${appReq.body.lng}`,
    format: appReq.body.format || 'png8',
  };
  const queryString = convertToQueryString(params);
  const reqUrl = new URL(`${BASE_URL}${queryString}`);

  http.get(reqUrl, (res) => {
    const chunks = [];

    res.on('data', (chunk) => {
      chunks.push(chunk);
    });

    res.on('end', () => {
      const body = Buffer.concat(chunks);
      appRes.type(params.format.substr(0, 3)); // [png, gif, or jpg]
      appRes.send(body);
    });
  }).on('error', (e) => {
    appRes.send(e);
  });
};

/**
 * Place Autocomplete API
 * A Place Autocomplete request is an HTTP URL of the following form:
 * https://maps.googleapis.com/maps/api/place/autocomplete/output?parameters
 *
 * Where output may be either of the following values:
 *   - json (recommended) indicates output in JavaScript Object Notation (JSON)
 *   - xml indicates output as XML
 */

/**
 * @description Handles request for search autocompletion
 *
 * @param {string} appReq.body.output - Result output, json (default) or xml; expecting json.
 * @param {string} appReq.body.input - The text string on which to search.
 * @param {lat, lng} appReq.body.lat - (optional) The latitude for the point around which you
 *   wish to retrieve place information.
 * @param {lat, lng} appReq.body.lng - (optional) The longitude for the point around which you
 *   wish to retrieve place information.
 * @param {number} appReq.body.radius - (optional) The distance (in meters) within which
 *   to return place results. Note that setting a radius biases results to the indicated
 *   area, but may not fully restrict results to the specified area.
 * @param {string} appReq.body.types - (optional) The types of place results to return. If
 *   no type is specified, all types will be returned.
 *   (https://developers.google.com/places/web-service/autocomplete#place_types)
 * @param {boolean} appReq.body.strictbounds - (optional) Returns only those places that are
 *   strictly within the region defined by location and radius. This is a restriction, rather
 *   than a bias, meaning that results outside this region will not be returned even if they
 *   match the user input.
 */
exports.autocomplete = (appReq, appRes) => {
  const strictbounds = (appReq.body.strictbounds) ? 'strictbounds' : '';
  const output = appReq.body.output || 'json';
  const params = {
    input: appReq.body.input,
    key: GOOGLE_API_KEY,
    location: `${appReq.body.lat},${appReq.body.lng}` || '',
    radius: appReq.body.radius || '',
    types: appReq.body.types || '',
    strictbounds,
  };
  const BASE_URL = `https://maps.googleapis.com/maps/api/place/autocomplete/${output}?`;
  const queryString = convertToQueryString(params);
  const reqUrl = new URL(`${BASE_URL}${queryString}`);
  console.log(params);
  console.log(reqUrl);

  http.get(reqUrl, (res) => {
    const chunks = [];

    res.on('data', (chunk) => {
      chunks.push(chunk);
    });

    res.on('end', () => {
      const body = Buffer.concat(chunks);
      appRes.status(200).send(JSON.parse(body.toString()));
    });
  }).on('error', (e) => {
    appRes.send(e);
  });
};
