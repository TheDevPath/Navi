# googleMaps-offline-navigator
Open source project for Grow with Google Udacity Scholarship Challenge - Navigation app using offline first strategy and google maps api

The idea for this project is to build a progressive web app utilizing the technologies learned in the Grow with Google Udacity Scholarship challenge.

The project idea - build a navigation app that will store a local copy of pre selected directions and maps so that navigation continues to work properly in poor to no signal scenarios.

The stack - this will be a node app utilizing Preact for the front end.

Pull requests are welcome!

## Main Goal

The main goal of the app is to provide the user with a map interface that they can use on their mobile device and that will continue to be useful in poor to no signal environments.

## Features

* The interface will **display a map** of a designated area


* **Users** will be able to:  
    * Search for a location
        * By typing into a search field
    * Drop a pin at a location
        * By placing a pin on the map
        * By clicking 'drop pin' next to search results
    * Get directions to a selected location from:
        * Their current location
        * Another dropped pin
    * Save a dropped pin
    * Save a set of directions
    * View list of dropped pins ('saved places')
    * View list of directions ('saved directions')


* **The app** will:
    * Use the Google Maps API to:
        * Display the map
        * Provide a search interface
        * Provide a current location
        * Provide directions
    * Interface with a database to save a users:
        * Saved places
        * Saved directions
    * Maintain last state on loss of signal including:
        * Current map View
        * Saved places
        * Saved directions


### *About the application*
* Node backend
* React Frontend
* Google Maps api
* Service Workers
* [MIT License](../blob/master/LICENSE)

### *Where to get the files*
* [This repository](https://github.com/TheDevPath/googleMaps-offline-navigator)

### *Key files included*
* Files

## *Requirements*
* Requirements

## *ToDo*
* Improvements
