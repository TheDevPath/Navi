/**
 * Module for calculating tile name for slippy maps.
 * 
 * Source: https://wiki.openstreetmap.org/wiki/Slippy_map_tilenames
 * 
 * Notes:
 * This article describes the file naming conventions for the Slippy Map application.
 * - Tiles are 256 × 256 pixel PNG files
 * - Each zoom level is a directory, each column is a subdirectory, and each tile in that column is a file
 * - Filename(url) format is /zoom/x/y.png
 * The slippy map expects tiles to be served up at URLs following this scheme, so all tile server URLs look pretty similar.
 */

 // utility functions
 const toRadians = (angle) => (angle * (Math.PI / 180));
 const toDegrees = (radian) => (radian * (180/ Math.PI));
 const getN = (zoom) => (Math.pow(2.0, zoom));
 const getSec = (radian) => (1 / Math.cos(radian));

 /**
  * Calculate x and y coords for tile url.
  * 
  * @param {number} lat latitude in degrees
  * @param {number} lng longitude in degrees
  * @param {number} zoom zoom level
  */
 exports.latLngToPoint = (lat, lng, zoom) => {
   const n = getN(zoom);
   const latRadians = toRadians(lat);

   const x = Math.floor(n * ((lng + 180) / 360));
   
   const secLat = getSec(latRadians);
   const y = Math.floor(n * (1 - (Math.log(Math.tan(latRadians) + secLat) / Math.PI)) / 2);
   return { x, y, z: zoom };
 };

 /**
  * Estimate latitude and longitude for give tile url point.
  * 
  * @param {number} x point x
  * @param {number} y point y
  * @param {number} zoom zoom level
  */
exports.pointToLatLng = (x, y, zoom) => {
  const n = getN(zoom);

  const lng = (x / n) * 360 - 180;
  const lat = Math.atan(Math.sinh(Math.PI - (y / n) * 2 * Math.PI)) * (180 / Math.PI);
  return { lat, lng };
};
