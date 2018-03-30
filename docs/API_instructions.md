# API documentation guidelines

Any API instructions needs to, at a minimum have the API method, the API name, the API group, what happens when an API is successful and what happens when it fails.

This example adapts one of our own API calls and documents what the API call is doing.
     /**
 * @api {get} /search/savedpins Request saved pins
 * @apiName SavedPins //api name
 * @apiGroup Pins //group name
 * @apiSuccess {Array} Pins An array of pins //if successful it returns an array of pins
 * @apiError {String} 500 Server Error //if error then it returns a string 500 Server Error
    **/

- [@api](http://apidocjs.com/#param-api)
- [@apiName](http://apidocjs.com/#param-api-name)
- [@apiGroup](http://apidocjs.com/#param-api-group)
- [@apiSuccess](http://apidocjs.com/#param-api-success)
- [@apiError](http://apidocjs.com/#param-api-error)

And of course examples would be great. If you are able to include additional information here are others that are good to have
- [@apiSuccessExample](http://apidocjs.com/#param-api-success-example)
- [@apiErrorExample](http://apidocjs.com/#param-api-error-example)
- [@apiSampleRequest](http://apidocjs.com/#param-api-sample-request)
