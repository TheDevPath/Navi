import { h, Component } from "preact";
import style from "./style";
import MapPane from '../../components/LeafletOsmMap/MapPane';

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

export default class Directions extends Component {
  constructor(props) {
    super(props);
    this.state = {
        // map: null,
        // lat: null,
        // lng: null,
        // watchID: null,
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
    map.addLayer(OSM_TILE_LAYER);

    const control = Routing.control({
        waypoints: [
            L.latLng(this.state.whiteHouse.lat,
              this.state.whiteHouse.lng),
            L.latLng(this.state.airport.lat,
              this.state.airport.lng),
        ],
        routeWhileDragging: true,
    }).addTo(map);

    map.on('click', function(event) {
      const container = L.DomUtil.create('div');
      const startBtn = createButton('Start Here', container);
      const destBtn = createButton('End Here', container);

      L.popup()
        .setContent(container)
        .setLatLng(event.latlng)
        .openOn(map);

      L.DomEvent.on(startBtn, 'click', function() {
        control.spliceWaypoints(0, 1, event.latlng);
        map.closePopup();
      });

      L.DomEvent.on(destBtn, 'click', function() {
        control.spliceWaypoints(control.getWaypoints().length - 1, 1, event.latlng);
        map.closePopup();
      });
    });
  }

  render() {
    return (
      <div class={style.directions}>
        <MapPane height={screen.height * 0.95}/>
      </div>
    );
  }
}

function createButton(label, container) {
  const btn = L.DomUtil.create('button', '', container);
  btn.setAttribute('type', 'button');
  btn.innerHTML = label;
  return btn;
}
