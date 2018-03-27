// node_module imports
const L = require('leaflet');
const decodePolyline = require('decode-google-map-polyline');

// app module imports
const { latLngToPoint, pointToLatLng } = require('./osm-tile-name');
const { makeRequest, BASE_ENDPOINTS } = require('./server-requests-utils')

L.Routing = L.Routing || {};

L.Routing.Google = L.Class.extend({
  options: {

  },

  initialize: function(options, TILE_LAYER) {
    L.Util.setOptions(this, options);
    this._TILE_LAYER = TILE_LAYER;
  },

  route: function(waypoints, callback, context, options) {
    // TODO - handle waypoints that include stopovers
    const origin = `${waypoints[0].latLng.lat},${waypoints[0].latLng.lng}`;
    const destination = `${waypoints[1].latLng.lat},${waypoints[1].latLng.lng}`;

    // get directions
    makeRequest('POST', BASE_ENDPOINTS.directions, '', {
      origin,
      destination,
      units: 'metric',
    }).then((response) => {
      console.log('google api response:\n', response);
      this._processResponse(response, waypoints, callback, context, options);
    }).catch((err) => {
      console.log('google api error: ', err);
      callback.call(context || callback, err);
    });
  },

  _processResponse: function(response, inputWaypoints, callback, context, options) {
    const routes = [];

    // iterate through each google route
    response.data.routes.forEach((respRoute) => {
      const route = {};

      // store route specific data
      route.inputWaypoints = inputWaypoints;
      route.name = respRoute.summary;
      route.summary = {
        totalTime: respRoute.legs[0].duration.value,
        totalDistance: respRoute.legs[0].distance.value,
      };

      // store step specific data for each leg
      route.coordinates = []; // equivalent to polylines
      route.instructions = [];

      // iterate through each step of the leg for given route
      respRoute.legs[0].steps.forEach((step) => {
        const point = decodePolyline(step.polyline.points);
        route.coordinates.push(...point);
        route.instructions.push({
          distance: step.distance.value,
          time: step.duration.value,
          text: step.html_instructions
        });
      });

      // prefetch/cache polylines
      if (this._TILE_LAYER) {
        route.coordinates.forEach((latLng) => {
          const coord = latLngToPoint(latLng.lat, latLng.lng, 18);

          // TODO - if needed cache all four corners by looping +1 for x/y
          this._TILE_LAYER.cacheAhead(coord, () => {
            // console.log('cached coord: ', coord);
          });
        });
      }

      routes.push(route);
    });

    callback.call(context || callback, null, routes);
  }
});

L.Routing.google = function(options={}, TILE_LAYER=null) {
  return new L.Routing.Google(options, TILE_LAYER);
};
