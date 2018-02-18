import { h, Component } from 'preact';
import PropTypes from 'prop-types';
import style from './style';
import Map, { GoogleApiWrapper, Marker, InfoWindow, Listing } from 'google-maps-react';

const { GOOGLE_API_KEY } = require('../../../config');

class SearchAutocomplete extends Component {
    static propTypes = {
      onPlaceSelected: PropTypes.func,
      types: PropTypes.array,
      componentRestrictions: PropTypes.object,
      bounds: PropTypes.object,
    }

    constructor(props) {
      super(props);
      this.complete = null;
      this.autocomplete = this.autocomplete.bind(this);
    }


    autocomplete(mapProps, map) {
      const {google} = mapProps;
      let defaultBounds = new google.maps.LatLngBounds(
        new google.maps.LatLng(-33.8902, 151.1759),
        new google.maps.LatLng(-33.8474, 151.2631));
      let input = this._input;
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
      
    render() {
      return (
        <div>
          <input class={style.search} ref={(c) => this._input = c}/>
          <div class={style.hide}>
            <Map google={this.props.google}
              onReady={this.autocomplete}>
            </Map>
          </div>
        </div>  
      );
    }
}

export default GoogleApiWrapper({
  apiKey: GOOGLE_API_KEY,
})(SearchAutocomplete)