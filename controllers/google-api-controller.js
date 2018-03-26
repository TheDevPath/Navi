const http = require('https');
const { URL } = require('url');
const { GOOGLE_API_KEY } = require('../config');
const { convertToQueryString, processAutocomplete } = require('./utils-controller');

// used for location biasing for search results requests
const RADIUS_BOUND = 1000;

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
 *
 * @api {GET} /map/geolocation
 * @apiSuccess 200 {JSON} 'location': estimated 'lat' and 'lng'; 'accuracy': accuracy of
 *   the estimated location, in meters.
 * @apiError 400 {request error} Google api request error.
 */
exports.getGeolocation = (appReq, appRes) => {
  const req = http.request(GEOLOCATION_OPTIONS, (res) => {
    const chunks = [];

    res.on('data', (chunk) => {
      chunks.push(chunk);
    });

    res.on('end', () => {
      const body = Buffer.concat(chunks);
      appRes.status(200).send(JSON.parse(body.toString()));
    });
  }).on('error', (err) => {
    appRes.send(err);
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
 * @api {POST} /map/staticmap
 * @apiSuccess 200 {binary} Image file in the requested format.
 * @apiError 400 {request error} Google api request error.
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
 * @api {POST} /search/autocomplete
 * @apiSuccess 200 {JSON} With two root elements:
 *   - status: a string identifier of the request outcome
 *   - predictions: an array query predictions
 * @apiError 400 {request error} Google api request error.
 *
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
  const params = {
    input: appReq.body.input,
    key: GOOGLE_API_KEY,
    location: `${appReq.body.lat},${appReq.body.lng}` || '',
    radius: appReq.body.radius || RADIUS_BOUND,
    types: appReq.body.types || '',
    strictbounds,
  };
  const BASE_URL = 'https://maps.googleapis.com/maps/api/place/autocomplete/json?';
  const queryString = convertToQueryString(params);
  const reqUrl = new URL(`${BASE_URL}${queryString}`);
  
  http.get(reqUrl, (res) => {
    const chunks = [];

    res.on('data', (chunk) => {
      chunks.push(chunk);
    });

    res.on('end', () => {
      const body = Buffer.concat(chunks);
      const queryResult = JSON.parse(body.toString());
      const outcome = processAutocomplete(queryResult);
      const result = {
        status: queryResult.status,
        predictions: outcome.descriptions,
        placeIds: outcome.placeIds,
        descSubfields: outcome.descSubfields,
      };

      appRes.status(200).send(result);
    });
  }).on('error', (err) => {
    appRes.send(err);
  });
};

/**
 * Place Details API
 * A Place Details request is an HTTP URL of the following form:
 * https://maps.googleapis.com/maps/api/place/details/output?parameters
 *
 * Where output may be either of the following values:
 *   - json (recommended) indicates output in JavaScript Object Notation (JSON)
 *   - xml indicates output as XML
 */
/**
 * @description Handles request for getting details for given place_id.
 *
 * @api {GET} /search/places/:id
 * @apiSuccess 200 {JSON} Potential search queries.
 * @apiError 400 {request error} Google api request error.
 *
 * @param {string} appReq.params.id - The unique google place_id identifier for a place.
 */
exports.placeDetails = (appReq, appRes) => {
  const strictbounds = (appReq.body.strictbounds) ? 'strictbounds' : '';
  const params = {
    placeid: appReq.params.id, // 'placeid' is required for google api request
    key: GOOGLE_API_KEY,
  };
  const BASE_URL = 'https://maps.googleapis.com/maps/api/place/details/json?';
  const queryString = convertToQueryString(params);
  const reqUrl = new URL(`${BASE_URL}${queryString}`);

  http.get(reqUrl, (res) => {
    const chunks = [];

    res.on('data', (chunk) => {
      chunks.push(chunk);
    });

    res.on('end', () => {
      const body = Buffer.concat(chunks);
      const queryResult = JSON.parse(body.toString());
      appRes.status(200).send(queryResult);
    });
  }).on('error', (err) => {
    appRes.send(err);
  });
};

/**
 * Directions Services API
 * When specifying the origin or destination in a directions request, you can specify
 * a query string (for example, "Chicago, IL" or "Darwin, NSW, Australia"), a LatLng value,
 * or a google.maps.Place object.
 *
 * A Google Maps Directions API request takes the following form:
 * https://maps.googleapis.com/maps/api/directions/outputFormat?parameters
 *
 * Where outputFormat may be either of the following values:
 *  - json (recommended) indicates output in JavaScript Object Notation (JSON)
 *  - xml indicates output as XML
 */

/**
 * @description Handles request for directions
 *
 * @api {POST} /map/directions
 * @apiSuccess 200 {JSON} Directions result.
 * @apiError 400 {request error} Google api request error.
 *
 * @param {string|lat,lng|place_id} origin - The address, textual latitude/longitude value,
 *   or place ID from which you wish to calculate directions.
 * @param {string|lat,lng|place_id} destination - The address, textual latitude/longitude value,
 *   or place ID to which you wish to calculate directions.
 * @param {string} mode - (optional) Specifies the mode of tranport to use for calculating
 *   directions. [driving (default), walking, bicycling, transit]
 *   (https://google-developers.appspot.com/maps/documentation/directions/intro#TravelModes)
 * @param {...lat,lng|...place_id|...address} waypoints = (optional) Specifies a list of waypoints.
 *   Waypoints alter a route by routing it through the specified location(s). A waypoint
 *   is specified as a latitude/longitude coordinate, an encoded polyline, a place ID,
 *   or an address which will be geocoded. Use pipe character delimitaton for more than one.
 *   (https://google-developers.appspot.com/maps/documentation/directions/intro#Waypoints)
 * @param {boolean} alternatives - (optional) If set to true, specifies that the Directions
 *   service may provide more than one route alternative in the response. Note that providing
 *   route alternatives may increase the response time from the server.
 * @param {...string} avoid - (optional) Indicates that the calculated route(s) should
 *   avoid the indicated features. [tolls, highways, ferries, indoor]
 *   Multiple value example:  avoid=tolls|highways|ferries.
 * @param {number} arrival_time - (optional) Specifies the desired time of arrival for
 *   transit directions, in seconds since midnight, January 1, 1970 UTC.
 * @param {number} departure_time - (optional) Specifies the desired time of departure.
 *   You can specify the time as an integer in seconds since midnight, January 1, 1970 UTC.
 *   Alternatively, you can specify a value of now, which sets the departure time to the
 *   current time (correct to the nearest second). The departure time may be specified in
 *   two cases: 1. travel mode is transit 2. travel mode is driving.
 * @param {string} traffic_model - (defaults to best_guess) Specifies the assumptions to use
 *   when calculating time in traffic. The traffic_model parameter may only be specified for
 *   driving directions where the request includes a departure_time.
 *   [best_guess, pessimistic, optimistic]
 * @param {string} transit_mode - (optional) Specifies one or more preferred modes of transit.
 *   This parameter may only be specified for transit directions. [bus, subway, train, tram, rail]
 *   rail - equivalent to transit_mode = train|tram|subway
 * @param {string} transit_routing_preference - (optional) Specifies preferences for transit
 * routes. Using this parameter, you can bias the options returned, rather than accepting
 * the default best route chosen by the API. [less_walking, fewer_transfers]
 * @param {string} units - specifies the unit system for displaying results:
 *   - metric: km/meters
 *   - imperial: miles/feet
 *
 * @returns {Object} Default google maps json response
 *   (https://google-developers.appspot.com/maps/documentation/directions/intro#DirectionsResponseElements)
 */
exports.directions = (appReq, appRes) => {
  // handle optional params that will need additonal formating
  const alternatives = (appReq.body.alternatives) ? true : '';
  const trafficModel = (appReq.body.mode === 'driving' && appReq.body.traffic_model) ?
    appReq.body.traffic_model : '';
  const transitRoutingPref = (appReq.body.mode === 'transit' && appReq.body.transit_routing_preference) ?
    appReq.body.transit_routing_preference : '';

  // generate params object for query string
  const params = {
    key: GOOGLE_API_KEY,
    origin: appReq.body.origin,
    destination: appReq.body.destination,
    mode: appReq.body.mode || 'driving',
    waypoints: appReq.body.waypoints || '',
    alternatives,
    avoid: appReq.body.avoid || '',
    arrival_time: appReq.body.arrival_time || '',
    departure_time: appReq.body.departure_time || '',
    traffic_model: trafficModel,
    transit_mode: appReq.body.transit_mode || '',
    transit_routing_preference: transitRoutingPref || '',
    units: appReq.body.units || '',
  };
  const BASE_URL = 'https://maps.googleapis.com/maps/api/directions/json?';
  const queryString = convertToQueryString(params);
  const reqUrl = new URL(`${BASE_URL}${queryString}`);

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

/**
 * Geocoding API
 * A Google Maps Geocoding request is an HTTP URL of the following form:
 * https://maps.googleapis.com/maps/api/geocode/outputFormat?parameters
 *
 * Where output may be either of the following values:
 *   - json (recommended) indicates output in JavaScript Object Notation (JSON)
 *   - xml indicates output as XML
 */

/**
 * @description Handles request for processing converting addresses into
 *   geographic lat/lng coordinates or reverse if applicable.
 *   Note - unpredicatable when used with latlng input type; recommend using for
 *   retrieving latlng only i.e. use address input type.
 *
 * @api {POST} /map/geocode
 * @apiSuccess 200 {JSON} With two root elements:
 *   - status: a string identifier of the request outcome
 *   - result: an array objects
 *     reference: https://developers.google.com/maps/documentation/geocoding/intro#Results
 * @apiError 400 {request error} Google api request error.
 *
 * @param {string} appReq.body.input The street address or lat/lng you want
 *  to geocode.
 * @param {string} appReq.body.type ['address'(default), 'latlng'] Input type
 *  passed for geocode request.
 */
exports.geocode = (appReq, appRes) => {
  const type = appReq.body.type || 'address';
  const params = {
    key: GOOGLE_API_KEY,
  };
  if (appReq.body.input && (type === 'address')) {
    params.address = appReq.body.input;
  } else if (appReq.body.input && (type === 'latlng')) {
    params.latlng = appReq.body.input;
  } else {
    return appRes.status(404).send({
      success: false,
      error: 'Invalid request, check passed params!',
    });
  }
  const BASE_URL = 'https://maps.googleapis.com/maps/api/geocode/json?';
  const queryString = convertToQueryString(params);
  const reqUrl = new URL(`${BASE_URL}${queryString}`);

  http.get(reqUrl, (res) => {
    const chunks = [];

    res.on('data', (chunk) => {
      chunks.push(chunk);
    });

    res.on('end', () => {
      const body = Buffer.concat(chunks);
      const queryResult = JSON.parse(body.toString());
      appRes.status(200).send(queryResult);
    });
  }).on('error', (err) => {
    appReq.send(err);
  });
};

/**
* TextSearch API
* A Text Search request is an HTTP URL of the following form:
* https://maps.googleapis.com/maps/api/place/textsearch/output?parameters
*
* Where output may be either of the following values:
* - json (recommended) indicates output in JavaScript Object Notation (JSON)
* - xml indicates output as XML
*/
/**
* @description Handles request for search input query to get back search results and its geocode details
*
* @api {POST} /search/textSearch
* @apiSuccess 200 {JSON} With two root elements:
* - status: a string identifier of the request outcome
* - results: An array, each element of the results array
* contains a single result from the specified area (location and radius)
* @apiError 400 {request error} Google api request error.
*
* @param {string} appReq.body.input - The text string on which to search.
* @param {lat, lng} appReq.body.lat - The latitude for the point around which you
* wish to retrieve place information.
* @param {lat, lng} appReq.body.lng - The longitude for the point around which you
* wish to retrieve place information.
*
*/
exports.textSearch = (appReq, appRes) => {
  const strictbounds = (appReq.body.strictbounds) ? 'strictbounds' : '';
  const params = {
    input: appReq.body.input,
    key: GOOGLE_API_KEY,
    location: `${appReq.body.lat},${appReq.body.lng}` || '',
    radius: appReq.body.radius || RADIUS_BOUND,
    types: appReq.body.types || '',
    strictbounds,
  };
  const BASE_URL = 'https://maps.googleapis.com/maps/api/place/textsearch/json?';
  const queryString = convertToQueryString(params);
  const reqUrl = new URL(`${BASE_URL}${queryString}`);
  http.get(reqUrl, (res) => {
    const chunks = [];
    res.on('data', (chunk) => {
      chunks.push(chunk);
    });
    res.on('end', () => {
      const body = Buffer.concat(chunks);
      const queryResult = JSON.parse(body.toString());
      appRes.status(200).send(queryResult);
    });
  }).on('error', (err) => {
    appRes.send(err);
  });
};
