define({ "api": [
  {
    "type": "get",
    "url": "/search/savedpins",
    "title": "Request saved pins",
    "name": "SavedPins",
    "group": "Pins",
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Array",
            "optional": false,
            "field": "Pins",
            "description": "<p>An array of pins</p>"
          }
        ]
      }
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "type": "String",
            "optional": false,
            "field": "500",
            "description": "<p>Server Error</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "./controllers/saved-pins-controller.js",
    "groupTitle": "Pins"
  }
] });
