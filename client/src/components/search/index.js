import { h, Component } from 'preact';
import style from './style';
import GoogleApiComponent from 'google-maps-react/dist/GoogleApiComponent';
const { GOOGLE_API_KEY } = require('../../../config');

class SearchAutocomplete extends Component {

  constructor(props) {
    super(props);
    this.state = {
      currentLocation: {
        lat: null,
        lng: null
      }
    }
    this.complete = null;
    if (navigator && navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((pos) => {
        const coords = pos.coords;
        this.setState({
          currentLocation: {
            lat: coords.latitude,
            lng: coords.longitude
          }
        })
      })
    }
    this.loadMap = this.loadMap.bind(this);
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.currentLocation !== this.state.currentLocation) {
      this.loadMap();
    }
  }

  loadMap() {
    if(this.props && this.props.google) {
      const {google} = this.props;
      const maps = google.maps;
      const input = this._input;
      const {lat, lng} = this.state.currentLocation;
      let defaultBounds = new google.maps.LatLngBounds(
            new google.maps.LatLng(lat, lng),
            new google.maps.LatLng(lat, lng));
      let options = {
        bounds: defaultBounds,
        types: ['(cities)']
      };
      this.complete = new google.maps.places.Autocomplete(input, options);
      this.complete.addListener('place_changed', () => {
        let place = this.complete.getPlace();
        console.log(place);
      })
    }
  }
    
  render() {
    return (
      <div>
        <input class={style.search} ref={(input) => this._input = input}/>
      </div>  
    );
  }
}

export default GoogleApiComponent({
  apiKey: GOOGLE_API_KEY,
})(SearchAutocomplete)