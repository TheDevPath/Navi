const http = require('https');
const {GOOGLE_API_KEY} = require('../config');

/**
 * Geolocation API access
 * Geolocation requests are sent using POST to the following URL:
 * https://www.googleapis.com/geolocation/v1/geolocate?key=<YOUR_KEY>
 */
const GEOLOCATION_OPTIONS = {
  "method": "POST",
  "hostname": "www.googleapis.com",
  "port": null,
  "path": `/geolocation/v1/geolocate?key=${GOOGLE_API_KEY}`,
  "headers": {
    "content-type": "application/json",
    "cache-control": "no-cache"
  }
};

/**
 * @description Hanlder for Geolocation API call
 * @returns {JSON} 'location': estimated 'lat' and 'lng'; 'accuracy': accuracy of
 * the estimated location, in meters
 */
exports.getGeolocation = function(appReq, appRes) {
    const req = http.request(GEOLOCATION_OPTIONS, function (res) {
        const chunks = [];
      
        res.on("data", function (chunk) {
          chunks.push(chunk);
        });
      
        res.on("end", function () {
          const body = Buffer.concat(chunks);
          console.log(body.toString());
          appRes.send(JSON.parse(body.toString()));
        });
      });
      
      req.write(JSON.stringify({}));
      req.end();
}
