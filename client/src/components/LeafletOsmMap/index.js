import { h, Component } from "preact";
import style from "./style";
import MapPane from './MapPane';
import Search from '../../components/Search';
import SearchResults from '../../components/SearchResults';
import {fetchAndDropUserPins} from './SavedPlaces.js';

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
const OSM_URL = 'http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
const OSM_ATTRIB = '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors';
const OSM_TILE_LAYER = new L.TileLayer(OSM_URL, {
    attribution: OSM_ATTRIB,
    useCache: true,
    crossOrigin: true,
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
    }
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
            zoom: 16,
          }),
      });
    }
    // add zoom to bottom left
    const zoomControl = L.control.zoom().setPosition('bottomleft').addTo(this.state.map);

    this.state.map.addLayer(OSM_TILE_LAYER);

    // attempt to get user's current location via device
    this.state.map.locate({
      setView: true,
      enableHighAccuracy: true,
    });

    // configure map events
    this.state.map.on('locationfound', this.onLocationFound);
    this.state.map.on('locationerror', this.onLocationError);
    this.state.map.on('click', this.onMapClick);

    //once map is ready, drop pins
    fetchAndDropUserPins(undefined, this.state.map);
  }

  /**
   * Handle leaflet map get device location event
   * @param {*} event 
   */
  onLocationFound(event) {
    this.state.map.setZoom(16);
    const userMarker = L.circleMarker(event.latlng, {
      radius: 8,
      weight: 3,
      fillColor: 'red',
    }).addTo(this.state.map)
      .bindPopup('You Are Here');

    this.setState({
      mapCenter: event.latlng,
      userMarker: userMarker,
    });
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
   * On map click event, add a marker to the map at the clicked location.
   *
   * @param {*} event 
   */
  onMapClick(event) {
    const droppedPin = L.marker(event.latlng, {
      draggable: true,
      autoPan: true,
    }).addTo(this.state.map);

    const container = L.DomUtil.create('div');
    const saveBtn = createButton('Save', container);
    const deleteBtn = createButton('Remove', container);
  
    L.DomEvent.on(saveBtn, 'click', function() {
      // TODO - save marker location to db if possible or queue to
      // save when backend server is available
      alert(`Save marker at: ${event.latlng}!`);
    });
  
    L.DomEvent.on(deleteBtn, 'click', function() {
      droppedPin.remove();
    });

    droppedPin.bindPopup(container);
  }


  render() {
    return (
      <div class={style.fullscreen}>
        <Search position={this.state.mapCenter} map={this.state.map}>
          <SearchResults />
        </Search>
        <MapPane height={screen.height}/>
      </div>
    );
  }

  componentWillUnmount() {
    // TODO - add feature for tracking user's moving position, probably
    // only needed for directions mode.
    // map.stopWatch();
    this.state.map.remove();
    this.setState({map: null});
  }
}

function createButton(label, container) {
  var btn = L.DomUtil.create('button', '', container);
  btn.setAttribute('type', 'button');
  btn.innerHTML = label;
  return btn;
}
