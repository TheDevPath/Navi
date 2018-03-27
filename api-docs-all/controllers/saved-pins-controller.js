/*
 * Example
 *
 * This is an example for apiDoc.
 * Define parts of your documentation that shall be used many times.
 * That block could be used many times with "@apiUse UserNotFoundError".
 *
 * Documentation blocks without @api (like this block) will be ignored.
 */

/**
 * @api {get} /search/savedpins Request saved pins
 * @apiName SavedPins
 * @apiGroup Pins
 *
 *
 * @apiSuccess {Array} Pins An array of pins
 * @apiError {String} 500 Server Error
 */