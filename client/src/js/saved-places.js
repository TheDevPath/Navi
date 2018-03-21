import {h, Component} from "preact";
import {makeRequest} from "./server-requests-utils";


/* Set all settings for saved place icon
Waiting for new icon for favorites
Full list of options: http://leafletjs.com/reference-1.3.0.html#icon
 */

const FAV_MARKER_OPTIONS = {
  iconUrl: '../../assets/icons/leaflet/marker-icon-fav-2x.png',
  className: 'favorites',
  iconSize: [25, 41], //native aspect ratio: [28, 41]
};


/**
 * Exported Functions
 */

//Get and drop pins from any user on any map  (all arguments are optional)
const fetchAndDropUserPins = (user_id, mapObj, L) => {

  getSavedPins(user_id)
    .then(savedPins => {

      if (!savedPins) return;

      const pinMarkers = makePinMarkers(savedPins, L);
      if (mapObj != null) dropPin(pinMarkers, mapObj);

    })
}

const getSavedPins = (user_id) => {
  //GET 'search/savedpins/:user_id'

  return makeRequest('GET', 'savedPins', '', user_id) //pinsPromised
  .then(res => res.data.savedPins)
  .catch(err => {
    // console.log(`Couldn't get the user pins: ${err}`);
  });

}

//This function generates markers and drops them on a map (if specified)
const makePinMarkers = (pinArray = [], L, markerOptions=FAV_MARKER_OPTIONS) => {

  const icon =  L ? L.icon(FAV_MARKER_OPTIONS) : undefined;

  let pinMarkers = [];

  for (const pin of pinArray) {
    //create  marker for the pin and bind it ot the map

    let thisMarker = []; //the marker icon cannot be changed after the marker is created?

    if (icon) { //if (icon) thisMarker.icon = icon; doesn't work
      thisMarker =  L.marker([pin.lat, pin.lng], {
        icon,
        draggable: false,
        autopan: true,
        riseOnHover: true,
        title: pin.place_id,
        desc: pin.desc
      });

    } else {
      thisMarker =  L.marker([pin.lat, pin.lng], {
        draggable: false,
        autopan: true,
        riseOnHover: true,
        title: pin.place_id,
        desc: pin.desc
      });
    }

    const container = L.DomUtil.create('div');

    thisMarker.data = pin; //save the db data to the marker
    pinMarkers.push(thisMarker);
  }

  // console.log('User Pins added: ',pinMarkers)
  return pinMarkers;

}

//This funciton drops pins on a map replacing pins if they already exist
const dropPin = (pinMarkers=[], mapObj=undefined) => {

  //if no map is defined, or there are no pins return
   if ((mapObj == null) || (pinMarkers.length == 0)) return;

  /*TO DO?:
  Do not allow duplication of pins,
  Remove those that exist already on the old map
  Hint: use sets
  */


  for (let marker of pinMarkers){
    marker.addTo(mapObj);
    setPinPopup(marker);
  }
}

/* TO DO
    Create a custom container for each pin on click */
const setPinPopup = (marker) => {
  console.log(marker);
  const container = L.DomUtil.create('div');
  console.log(marker);
  const markerDescription = createLabel(marker.options.desc, 'center', container);
  const deleteBtn = createButton('Delete', 'center',container, marker.data._id);
  marker.bindPopup(container);


  L.DomEvent.on(deleteBtn, 'click', function() {
      makeRequest('DELETE', `/search/savedPins/${event.target.id}`, '', {
        //place_id: event.target.id //should be from state not dom
      }).then((response) => {

        //remove icon if removal from database was success
        marker.remove();

      }).catch((err) => {

        switch (err.response.status){
          case 400: //duplicate pin
            const origPin = err.response.data;
            alert('We had an issue deleting this pin.');
            /*TO DO:
            Convert popup alert to toast message
            */
            break;
          default:
          console.log(err); //error saving pin

        }

      })
    });
  }


function createButton(label, cssClass, container,id) {
  var btn = L.DomUtil.create('button', cssClass, container);
  btn.setAttribute('type', 'button');
  btn.setAttribute('id',id);
  btn.innerHTML = label;
  return btn;
}


function createLabel(label, cssClass, container) {
  var displayLabel = L.DomUtil.create('div',cssClass, container);
  displayLabel.innerHTML = label;
  return displayLabel;
}

//Export Statements
export {fetchAndDropUserPins, makePinMarkers, dropPin};
