import { h, Component } from "preact";
import style from "./style";
import axios from 'axios';
import { API_SERVER, SAVE_DIRECTIONS_PATH } from '../../../config';
import MapPane from '../../components/LeafletOsmMap/MapPane';
import Itinerary from "./Itinerary";
import { makeRequest, token } from "../../js/server-requests-utils";
const SUCCESS_STATUS = 200;
const ERROR_STATUS = 500;

/**
* Leaflet related imports: leaflet, pouchdb module, and routing machine module
*/
import '../../../node_modules/leaflet/dist/leaflet.css';
import '../../../node_modules/leaflet-routing-machine/dist/leaflet-routing-machine.css';
import L from '../../js/leaflet-tileLayer-pouchdb-cached';
import Routing from '../../../node_modules/leaflet-routing-machine/src/index.js';
import 'leaflet-easybutton';

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
      itinerary: null,
      destination: {
        lat: 38.8512462,
        lng: -77.0424202,
        address: 'Ronald Reagan Washington National Airport, Arlington, VA 22202',
      },
      origin: {
        address: '1600 Pennsylvania Ave NW, Washington, DC 20500',
        lat: 38.8976094,
        lng: -77.0389236,
      },
      sidebarOpen: false,
      directions: [],
    }

    // this.initMap = this.initMap.bind(this);
    this.handleViewSidebar = this.handleViewSidebar.bind(this);
    this.saveDirections = this.saveDirections.bind(this);

    this.formatter = new L.Routing.Formatter({});
  }
  
  componentDidMount() {
    const map = L.map('map');
    const selfDir = this;
    map.addLayer(OSM_TILE_LAYER);
    this.control = Routing.control({
      waypoints: [
        L.latLng(this.state.origin.lat,
          this.state.origin.lng),
        L.latLng(this.state.destination.lat,
          this.state.destination.lng),
      ],
      routeWhileDragging: true,
      reverseWaypoints: true,
      showAlternatives: true,
      show: false,
      collapsible: false,
    }).addTo(map);

    this.control.on('routeselected', (e) => {

      let directions = [];
      directions = e.route.instructions.map(item =>
        this.formatter.formatInstruction(item));
      this.setState({ itinerary: e, directions: directions });
    });

    // Reverse direction button
    L.easyButton({
      states: [{
        stateName: 'reverse-route',        // name the state
        icon: '<img src="../../assets/icons/leaflet/SVG/ChangeDirectionsIcon.svg" style="width:15px"/>	',               // and define its properties
        title: 'Reverse Direction',      // like its title
        onClick: (btn, map) => {       // and its callback
          selfDir.control.setWaypoints(selfDir.state.itinerary.route.waypoints.reverse());
          console.log("Waypoints reversed");
        }
      }]
    }).addTo(map);

    //Button to expand and collapse the Sidebar displaying itinerary instructions.
    L.easyButton({
      position: 'topright',
      states: [{
        stateName: 'show-route',        // name the state
        icon: '<strong><<</strong>',               // and define its properties
        title: 'Show route instruction',      // like its title
        onClick: (btn, map) => {       // and its callback
          selfDir.handleViewSidebar();
          btn.state('collapse-route');    // change state on click!
        }
      }, {
        stateName: 'collapse-route',
        icon: '<strong>>></strong>',
        title: 'Collapse route instruction',
        onClick: (btn, map) => {
          selfDir.handleViewSidebar();
          btn.state('show-route');
        }
      }]
    }).addTo(map);

    //Save directions
    L.easyButton('<span >&starf;</span>', function (controlArg, mapArg) {
      selfDir.saveDirections();
    }, 'Save Route').addTo(map);


    map.on('click', function (event) {
      const container = L.DomUtil.create('div');
      const startBtn = createButton('Start Here', container);
      const destBtn = createButton('End Here', container);
      L.popup()
        .setContent(container)
        .setLatLng(event.latlng)
        .openOn(map);
      L.DomEvent.on(startBtn, 'click', function () {
        control.spliceWaypoints(0, 1, event.latlng);
        map.closePopup();
      });
      L.DomEvent.on(destBtn, 'click', function () {
        control.spliceWaypoints(control.getWaypoints().length - 1, 1, event.latlng);
        map.closePopup();
      });
    });
  }

  handleViewSidebar() {
    this.setState({ sidebarOpen: !this.state.sidebarOpen });
  }

  saveDirections() {
    makeRequest('POST', SAVE_DIRECTIONS_PATH, '',
      {
        origin: this.state.origin,
        destination: this.state.destination,
        waypoints: this.state.itinerary.route.waypoints,
        directions: this.state.directions,
        /*  label: , //(optional) user provided label description
         user: //UserID */
      }
    )
      .then(function (response) {
        alert('Saved!')
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  render() {
    return (
      <div class={this.state.sidebarOpen ? style.directionspartial : style.directions}>
        <MapPane paneHeight={this.props.paneHeight} />
        <div class={this.state.sidebarOpen ? style.sidenav : style.sidenavclose} >
          {this.state.itinerary ? <Itinerary data={this.state.itinerary} directions={this.state.directions} /> : ''}
        </div>
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