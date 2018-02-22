import { h, Component } from 'preact';
import '../../../node_modules/leaflet/dist/leaflet.css';
import L from '../../js/leaflet-tileLayer-pouchdb-cached';


// // TODO - remove this module from dependencies
// import Map, { GoogleApiWrapper, Marker, InfoWindow } from 'google-maps-react';

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

export default class MapContainer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            map: null,
            lat: null,
            lng: null,
            watchID: null,
            screenHeight: screen.height * 0.95,
        }
        this.initMap = this.initMap.bind(this);
      }

      componentDidMount() {
        // initialize map container if null
        if (!this.state.map) {
            this.setState({
                map: new L.Map('map'),
            });
        }

        // continuously track users position
        const watchID = navigator.geolocation.watchPosition(this.initMap);
        this.setState({
            watchID: watchID,
        });
      }
    
      initMap(position) {
        // don't initialize map if it already has OSM tile layer
        if (this.state.map.hasLayer(TILE_LAYER)) {
            return;
        }

        this.setState({
            lat: position.coords.latitude || 51.3,
            lng: position.coords.longitude || 0.7,
        });
    
        this.state.map.setView(L.latLng(this.state.lat, this.state.lng), 15);
        this.state.map.addLayer(TILE_LAYER);
    
        L.marker([this.state.lat, this.state.lng])
          .addTo(this.state.map).bindPopup('Current Location').openPopup();
      }

    render() {
        const styles = {
            height: this.state.screenHeight,  // HAVE TO SET HEIGHT TO RENDER MAP
        }
        return (
            <div id="map" style={styles}/>
        )
    };

    componentWillUnmount() {
        console.log('begin - componentWillUnmount() ', this.state.map);
        // stop watching user position when map is unmounted
        navigator.geolocation.clearWatch(this.state.watchID);
        this.state.map.remove();
        console.log('begin - componentWillUnmount() ', this.state.map);
    }
}

