import { h, Component } from "preact";
import style from "./style";
import MapContainer from '../../components/GoogleMap';

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
const TILE_LAYER = new L.TileLayer(OSM_URL, {
    attribution: OSM_ATTRIB,
    useCache: true,
    crossOrigin: true,
});

// redirect marker icon path to assets directory
L.Icon.Default.imagePath = '../../assets/icons/leaflet/';

export default class Directions extends Component {
  constructor(props) {
    super(props);
    this.state = {
        // map: null,
        // lat: null,
        // lng: null,
        // watchID: null,
        screenHeight: screen.height * 0.95,
        airport: {
          lat: 38.8512462,
          lng: -77.0424202,
          address: 'Ronald Reagan Washington National Airport, Arlington, VA 22202',
        },
        whiteHouse: {
          address: '1600 Pennsylvania Ave NW, Washington, DC 20500',
          lat: 38.8976094,
          lng: -77.0389236,
        }
    }
    // this.initMap = this.initMap.bind(this);
  }

  componentDidMount() {
    const map = L.map('map');
    L.tileLayer(OSM_URL, {
        attribution: OSM_ATTRIB,
        useCache: true,
        crossOrigin: true,
    }).addTo(map);

    Routing.control({
        waypoints: [
            L.latLng(this.state.whiteHouse.lat,
              this.state.whiteHouse.lng),
            L.latLng(this.state.airport.lat,
              this.state.airport.lng),
        ],
        routeWhileDragging: true,
    }).addTo(map);
  }

  render() {
    const styles = {
      height: this.state.screenHeight,
    }
    return (
      <div class={style.directions}>
        <MapContainer height={screen.height * 0.95}/>
      </div>
    );
  }
}