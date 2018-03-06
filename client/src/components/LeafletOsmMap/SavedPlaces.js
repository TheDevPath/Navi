import {h, Component} from "preact";
import {makeRequest} from "../../js/server-requests-utils";

/**
 * Leaflet related imports: leaflet, pouchdb module, and routing machine module
 */
import '../../../node_modules/leaflet/dist/leaflet.css';
import '../../../node_modules/leaflet-routing-machine/dist/leaflet-routing-machine.css';
import L from '../../js/leaflet-tileLayer-pouchdb-cached';

/* Set all settings for saved place icon
Waiting for new icon for favorites
Full list of options: http://leafletjs.com/reference-1.3.0.html#icon
 */
const FAV_MARKER_ICON = L.icon({
  iconUrl: '../../assets/icons/leaflet/marker-icon-fav-2x.png',
  className: 'favorites',
  iconSize: [25, 41],
});
const CURRENT_USER = makeRequest('GET', 'user');
 


export default class SavedPlaces extends Component {
  constructor(props) {
    super(props)
    const {user, map} = props;
    fetchAndDropUserPins(user, map);
  }

  render() {
    //This shouldn't render much (if anything)
    return ( null  );
  }

}
 

/**
 * Exported Functions
 */

//Get and drop pins from any user on any map
const fetchAndDropUserPins =  (userPromised=CURRENT_USER, mapObj=undefined) => {

  console.log(userPromised);
  userPromised
  .then(res => res.data._id) //get user ID
  .then(user_id => getSavedPins(user_id))
  .then(savedPins => {

    let pinMarkers = makePinMarkers(savedPins);
    if (mapObj != null) dropPin(pinMarkers, mapObj);

  })
  .catch(err => {
    //User not signed in, no saved places to load
    console.log(`Error. abort load saved places: ${err}`);
  });
  
}

const getSavedPins = (user_id='') => {
  //GET 'search/savedpins/:user_id'
  let pinsPromised = makeRequest('GET', 'savedPins', '', user_id); 
 
  return pinsPromised
  .then(res => res.data.savedPins)
  .catch(err => {
    // console.log(`Couldn't get the user pins: ${err}`);

    //rethrow error
    throw(err);
  });

} 

//This function generates markers and drops them on a map (if specified)
const makePinMarkers = (pinArray = []) => {
 
  let pinMarkers = [];
  

  for (let pin of pinArray) {
    //create  marker for the pin and bind it ot the map
    let thisMarker =  L.marker([pin.lat, pin.lng], {
      icon: FAV_MARKER_ICON,
      draggable: false,
      autopan: true,
      riseOnHover: true,
      title: pin.place_id
    });

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

    /* TO DO
    Bind a custom container for each pin on click */
    marker.bindPopup(marker.title);
  }
}


//Export Statements
export {fetchAndDropUserPins, getSavedPins, makePinMarkers, dropPin};

