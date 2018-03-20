import { h, Component } from "preact";

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
      droppedMarker:null,
    };

    this.getUserLocation = this.getUserLocation.bind(this);
    this.onLocationFound = this.onLocationFound.bind(this);
    this.onLocationError = this.onLocationError.bind(this);
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

    // add OSM tile layer to map object
    this.state.map.addLayer(OSM_TILE_LAYER);

    // configure map events
    this.state.map.on('locationfound', this.onLocationFound);
    this.state.map.on('locationerror', this.onLocationError);
    this.state.map.on('click', this.onMapClick);
    
    this.getUserLocation();
  }

  /**
   * Attempt to get user's current location via device
   */
  getUserLocation() {
     this.state.map.locate({
      setView: true,
      enableHighAccuracy: false,
      timeout: 60000,
      maximumAge: Infinity,
    });
  }

  /**
   * Handle leaflet map get device location event
   * @param {object} event
   */
  onLocationFound(event) {
    this.state.map.setZoom(16);
    const userMarker = L.circleMarker(event.latlng, {
      radius: 8,
      weight: 3,
      fillColor: 'red'
    })
      .addTo(this.state.map)
      .bindPopup('You Are Here');

    this.setState({
      mapCenter: event.latlng,
      userMarker: userMarker
    });
  }

  /**
   * Handle leaflet map get device location failure
   * @param {object} event
   */
  onLocationError(event) {
    // TODO - dummy message for now if don't have permission to get user
    // user location. Next step is to notify and request permission again.
    alert(event.message);
  }

  render() {
    return (
      <div />
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
