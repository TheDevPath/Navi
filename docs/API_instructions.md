# API documentation guidelines

## About apiDOC
apiDoc automates documentation from API annotations in source code. A documentation block starts with /** and end with */.  

## Current state and what needs to be done
Currently there is existing annotation already in the targeted files. However they are not complete and therefore not being generated properly. All of these files need to be updated so that the annotation is correct and complete.
Additionally the contribution guidelines needs a special section to be written that incorporates some of these instructions here, and asks contributors to target the api-docs branch


### API annotations and examples 
Any API instructions needs to, at a minimum have the API method, the API name, the API group, what happens when an API is successful and what happens when it fails.

This example adapts one of our own API calls and documents what the API call is doing.
 
 /**
 
 * @api {get} /search/savedpins Request saved pins
 * @apiName SavedPins //api name
 * @apiGroup Pins //group name
 * @apiSuccess {Array} Pins An array of pins //if successful it returns an array of pins
 * @apiError {String} 500 Server Error //if error then it returns a string 500 Server Error
 
 **/

The *above* annotation results in [this html page](sampleapidocsNavi) being automatically generated.



Here is another sample of how annotation can be done

/**
 * @api {get} /user/:id Request User information
 * @apiName GetUser
 * @apiGroup User
 *
 * @apiParam {Number} id Users unique ID.
 *
 * @apiSuccess {String} firstname Firstname of the User.
 * @apiSuccess {String} lastname  Lastname of the User.
 */

This would result in the [following page](http://apidocjs.com/example/) being generated

This example describes a GET Method to request the User Information by the user's id.

`@api {get} /user/:id Request User information` is mandatory, without @api apiDoc ignores a documentation block.

`@apiName` must be a unique name and should always be used.
Format: *method* + *path* (e.g. Get + User)

`@apiGroup` should always be used, and is used to group related APIs together.

All [other fields](http://apidocjs.com/#params) are optional



## Additional Notes
The name of the page is derived from the file apidoc.json. 
From apidoc.json apiDocs get the name, version and description of your project.


At the moment it contains:

`{
  "name": "NAVI-API",
  "version": "0.1.0",
  "description": "Navi API documentation"
}`

Here is [another](http://apidocjs.com/source/example_full/apidoc.json) example of a complete apidoc.json

## Examples of end to end implementation
- [Example 1](https://blog.jscrambler.com/documenting-apis-using-apidoc-js/)

## Useful commands 

- [@api](http://apidocjs.com/#param-api)
- [@apiName](http://apidocjs.com/#param-api-name)
- [@apiGroup](http://apidocjs.com/#param-api-group)
- [@apiSuccess](http://apidocjs.com/#param-api-success)
- [@apiError](http://apidocjs.com/#param-api-error)

And of course examples would be great. If you are able to include additional information here are others that are good to have
- [@apiSuccessExample](http://apidocjs.com/#param-api-success-example)
- [@apiErrorExample](http://apidocjs.com/#param-api-error-example)
- [@apiSampleRequest](http://apidocjs.com/#param-api-sample-request)
