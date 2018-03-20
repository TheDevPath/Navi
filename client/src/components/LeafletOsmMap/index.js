import { h, Component } from "preact";
import { route } from "preact-router";
import style from "./style";
import MapPane from './MapPane';
import Search from '../../components/Search';
import SearchResults from '../../components/SearchResults';
import { makeRequest } from '../../js/server-requests-utils';
import {fetchAndDropUserPins, makePinMarkers, dropPin} from '../../js/saved-places';

/**
 * Leaflet related imports: leaflet, pouchdb module, and routing machine module
 */
import '../../../node_modules/leaflet/dist/leaflet.css';
import '../../../node_modules/leaflet-routing-machine/dist/leaflet-routing-machine.css';
import L from '../../js/leaflet-tileLayer-pouchdb-cached';
import Routing from '../../../node_modules/leaflet-routing-machine/src/index.js';

/**
 * TIle layer configuration and attribution constants
 */
const OSM_URL = 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
const OSM_ATTRIB =
  '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors';
const OSM_TILE_LAYER = new L.TileLayer(OSM_URL, {
  attribution: OSM_ATTRIB,
  useCache: true,
  crossOrigin: true
});

// redirect marker icon path to assets directory
L.Icon.Default.imagePath = '../../assets/icons/leaflet/';

export default class LeafletOSMMap extends Component {
  constructor(props) {
    super(props);
    this.state = {
      map: null,
      mapCenter: null,
      userMarker: null,
      droppedMarker: null, //used to track unsaved markers on map
      userPosControlOnScreen: false,
    };

    this.updateUserMarker = this.updateUserMarker.bind(this);
    this.onLocationFound = this.onLocationFound.bind(this);
    this.onLocationError = this.onLocationError.bind(this);
    this.onMapClick = this.onMapClick.bind(this);
  }

  componentDidMount() {
    // initialize map container if null
    if (!this.state.map) {
      this.setState({
        map: L.map('map', {
          zoomControl: false,
          zoom: 16
        })
      });
    }

    // add zoom to bottom left
    const zoomControl = L.control
      .zoom()
      .setPosition('bottomleft')
      .addTo(this.state.map);

    this.state.map.addLayer(OSM_TILE_LAYER);

    this.getUserLocation();

    // configure map events
    this.state.map.on('locationfound', this.updateUserMarker);
    this.state.map.on('locationerror', this.onLocationError);
    this.state.map.on('click', this.onMapClick);

    // once map is ready, drop pins (user=undefined --> default)
    fetchAndDropUserPins(undefined, this.state.map, L);

    // set map center accordingly
    // if (this.props.placeDetail) {

    // }
  }

  /**
   * Handles updating marker identifying user's current location.
   * 
   * @param {object} position geocode object with lat, lng keys
   */
  updateUserMarker(position) {
    let latlng = position;
    if (position.latlng) {
      latlng = position.latlng;
    }

    const userMarker = L.circleMarker(latlng, {
      radius: 8,
      weight: 3,
      fillColor: 'red'
    })
      .addTo(this.state.map)
      .bindPopup('You Are Here');

    this.setState({
      userMarker: userMarker
    });

    // set "Center Map" control if not currently present
    if (!this.state.userPosControlOnScreen) {
      this.createCenterControl();
      this.setState({ userPosControlOnScreen: true });
    }
  }

  /**
   * Updates the state of a dropped pin on map.
   * 
   * @param {object} position geocode object with lat, lng keys
   */
  updateDroppedMarker(position) {
    let latlng = position;
    if (position.latlng) {
      latlng = position.latlng;
    }

    const droppedPin = L.marker(latlng, {
      draggable: true,
      autoPan: true
    }).addTo(this.state.map);

    if (this.state.droppedMarker) {
      this.state.droppedMarker.remove();
    }

    this.setState({ droppedMarker: droppedPin });

    const container = L.DomUtil.create('div');
    const saveMarkerTitle = createInput('Title', container);
    const saveBtn = createButton('Save', container);
    const deleteBtn = createButton('Remove', container);

    //TODO: build function to handle description input using function as state

    L.DomEvent.on(saveBtn, 'click', function () {
      // const position = event.latlng;
      const desc = saveMarkerTitle.value;
      saveMarkerToDB(position, desc);
    });

    L.DomEvent.on(deleteBtn, 'click', function() {
      droppedPin.remove();
    });

    droppedPin.bindPopup(container);
  }

  /**
   * Attempt to get user's current location via device
   */
  getUserLocation() {
    if (this.props.userPosition) {
      this.updateUserMarker(this.props.userPosition);
    } else {
      this.state.map.locate({
       setView: true,
       enableHighAccuracy: false,
       timeout: 60000,
       maximumAge: Infinity,
     });
    }
 }

