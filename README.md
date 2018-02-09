# Getting Started
See the Guide on how to contribute [here](https://github.com/TheDevPath/googleMaps-offline-navigator/blob/development/CONTRIBUTING.md#how-to-contribute) for instructions on how to fork and set up your repository.

# Installing Dependencies
In the root directory of your newly cloned project `npm install`


Skip this next part if you know what you are doing

---

Noob tip 

*If you can, "clone with `SSH` instead of clone with `HTTPS`. This means that, when you type in git remote add origin, you should use a link that looks like this: `git@github.com:*YOUR_USER_NAME/YOUR_REPO_NAME.git.*` Observe how that differs from* `https://github.com/YOUR_USER_NAME/YOUR_REPO_NAME.git`* 
While the first creates a remote that uses `ssh` authentication, the latter uses `https`, so it'll always prompt you to enter your username and password to authenticate the connection. For more see this [link](https://gist.github.com/juemura/899241d73cf719de7f540fc68071bd7d)*

---

# Get Google Maps API key

- In the config subdirectory you will find secrets-*example.json*. Rename this to *secrets.json*. 

- Next go to the Google API Console to get a Google Maps API key

    - Create or select a project.

    - Click Continue to enable the Google Maps API.

    - On the Credentials page, get an API key. Note: If you have an existing API key, you may use that key.
[Detailed instructions](https://developers.google.com/maps/documentation/android-api/signup)

- Open `secrets.json` and under googlemaps, paste your API key and save

#Install mongodb

You also need to install and have running mongoDB - Directions can be found [here](https://docs.mongodb.com/manual/installation/)

# Update and run

When installation has completed go to where you installed the project and run `npm install` again to install client dependencies. This will update the file package.json in the root of your project. 

When finished, in the project's root directory type `npm run dev`. This will start the dev servers on `localhost:8080` & `localhost:8081` respectively



# About googleMaps-offline-navigator

This is an open source project for Grow with Google Udacity Scholarship Challenge - Navigation app using offline first strategy and google maps api

The idea for this project is to build a progressive web app utilizing the technologies learned in the Grow with Google Udacity Scholarship challenge.

The project idea - build a navigation app that will store a local copy of pre selected directions and maps so that navigation continues to work properly in poor to no signal scenarios.

The stack - this will be a node app utilizing Preact for the front end.

Pull requests are welcome!

## Table of Contents

- [Main Goal](#main-goal)
- [Features](#features)
- [About the application](#about-the-application)
- [Where to get the files](#where-to-get-the-files)
- [Key files included](#key-files-included)
- [Requirements](#requirements)
- [ToDo](#todo)


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
