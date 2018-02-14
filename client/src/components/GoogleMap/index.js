import { h, Component } from 'preact';
import leafletStyle from '../../../node_modules/leaflet/dist/leaflet.css';
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
        }
        this.initMap = this.initMap.bind(this);
      }

      componentDidMount() {
        // continuously track users position
        const watchID = navigator.geolocation.watchPosition(this.initMap);
        this.setState({
            watchID: watchID,
        });
      }
    
      initMap(position) {
        const map = new L.Map('map');

        this.setState({
            map: map,
            lat: position.coords.latitude || 51.3,
            lng: position.coords.longitude || 0.7,
        });
    
        map.setView(L.latLng(this.state.lat, this.state.lng), 15);
        map.addLayer(TILE_LAYER);
    
        L.marker([this.state.lat, this.state.lng])
          .addTo(map).bindPopup('Current Location').openPopup();
      }

    render() {
        const styles = {
            leaflet: leafletStyle,
            height: 500,  // HAVE TO SET HEIGHT TO RENDER MAP
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