 /**
  * Create control button for returning user to their current location
  *   on the map
  */
 createCenterControl() {
   L.Control.Center = L.Control.extend({
     onAdd: map => {
       const center = this.state.userMarker.getLatLng();
       const container = L.DomUtil.create(
         'div',
         'leaflet-bar leaflet-control leaflet-control-custom'
       );

       const controlText = L.DomUtil.create('div');
       controlText.style.color = 'rgb(25,25,25)';
       controlText.style.fontFamily = 'Roboto,Arial,sans-serif';
       controlText.style.fontSize = '16px';
       controlText.style.lineHeight = '38px';
       controlText.style.paddingLeft = '5px';
       controlText.style.paddingRight = '5px';
       controlText.innerHTML = 'Center Map';
       container.appendChild(controlText);

       L.DomEvent.disableClickPropagation(container);

       container.style.backgroundColor = '#fff';
       container.style.border = '2px solid #e7e7e7';
       container.style.borderRadius = '3px';
       container.style.boxShadow = '0 2px 6px rgba(0,0,0,.3)';
       container.style.cursor = 'pointer';
       container.style.marginBottom = '22px';
       container.style.textAlign = 'center';
       container.title = 'Click to recenter the map';

       L.DomEvent.on(container, 'mouseenter', function(e) {
         e.target.style.background = '#e7e7e7';
       });

       L.DomEvent.on(container, 'mouseleave', function(e) {
         // e.target.style.color = '#ccc';
         e.target.style.background = '#fff';
       });
       L.DomEvent.on(container, 'click', function() {
         map.setView(center, 16);
       });
       return container;
     }
   });

   L.control.center = function(opts) {
     return new L.Control.Center(opts);
   };

   L.control
     .center()
     .setPosition('bottomright')
     .addTo(this.state.map);
 }

  /**
   * Handle leaflet map get device location event
   * @param {*} event
   */
  onLocationFound(event) {
    this.updateUserMarker(event.latlng);
  }

  /**
   * Handle leaflet map get device location failure
   * @param {*} event
   */
  onLocationError(event) {
    // TODO - dummy message for now if don't have permission to get user
    // user location. Next step is to notify and request permission again.
    alert(event.message);
  }

  /**
   * Attempts to save the marker to database.
   * 
   * @param {object} position geocode object with lat, lng key values
   * @param {string} desc user provide description for dropped marker
   * @param {string} placeID google map's place_id identifier
   */
  saveMarkerToDB(position, desc='', placeID='') {
    makeRequest('POST', 'savedPins', '', {
      lat: position.lat,
      lng: position.lng,
      desc,
    }).then((response) => {
      //remove old icon
      droppedPin.remove();

      //add a new one
      const savedMarker = makePinMarkers([response.data.pin], L);
      dropPin(savedMarker, event.target);

      // alert(`Succes: Saved pin at ${event.latlng} to db`);
    }).catch((err) => {
      switch (err.response.status){
        case 400: //duplicate pin
          const origPin = err.response.data;
          alert('This pin is already on your map.');
          /*TO DO:
          Convert popup alert to toast message
          */
          break;
        case 403: //user not signed in
        /*TO DO:
        Convert to overlay/lightbox window to sign up form
        */
          if (confirm("Would you like to sign in to save places?")) {
            route('/signin', true);
          }

          break;
        default:
        console.log(err); //error saving pin
      }
    });
  }

  /**
   * On map click event, add a marker to the map at the clicked location.
   *
   * @param {object} event
   */
  onMapClick(event) {
    this.updateDroppedMarker(event.latlng);
  }

  render() {
    return (
      <div class={style.fullscreen}>
        <Search position={this.state.mapCenter} map={this.state.map}>
          <SearchResults />
        </Search>
        <MapPane paneHeight={this.props.paneHeight} />
      </div>
    );
  }

  componentWillUnmount() {
    // TODO - add feature for tracking user's moving position, probably
    // only needed for directions mode.
    // map.stopWatch();
    this.state.map.remove();
    this.setState({ map: null });
  }
}

function createButton(label, container) {
  var btn = L.DomUtil.create('button', '', container);
  btn.setAttribute('type', 'button');
  btn.innerHTML = label;
  return btn;
}

function createInput(input, container) {
  var input = L.DomUtil.create('input','sml-textfield_input', container);
  input.setAttribute('type', 'input');
  input.setAttribute('placeholder', 'Enter Description');
  return input;
}
