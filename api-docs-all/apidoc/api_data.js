define({ "api": [
  {
    "type": "get",
    "url": "/tasks",
    "title": "List all tasks",
    "group": "Tasks",
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Object[]",
            "optional": false,
            "field": "tasks",
            "description": "<p>Task's list</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "tasks.id",
            "description": "<p>Task id</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "tasks.title",
            "description": "<p>Task title</p>"
          },
          {
            "group": "Success 200",
            "type": "Boolean",
            "optional": false,
            "field": "tasks.done",
            "description": "<p>Task is done?</p>"
          },
          {
            "group": "Success 200",
            "type": "Date",
            "optional": false,
            "field": "tasks.updated_at",
            "description": "<p>Update's date</p>"
          },
          {
            "group": "Success 200",
            "type": "Date",
            "optional": false,
            "field": "tasks.created_at",
            "description": "<p>Register's date</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success",
          "content": "HTTP/1.1 200 OK\n[{\n  \"id\": 1,\n  \"title\": \"Study\",\n  \"done\": false\n  \"updated_at\": \"2016-02-10T15:46:51.778Z\",\n  \"created_at\": \"2016-02-10T15:46:51.778Z\"\n}]",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "List error",
          "content": "HTTP/1.1 500 Internal Server Error",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "./index.js",
    "groupTitle": "Tasks",
    "name": "GetTasks"
  },
  {
    "type": "DELETE",
    "url": "/search/directions",
    "title": "",
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "optional": false,
            "field": "200",
            "description": "<p>{success} Sucessfully deleted all directions data</p>"
          }
        ]
      }
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "500",
            "description": "<p>{server error}</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "./controllers/saved-directions-controller.js",
    "group": "_home_ubuntu_workspace_googleMaps_offline_navigator_controllers_saved_directions_controller_js",
    "groupTitle": "_home_ubuntu_workspace_googleMaps_offline_navigator_controllers_saved_directions_controller_js",
    "name": "DeleteSearchDirections"
  },
  {
    "type": "GET",
    "url": "/search/directions",
    "title": "",
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "optional": false,
            "field": "200",
            "description": "<p>{SavedDirections} The collection of all saved directions.</p>"
          }
        ]
      }
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "500",
            "description": "<p>{server error} Problem with server.</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "./controllers/saved-directions-controller.js",
    "group": "_home_ubuntu_workspace_googleMaps_offline_navigator_controllers_saved_directions_controller_js",
    "groupTitle": "_home_ubuntu_workspace_googleMaps_offline_navigator_controllers_saved_directions_controller_js",
    "name": "GetSearchDirections"
  },
  {
    "type": "GET",
    "url": "/search/directions/recent/:num",
    "title": "",
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "optional": false,
            "field": "200",
            "description": "<p>{directions} The requested recent num of saved directions.</p>"
          }
        ]
      }
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "500",
            "description": "<p>{server error} Server error</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "404",
            "description": "<p>{request error} Invalid req.params.num</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "./controllers/saved-directions-controller.js",
    "group": "_home_ubuntu_workspace_googleMaps_offline_navigator_controllers_saved_directions_controller_js",
    "groupTitle": "_home_ubuntu_workspace_googleMaps_offline_navigator_controllers_saved_directions_controller_js",
    "name": "GetSearchDirectionsRecentNum"
  },
  {
    "type": "POST",
    "url": "/search/directions/",
    "title": "",
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "optional": false,
            "field": "200",
            "description": "<p>{directions} The document representing the saved query.</p>"
          }
        ]
      }
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "500",
            "description": "<p>{server error} Problem saving the requested pin.</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "./controllers/saved-directions-controller.js",
    "group": "_home_ubuntu_workspace_googleMaps_offline_navigator_controllers_saved_directions_controller_js",
    "groupTitle": "_home_ubuntu_workspace_googleMaps_offline_navigator_controllers_saved_directions_controller_js",
    "name": "PostSearchDirections"
  },
  {
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "optional": false,
            "field": "varname1",
            "description": "<p>No type.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "varname2",
            "description": "<p>With type.</p>"
          }
        ]
      }
    },
    "type": "",
    "url": "",
    "version": "0.0.0",
    "filename": "./doc/main.js",
    "group": "_home_ubuntu_workspace_googleMaps_offline_navigator_doc_main_js",
    "groupTitle": "_home_ubuntu_workspace_googleMaps_offline_navigator_doc_main_js",
    "name": ""
  },
  {
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "optional": false,
            "field": "varname1",
            "description": "<p>No type.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "varname2",
            "description": "<p>With type.</p>"
          }
        ]
      }
    },
    "type": "",
    "url": "",
    "version": "0.0.0",
    "filename": "./main.js",
    "group": "_home_ubuntu_workspace_googleMaps_offline_navigator_main_js",
    "groupTitle": "_home_ubuntu_workspace_googleMaps_offline_navigator_main_js",
    "name": ""
  },
  {
    "type": "",
    "url": "private",
    "title": "",
    "version": "0.0.0",
    "filename": "./node_modules/body-parser/lib/read.js",
    "group": "_home_ubuntu_workspace_googleMaps_offline_navigator_node_modules_body_parser_lib_read_js",
    "groupTitle": "_home_ubuntu_workspace_googleMaps_offline_navigator_node_modules_body_parser_lib_read_js",
    "name": "Private"
  },
  {
    "type": "",
    "url": "private",
    "title": "",
    "version": "0.0.0",
    "filename": "./node_modules/body-parser/lib/types/json.js",
    "group": "_home_ubuntu_workspace_googleMaps_offline_navigator_node_modules_body_parser_lib_types_json_js",
    "groupTitle": "_home_ubuntu_workspace_googleMaps_offline_navigator_node_modules_body_parser_lib_types_json_js",
    "name": "Private"
  },
  {
    "type": "",
    "url": "public",
    "title": "",
    "version": "0.0.0",
    "filename": "./node_modules/body-parser/lib/types/raw.js",
    "group": "_home_ubuntu_workspace_googleMaps_offline_navigator_node_modules_body_parser_lib_types_raw_js",
    "groupTitle": "_home_ubuntu_workspace_googleMaps_offline_navigator_node_modules_body_parser_lib_types_raw_js",
    "name": "Public"
  },
  {
    "type": "",
    "url": "private",
    "title": "",
    "version": "0.0.0",
    "filename": "./node_modules/body-parser/lib/types/text.js",
    "group": "_home_ubuntu_workspace_googleMaps_offline_navigator_node_modules_body_parser_lib_types_text_js",
    "groupTitle": "_home_ubuntu_workspace_googleMaps_offline_navigator_node_modules_body_parser_lib_types_text_js",
    "name": "Private"
  },
  {
    "type": "",
    "url": "public",
    "title": "",
    "version": "0.0.0",
    "filename": "./node_modules/body-parser/lib/types/text.js",
    "group": "_home_ubuntu_workspace_googleMaps_offline_navigator_node_modules_body_parser_lib_types_text_js",
    "groupTitle": "_home_ubuntu_workspace_googleMaps_offline_navigator_node_modules_body_parser_lib_types_text_js",
    "name": "Public"
  },
  {
    "type": "",
    "url": "private",
    "title": "",
    "version": "0.0.0",
    "filename": "./node_modules/body-parser/lib/types/urlencoded.js",
    "group": "_home_ubuntu_workspace_googleMaps_offline_navigator_node_modules_body_parser_lib_types_urlencoded_js",
    "groupTitle": "_home_ubuntu_workspace_googleMaps_offline_navigator_node_modules_body_parser_lib_types_urlencoded_js",
    "name": "Private"
  },
  {
    "type": "",
    "url": "private",
    "title": "",
    "version": "0.0.0",
    "filename": "./node_modules/body-parser/lib/types/urlencoded.js",
    "group": "_home_ubuntu_workspace_googleMaps_offline_navigator_node_modules_body_parser_lib_types_urlencoded_js",
    "groupTitle": "_home_ubuntu_workspace_googleMaps_offline_navigator_node_modules_body_parser_lib_types_urlencoded_js",
    "name": "Private"
  },
  {
    "type": "",
    "url": "private",
    "title": "",
    "version": "0.0.0",
    "filename": "./node_modules/body-parser/lib/types/urlencoded.js",
    "group": "_home_ubuntu_workspace_googleMaps_offline_navigator_node_modules_body_parser_lib_types_urlencoded_js",
    "groupTitle": "_home_ubuntu_workspace_googleMaps_offline_navigator_node_modules_body_parser_lib_types_urlencoded_js",
    "name": "Private"
  },
  {
    "type": "",
    "url": "private",
    "title": "",
    "version": "0.0.0",
    "filename": "./node_modules/content-disposition/index.js",
    "group": "_home_ubuntu_workspace_googleMaps_offline_navigator_node_modules_content_disposition_index_js",
    "groupTitle": "_home_ubuntu_workspace_googleMaps_offline_navigator_node_modules_content_disposition_index_js",
    "name": "Private"
  },
  {
    "type": "",
    "url": "private",
    "title": "",
    "version": "0.0.0",
    "filename": "./node_modules/content-disposition/index.js",
    "group": "_home_ubuntu_workspace_googleMaps_offline_navigator_node_modules_content_disposition_index_js",
    "groupTitle": "_home_ubuntu_workspace_googleMaps_offline_navigator_node_modules_content_disposition_index_js",
    "name": "Private"
  },
  {
    "type": "",
    "url": "private",
    "title": "",
    "version": "0.0.0",
    "filename": "./node_modules/content-disposition/index.js",
    "group": "_home_ubuntu_workspace_googleMaps_offline_navigator_node_modules_content_disposition_index_js",
    "groupTitle": "_home_ubuntu_workspace_googleMaps_offline_navigator_node_modules_content_disposition_index_js",
    "name": "Private"
  },
  {
    "type": "",
    "url": "private",
    "title": "",
    "version": "0.0.0",
    "filename": "./node_modules/content-disposition/index.js",
    "group": "_home_ubuntu_workspace_googleMaps_offline_navigator_node_modules_content_disposition_index_js",
    "groupTitle": "_home_ubuntu_workspace_googleMaps_offline_navigator_node_modules_content_disposition_index_js",
    "name": "Private"
  },
  {
    "type": "",
    "url": "private",
    "title": "",
    "version": "0.0.0",
    "filename": "./node_modules/content-disposition/index.js",
    "group": "_home_ubuntu_workspace_googleMaps_offline_navigator_node_modules_content_disposition_index_js",
    "groupTitle": "_home_ubuntu_workspace_googleMaps_offline_navigator_node_modules_content_disposition_index_js",
    "name": "Private"
  },
  {
    "type": "",
    "url": "private",
    "title": "",
    "version": "0.0.0",
    "filename": "./node_modules/content-disposition/index.js",
    "group": "_home_ubuntu_workspace_googleMaps_offline_navigator_node_modules_content_disposition_index_js",
    "groupTitle": "_home_ubuntu_workspace_googleMaps_offline_navigator_node_modules_content_disposition_index_js",
    "name": "Private"
  },
  {
    "type": "",
    "url": "private",
    "title": "",
    "version": "0.0.0",
    "filename": "./node_modules/content-disposition/index.js",
    "group": "_home_ubuntu_workspace_googleMaps_offline_navigator_node_modules_content_disposition_index_js",
    "groupTitle": "_home_ubuntu_workspace_googleMaps_offline_navigator_node_modules_content_disposition_index_js",
    "name": "Private"
  },
  {
    "type": "",
    "url": "private",
    "title": "",
    "version": "0.0.0",
    "filename": "./node_modules/content-disposition/index.js",
    "group": "_home_ubuntu_workspace_googleMaps_offline_navigator_node_modules_content_disposition_index_js",
    "groupTitle": "_home_ubuntu_workspace_googleMaps_offline_navigator_node_modules_content_disposition_index_js",
    "name": "Private"
  },
  {
    "type": "",
    "url": "private",
    "title": "",
    "version": "0.0.0",
    "filename": "./node_modules/content-disposition/index.js",
    "group": "_home_ubuntu_workspace_googleMaps_offline_navigator_node_modules_content_disposition_index_js",
    "groupTitle": "_home_ubuntu_workspace_googleMaps_offline_navigator_node_modules_content_disposition_index_js",
    "name": "Private"
  },
  {
    "type": "",
    "url": "public",
    "title": "",
    "version": "0.0.0",
    "filename": "./node_modules/content-disposition/index.js",
    "group": "_home_ubuntu_workspace_googleMaps_offline_navigator_node_modules_content_disposition_index_js",
    "groupTitle": "_home_ubuntu_workspace_googleMaps_offline_navigator_node_modules_content_disposition_index_js",
    "name": "Public"
  },
  {
    "type": "",
    "url": "private",
    "title": "",
    "version": "0.0.0",
    "filename": "./node_modules/cookie-signature/index.js",
    "group": "_home_ubuntu_workspace_googleMaps_offline_navigator_node_modules_cookie_signature_index_js",
    "groupTitle": "_home_ubuntu_workspace_googleMaps_offline_navigator_node_modules_cookie_signature_index_js",
    "name": "Private"
  },
  {
    "type": "",
    "url": "private",
    "title": "",
    "version": "0.0.0",
    "filename": "./node_modules/cookie-signature/index.js",
    "group": "_home_ubuntu_workspace_googleMaps_offline_navigator_node_modules_cookie_signature_index_js",
    "groupTitle": "_home_ubuntu_workspace_googleMaps_offline_navigator_node_modules_cookie_signature_index_js",
    "name": "Private"
  },
  {
    "type": "",
    "url": "private",
    "title": "",
    "version": "0.0.0",
    "filename": "./node_modules/debug/src/browser.js",
    "group": "_home_ubuntu_workspace_googleMaps_offline_navigator_node_modules_debug_src_browser_js",
    "groupTitle": "_home_ubuntu_workspace_googleMaps_offline_navigator_node_modules_debug_src_browser_js",
    "name": "Private"
  },
  {
    "type": "",
    "url": "private",
    "title": "",
    "version": "0.0.0",
    "filename": "./node_modules/debug/src/browser.js",
    "group": "_home_ubuntu_workspace_googleMaps_offline_navigator_node_modules_debug_src_browser_js",
    "groupTitle": "_home_ubuntu_workspace_googleMaps_offline_navigator_node_modules_debug_src_browser_js",
    "name": "Private"
  },
  {
    "type": "",
    "url": "private",
    "title": "",
    "version": "0.0.0",
    "filename": "./node_modules/debug/src/browser.js",
    "group": "_home_ubuntu_workspace_googleMaps_offline_navigator_node_modules_debug_src_browser_js",
    "groupTitle": "_home_ubuntu_workspace_googleMaps_offline_navigator_node_modules_debug_src_browser_js",
    "name": "Private"
  },
  {
    "type": "",
    "url": "public",
    "title": "",
    "version": "0.0.0",
    "filename": "./node_modules/debug/src/browser.js",
    "group": "_home_ubuntu_workspace_googleMaps_offline_navigator_node_modules_debug_src_browser_js",
    "groupTitle": "_home_ubuntu_workspace_googleMaps_offline_navigator_node_modules_debug_src_browser_js",
    "name": "Public"
  },
  {
    "type": "",
    "url": "public",
    "title": "",
    "version": "0.0.0",
    "filename": "./node_modules/debug/src/browser.js",
    "group": "_home_ubuntu_workspace_googleMaps_offline_navigator_node_modules_debug_src_browser_js",
    "groupTitle": "_home_ubuntu_workspace_googleMaps_offline_navigator_node_modules_debug_src_browser_js",
    "name": "Public"
  },
  {
    "type": "",
    "url": "private",
    "title": "",
    "version": "0.0.0",
    "filename": "./node_modules/debug/src/debug.js",
    "group": "_home_ubuntu_workspace_googleMaps_offline_navigator_node_modules_debug_src_debug_js",
    "groupTitle": "_home_ubuntu_workspace_googleMaps_offline_navigator_node_modules_debug_src_debug_js",
    "name": "Private"
  },
  {
    "type": "",
    "url": "private",
    "title": "",
    "version": "0.0.0",
    "filename": "./node_modules/debug/src/debug.js",
    "group": "_home_ubuntu_workspace_googleMaps_offline_navigator_node_modules_debug_src_debug_js",
    "groupTitle": "_home_ubuntu_workspace_googleMaps_offline_navigator_node_modules_debug_src_debug_js",
    "name": "Private"
  },
  {
    "type": "",
    "url": "public",
    "title": "",
    "version": "0.0.0",
    "filename": "./node_modules/debug/src/debug.js",
    "group": "_home_ubuntu_workspace_googleMaps_offline_navigator_node_modules_debug_src_debug_js",
    "groupTitle": "_home_ubuntu_workspace_googleMaps_offline_navigator_node_modules_debug_src_debug_js",
    "name": "Public"
  },
  {
    "type": "",
    "url": "public",
    "title": "",
    "version": "0.0.0",
    "filename": "./node_modules/debug/src/debug.js",
    "group": "_home_ubuntu_workspace_googleMaps_offline_navigator_node_modules_debug_src_debug_js",
    "groupTitle": "_home_ubuntu_workspace_googleMaps_offline_navigator_node_modules_debug_src_debug_js",
    "name": "Public"
  },
  {
    "type": "",
    "url": "public",
    "title": "",
    "version": "0.0.0",
    "filename": "./node_modules/debug/src/debug.js",
    "group": "_home_ubuntu_workspace_googleMaps_offline_navigator_node_modules_debug_src_debug_js",
    "groupTitle": "_home_ubuntu_workspace_googleMaps_offline_navigator_node_modules_debug_src_debug_js",
    "name": "Public"
  },
  {
    "type": "",
    "url": "public",
    "title": "",
    "version": "0.0.0",
    "filename": "./node_modules/debug/src/debug.js",
    "group": "_home_ubuntu_workspace_googleMaps_offline_navigator_node_modules_debug_src_debug_js",
    "groupTitle": "_home_ubuntu_workspace_googleMaps_offline_navigator_node_modules_debug_src_debug_js",
    "name": "Public"
  },
  {
    "type": "",
    "url": "private",
    "title": "",
    "version": "0.0.0",
    "filename": "./node_modules/debug/src/node.js",
    "group": "_home_ubuntu_workspace_googleMaps_offline_navigator_node_modules_debug_src_node_js",
    "groupTitle": "_home_ubuntu_workspace_googleMaps_offline_navigator_node_modules_debug_src_node_js",
    "name": "Private"
  },
  {
    "type": "",
    "url": "private",
    "title": "",
    "version": "0.0.0",
    "filename": "./node_modules/debug/src/node.js",
    "group": "_home_ubuntu_workspace_googleMaps_offline_navigator_node_modules_debug_src_node_js",
    "groupTitle": "_home_ubuntu_workspace_googleMaps_offline_navigator_node_modules_debug_src_node_js",
    "name": "Private"
  },
  {
    "type": "",
    "url": "public",
    "title": "",
    "version": "0.0.0",
    "filename": "./node_modules/debug/src/node.js",
    "group": "_home_ubuntu_workspace_googleMaps_offline_navigator_node_modules_debug_src_node_js",
    "groupTitle": "_home_ubuntu_workspace_googleMaps_offline_navigator_node_modules_debug_src_node_js",
    "name": "Public"
  },
  {
    "type": "",
    "url": "private",
    "title": "",
    "version": "0.0.0",
    "filename": "./node_modules/etag/index.js",
    "group": "_home_ubuntu_workspace_googleMaps_offline_navigator_node_modules_etag_index_js",
    "groupTitle": "_home_ubuntu_workspace_googleMaps_offline_navigator_node_modules_etag_index_js",
    "name": "Private"
  },
  {
    "type": "",
    "url": "public",
    "title": "",
    "version": "0.0.0",
    "filename": "./node_modules/express/lib/express.js",
    "group": "_home_ubuntu_workspace_googleMaps_offline_navigator_node_modules_express_lib_express_js",
    "groupTitle": "_home_ubuntu_workspace_googleMaps_offline_navigator_node_modules_express_lib_express_js",
    "name": "Public"
  },
  {
    "type": "",
    "url": "private",
    "title": "",
    "version": "0.0.0",
    "filename": "./node_modules/express/lib/middleware/init.js",
    "group": "_home_ubuntu_workspace_googleMaps_offline_navigator_node_modules_express_lib_middleware_init_js",
    "groupTitle": "_home_ubuntu_workspace_googleMaps_offline_navigator_node_modules_express_lib_middleware_init_js",
    "name": "Private"
  },
  {
    "type": "",
    "url": "public",
    "title": "",
    "version": "0.0.0",
    "filename": "./node_modules/express/lib/middleware/query.js",
    "group": "_home_ubuntu_workspace_googleMaps_offline_navigator_node_modules_express_lib_middleware_query_js",
    "groupTitle": "_home_ubuntu_workspace_googleMaps_offline_navigator_node_modules_express_lib_middleware_query_js",
    "name": "Public"
  },
  {
    "type": "",
    "url": "private",
    "title": "",
    "version": "0.0.0",
    "filename": "./node_modules/express/lib/router/layer.js",
    "group": "_home_ubuntu_workspace_googleMaps_offline_navigator_node_modules_express_lib_router_layer_js",
    "groupTitle": "_home_ubuntu_workspace_googleMaps_offline_navigator_node_modules_express_lib_router_layer_js",
    "name": "Private"
  },
  {
    "type": "",
    "url": "private",
    "title": "",
    "version": "0.0.0",
    "filename": "./node_modules/express/lib/router/layer.js",
    "group": "_home_ubuntu_workspace_googleMaps_offline_navigator_node_modules_express_lib_router_layer_js",
    "groupTitle": "_home_ubuntu_workspace_googleMaps_offline_navigator_node_modules_express_lib_router_layer_js",
    "name": "Private"
  },
  {
    "type": "",
    "url": "private",
    "title": "",
    "version": "0.0.0",
    "filename": "./node_modules/express/lib/router/layer.js",
    "group": "_home_ubuntu_workspace_googleMaps_offline_navigator_node_modules_express_lib_router_layer_js",
    "groupTitle": "_home_ubuntu_workspace_googleMaps_offline_navigator_node_modules_express_lib_router_layer_js",
    "name": "Private"
  },
  {
    "type": "",
    "url": "public",
    "title": "",
    "version": "0.0.0",
    "filename": "./node_modules/express/lib/router/route.js",
    "group": "_home_ubuntu_workspace_googleMaps_offline_navigator_node_modules_express_lib_router_route_js",
    "groupTitle": "_home_ubuntu_workspace_googleMaps_offline_navigator_node_modules_express_lib_router_route_js",
    "name": "Public"
  },
  {
    "type": "",
    "url": "private",
    "title": "",
    "version": "0.0.0",
    "filename": "./node_modules/express/lib/utils.js",
    "group": "_home_ubuntu_workspace_googleMaps_offline_navigator_node_modules_express_lib_utils_js",
    "groupTitle": "_home_ubuntu_workspace_googleMaps_offline_navigator_node_modules_express_lib_utils_js",
    "name": "Private"
  },
  {
    "type": "",
    "url": "private",
    "title": "",
    "version": "0.0.0",
    "filename": "./node_modules/express/lib/utils.js",
    "group": "_home_ubuntu_workspace_googleMaps_offline_navigator_node_modules_express_lib_utils_js",
    "groupTitle": "_home_ubuntu_workspace_googleMaps_offline_navigator_node_modules_express_lib_utils_js",
    "name": "Private"
  },
  {
    "type": "",
    "url": "private",
    "title": "",
    "version": "0.0.0",
    "filename": "./node_modules/express/lib/utils.js",
    "group": "_home_ubuntu_workspace_googleMaps_offline_navigator_node_modules_express_lib_utils_js",
    "groupTitle": "_home_ubuntu_workspace_googleMaps_offline_navigator_node_modules_express_lib_utils_js",
    "name": "Private"
  },
  {
    "type": "",
    "url": "private",
    "title": "",
    "version": "0.0.0",
    "filename": "./node_modules/express/lib/utils.js",
    "group": "_home_ubuntu_workspace_googleMaps_offline_navigator_node_modules_express_lib_utils_js",
    "groupTitle": "_home_ubuntu_workspace_googleMaps_offline_navigator_node_modules_express_lib_utils_js",
    "name": "Private"
  },
  {
    "type": "",
    "url": "private",
    "title": "",
    "version": "0.0.0",
    "filename": "./node_modules/express/lib/utils.js",
    "group": "_home_ubuntu_workspace_googleMaps_offline_navigator_node_modules_express_lib_utils_js",
    "groupTitle": "_home_ubuntu_workspace_googleMaps_offline_navigator_node_modules_express_lib_utils_js",
    "name": "Private"
  },
  {
    "type": "",
    "url": "private",
    "title": "",
    "version": "0.0.0",
    "filename": "./node_modules/express/lib/utils.js",
    "group": "_home_ubuntu_workspace_googleMaps_offline_navigator_node_modules_express_lib_utils_js",
    "groupTitle": "_home_ubuntu_workspace_googleMaps_offline_navigator_node_modules_express_lib_utils_js",
    "name": "Private"
  },
  {
    "type": "",
    "url": "private",
    "title": "",
    "version": "0.0.0",
    "filename": "./node_modules/express/lib/utils.js",
    "group": "_home_ubuntu_workspace_googleMaps_offline_navigator_node_modules_express_lib_utils_js",
    "groupTitle": "_home_ubuntu_workspace_googleMaps_offline_navigator_node_modules_express_lib_utils_js",
    "name": "Private"
  },
  {
    "type": "",
    "url": "private",
    "title": "",
    "version": "0.0.0",
    "filename": "./node_modules/express/lib/utils.js",
    "group": "_home_ubuntu_workspace_googleMaps_offline_navigator_node_modules_express_lib_utils_js",
    "groupTitle": "_home_ubuntu_workspace_googleMaps_offline_navigator_node_modules_express_lib_utils_js",
    "name": "Private"
  },
  {
    "type": "",
    "url": "private",
    "title": "",
    "version": "0.0.0",
    "filename": "./node_modules/express/lib/utils.js",
    "group": "_home_ubuntu_workspace_googleMaps_offline_navigator_node_modules_express_lib_utils_js",
    "groupTitle": "_home_ubuntu_workspace_googleMaps_offline_navigator_node_modules_express_lib_utils_js",
    "name": "Private"
  },
  {
    "type": "",
    "url": "private",
    "title": "",
    "version": "0.0.0",
    "filename": "./node_modules/express/lib/utils.js",
    "group": "_home_ubuntu_workspace_googleMaps_offline_navigator_node_modules_express_lib_utils_js",
    "groupTitle": "_home_ubuntu_workspace_googleMaps_offline_navigator_node_modules_express_lib_utils_js",
    "name": "Private"
  },
  {
    "type": "",
    "url": "private",
    "title": "",
    "version": "0.0.0",
    "filename": "./node_modules/express/lib/utils.js",
    "group": "_home_ubuntu_workspace_googleMaps_offline_navigator_node_modules_express_lib_utils_js",
    "groupTitle": "_home_ubuntu_workspace_googleMaps_offline_navigator_node_modules_express_lib_utils_js",
    "name": "Private"
  },
  {
    "type": "",
    "url": "private",
    "title": "",
    "version": "0.0.0",
    "filename": "./node_modules/express/lib/utils.js",
    "group": "_home_ubuntu_workspace_googleMaps_offline_navigator_node_modules_express_lib_utils_js",
    "groupTitle": "_home_ubuntu_workspace_googleMaps_offline_navigator_node_modules_express_lib_utils_js",
    "name": "Private"
  },
  {
    "type": "",
    "url": "private",
    "title": "",
    "version": "0.0.0",
    "filename": "./node_modules/express/lib/utils.js",
    "group": "_home_ubuntu_workspace_googleMaps_offline_navigator_node_modules_express_lib_utils_js",
    "groupTitle": "_home_ubuntu_workspace_googleMaps_offline_navigator_node_modules_express_lib_utils_js",
    "name": "Private"
  },
  {
    "type": "",
    "url": "private",
    "title": "",
    "version": "0.0.0",
    "filename": "./node_modules/express/lib/utils.js",
    "group": "_home_ubuntu_workspace_googleMaps_offline_navigator_node_modules_express_lib_utils_js",
    "groupTitle": "_home_ubuntu_workspace_googleMaps_offline_navigator_node_modules_express_lib_utils_js",
    "name": "Private"
  },
  {
    "type": "",
    "url": "private",
    "title": "",
    "version": "0.0.0",
    "filename": "./node_modules/media-typer/index.js",
    "group": "_home_ubuntu_workspace_googleMaps_offline_navigator_node_modules_media_typer_index_js",
    "groupTitle": "_home_ubuntu_workspace_googleMaps_offline_navigator_node_modules_media_typer_index_js",
    "name": "Private"
  },
  {
    "type": "",
    "url": "private",
    "title": "",
    "version": "0.0.0",
    "filename": "./node_modules/media-typer/index.js",
    "group": "_home_ubuntu_workspace_googleMaps_offline_navigator_node_modules_media_typer_index_js",
    "groupTitle": "_home_ubuntu_workspace_googleMaps_offline_navigator_node_modules_media_typer_index_js",
    "name": "Private"
  },
  {
    "type": "",
    "url": "private",
    "title": "",
    "version": "0.0.0",
    "filename": "./node_modules/media-typer/index.js",
    "group": "_home_ubuntu_workspace_googleMaps_offline_navigator_node_modules_media_typer_index_js",
    "groupTitle": "_home_ubuntu_workspace_googleMaps_offline_navigator_node_modules_media_typer_index_js",
    "name": "Private"
  },
  {
    "type": "",
    "url": "public",
    "title": "",
    "version": "0.0.0",
    "filename": "./node_modules/media-typer/index.js",
    "group": "_home_ubuntu_workspace_googleMaps_offline_navigator_node_modules_media_typer_index_js",
    "groupTitle": "_home_ubuntu_workspace_googleMaps_offline_navigator_node_modules_media_typer_index_js",
    "name": "Public"
  },
  {
    "type": "",
    "url": "public",
    "title": "",
    "version": "0.0.0",
    "filename": "./node_modules/media-typer/index.js",
    "group": "_home_ubuntu_workspace_googleMaps_offline_navigator_node_modules_media_typer_index_js",
    "groupTitle": "_home_ubuntu_workspace_googleMaps_offline_navigator_node_modules_media_typer_index_js",
    "name": "Public"
  },
  {
    "type": "",
    "url": "private",
    "title": "",
    "version": "0.0.0",
    "filename": "./node_modules/ms/index.js",
    "group": "_home_ubuntu_workspace_googleMaps_offline_navigator_node_modules_ms_index_js",
    "groupTitle": "_home_ubuntu_workspace_googleMaps_offline_navigator_node_modules_ms_index_js",
    "name": "Private"
  },
  {
    "type": "",
    "url": "private",
    "title": "",
    "version": "0.0.0",
    "filename": "./node_modules/ms/index.js",
    "group": "_home_ubuntu_workspace_googleMaps_offline_navigator_node_modules_ms_index_js",
    "groupTitle": "_home_ubuntu_workspace_googleMaps_offline_navigator_node_modules_ms_index_js",
    "name": "Private"
  },
  {
    "type": "",
    "url": "private",
    "title": "",
    "version": "0.0.0",
    "filename": "./node_modules/ms/index.js",
    "group": "_home_ubuntu_workspace_googleMaps_offline_navigator_node_modules_ms_index_js",
    "groupTitle": "_home_ubuntu_workspace_googleMaps_offline_navigator_node_modules_ms_index_js",
    "name": "Private"
  },
  {
    "type": "",
    "url": "public",
    "title": "",
    "version": "0.0.0",
    "filename": "./node_modules/ms/index.js",
    "group": "_home_ubuntu_workspace_googleMaps_offline_navigator_node_modules_ms_index_js",
    "groupTitle": "_home_ubuntu_workspace_googleMaps_offline_navigator_node_modules_ms_index_js",
    "name": "Public"
  },
  {
    "type": "",
    "url": "private",
    "title": "",
    "version": "0.0.0",
    "filename": "./node_modules/path-to-regexp/index.js",
    "group": "_home_ubuntu_workspace_googleMaps_offline_navigator_node_modules_path_to_regexp_index_js",
    "groupTitle": "_home_ubuntu_workspace_googleMaps_offline_navigator_node_modules_path_to_regexp_index_js",
    "name": "Private"
  },
  {
    "type": "",
    "url": "private",
    "title": "",
    "version": "0.0.0",
    "filename": "./node_modules/send/index.js",
    "group": "_home_ubuntu_workspace_googleMaps_offline_navigator_node_modules_send_index_js",
    "groupTitle": "_home_ubuntu_workspace_googleMaps_offline_navigator_node_modules_send_index_js",
    "name": "Private"
  },
  {
    "type": "",
    "url": "private",
    "title": "",
    "version": "0.0.0",
    "filename": "./node_modules/send/index.js",
    "group": "_home_ubuntu_workspace_googleMaps_offline_navigator_node_modules_send_index_js",
    "groupTitle": "_home_ubuntu_workspace_googleMaps_offline_navigator_node_modules_send_index_js",
    "name": "Private"
  },
  {
    "type": "",
    "url": "private",
    "title": "",
    "version": "0.0.0",
    "filename": "./node_modules/send/index.js",
    "group": "_home_ubuntu_workspace_googleMaps_offline_navigator_node_modules_send_index_js",
    "groupTitle": "_home_ubuntu_workspace_googleMaps_offline_navigator_node_modules_send_index_js",
    "name": "Private"
  },
  {
    "type": "",
    "url": "private",
    "title": "",
    "version": "0.0.0",
    "filename": "./node_modules/send/index.js",
    "group": "_home_ubuntu_workspace_googleMaps_offline_navigator_node_modules_send_index_js",
    "groupTitle": "_home_ubuntu_workspace_googleMaps_offline_navigator_node_modules_send_index_js",
    "name": "Private"
  },
  {
    "type": "",
    "url": "private",
    "title": "",
    "version": "0.0.0",
    "filename": "./node_modules/send/index.js",
    "group": "_home_ubuntu_workspace_googleMaps_offline_navigator_node_modules_send_index_js",
    "groupTitle": "_home_ubuntu_workspace_googleMaps_offline_navigator_node_modules_send_index_js",
    "name": "Private"
  },
  {
    "type": "",
    "url": "private",
    "title": "",
    "version": "0.0.0",
    "filename": "./node_modules/send/index.js",
    "group": "_home_ubuntu_workspace_googleMaps_offline_navigator_node_modules_send_index_js",
    "groupTitle": "_home_ubuntu_workspace_googleMaps_offline_navigator_node_modules_send_index_js",
    "name": "Private"
  },
  {
    "type": "",
    "url": "private",
    "title": "",
    "version": "0.0.0",
    "filename": "./node_modules/send/index.js",
    "group": "_home_ubuntu_workspace_googleMaps_offline_navigator_node_modules_send_index_js",
    "groupTitle": "_home_ubuntu_workspace_googleMaps_offline_navigator_node_modules_send_index_js",
    "name": "Private"
  },
  {
    "type": "",
    "url": "private",
    "title": "",
    "version": "0.0.0",
    "filename": "./node_modules/send/index.js",
    "group": "_home_ubuntu_workspace_googleMaps_offline_navigator_node_modules_send_index_js",
    "groupTitle": "_home_ubuntu_workspace_googleMaps_offline_navigator_node_modules_send_index_js",
    "name": "Private"
  },
  {
    "type": "",
    "url": "private",
    "title": "",
    "version": "0.0.0",
    "filename": "./node_modules/send/index.js",
    "group": "_home_ubuntu_workspace_googleMaps_offline_navigator_node_modules_send_index_js",
    "groupTitle": "_home_ubuntu_workspace_googleMaps_offline_navigator_node_modules_send_index_js",
    "name": "Private"
  },
  {
    "type": "",
    "url": "private",
    "title": "",
    "version": "0.0.0",
    "filename": "./node_modules/send/index.js",
    "group": "_home_ubuntu_workspace_googleMaps_offline_navigator_node_modules_send_index_js",
    "groupTitle": "_home_ubuntu_workspace_googleMaps_offline_navigator_node_modules_send_index_js",
    "name": "Private"
  },
  {
    "type": "",
    "url": "private",
    "title": "",
    "version": "0.0.0",
    "filename": "./node_modules/send/index.js",
    "group": "_home_ubuntu_workspace_googleMaps_offline_navigator_node_modules_send_index_js",
    "groupTitle": "_home_ubuntu_workspace_googleMaps_offline_navigator_node_modules_send_index_js",
    "name": "Private"
  },
  {
    "type": "",
    "url": "private",
    "title": "",
    "version": "0.0.0",
    "filename": "./node_modules/send/index.js",
    "group": "_home_ubuntu_workspace_googleMaps_offline_navigator_node_modules_send_index_js",
    "groupTitle": "_home_ubuntu_workspace_googleMaps_offline_navigator_node_modules_send_index_js",
    "name": "Private"
  },
  {
    "type": "",
    "url": "private",
    "title": "",
    "version": "0.0.0",
    "filename": "./node_modules/send/index.js",
    "group": "_home_ubuntu_workspace_googleMaps_offline_navigator_node_modules_send_index_js",
    "groupTitle": "_home_ubuntu_workspace_googleMaps_offline_navigator_node_modules_send_index_js",
    "name": "Private"
  },
  {
    "type": "",
    "url": "public",
    "title": "",
    "version": "0.0.0",
    "filename": "./node_modules/send/index.js",
    "group": "_home_ubuntu_workspace_googleMaps_offline_navigator_node_modules_send_index_js",
    "groupTitle": "_home_ubuntu_workspace_googleMaps_offline_navigator_node_modules_send_index_js",
    "name": "Public"
  },
  {
    "type": "",
    "url": "public",
    "title": "",
    "version": "0.0.0",
    "filename": "./node_modules/send/index.js",
    "group": "_home_ubuntu_workspace_googleMaps_offline_navigator_node_modules_send_index_js",
    "groupTitle": "_home_ubuntu_workspace_googleMaps_offline_navigator_node_modules_send_index_js",
    "name": "Public"
  },
  {
    "type": "",
    "url": "public",
    "title": "",
    "version": "0.0.0",
    "filename": "./node_modules/send/index.js",
    "group": "_home_ubuntu_workspace_googleMaps_offline_navigator_node_modules_send_index_js",
    "groupTitle": "_home_ubuntu_workspace_googleMaps_offline_navigator_node_modules_send_index_js",
    "name": "Public"
  },
  {
    "type": "",
    "url": "public",
    "title": "",
    "version": "0.0.0",
    "filename": "./node_modules/send/index.js",
    "group": "_home_ubuntu_workspace_googleMaps_offline_navigator_node_modules_send_index_js",
    "groupTitle": "_home_ubuntu_workspace_googleMaps_offline_navigator_node_modules_send_index_js",
    "name": "Public"
  },
  {
    "type": "",
    "url": "public",
    "title": "",
    "version": "0.0.0",
    "filename": "./node_modules/send/index.js",
    "group": "_home_ubuntu_workspace_googleMaps_offline_navigator_node_modules_send_index_js",
    "groupTitle": "_home_ubuntu_workspace_googleMaps_offline_navigator_node_modules_send_index_js",
    "name": "Public"
  },
  {
    "type": "",
    "url": "public",
    "title": "",
    "version": "0.0.0",
    "filename": "./node_modules/send/index.js",
    "group": "_home_ubuntu_workspace_googleMaps_offline_navigator_node_modules_send_index_js",
    "groupTitle": "_home_ubuntu_workspace_googleMaps_offline_navigator_node_modules_send_index_js",
    "name": "Public"
  },
  {
    "type": "",
    "url": "public",
    "title": "",
    "version": "0.0.0",
    "filename": "./node_modules/send/index.js",
    "group": "_home_ubuntu_workspace_googleMaps_offline_navigator_node_modules_send_index_js",
    "groupTitle": "_home_ubuntu_workspace_googleMaps_offline_navigator_node_modules_send_index_js",
    "name": "Public"
  },
  {
    "type": "",
    "url": "public",
    "title": "",
    "version": "0.0.0",
    "filename": "./node_modules/utils-merge/index.js",
    "group": "_home_ubuntu_workspace_googleMaps_offline_navigator_node_modules_utils_merge_index_js",
    "groupTitle": "_home_ubuntu_workspace_googleMaps_offline_navigator_node_modules_utils_merge_index_js",
    "name": "Public"
  }
] });
