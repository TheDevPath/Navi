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
