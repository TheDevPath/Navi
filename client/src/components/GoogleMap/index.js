import { h, Component } from 'preact';
const { GOOGLE_API_KEY } = require('../../../config');

import Map, { GoogleApiWrapper, Marker, InfoWindow } from 'google-maps-react';

class MapContainer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showingInfoWindow: false,
            activeMarker: {},
            selectedPlace: {},
            lat: null,
            lng: null,
        }
        this.onMarkerClick = this.onMarkerClick.bind(this);
        this.onMapClicked = this.onMapClicked.bind(this);
        this.geolocatonSuccess = this.geolocatonSuccess.bind(this);
        navigator.geolocation.getCurrentPosition(this.geolocatonSuccess);
    }

    geolocatonSuccess(position) {
        this.setState({
            lat: position.coords.latitude,
            lng: position.coords.longitude,
        });
    }

    onMarkerClick = (props, marker, e) => {
        this.setState({
            selectedPlace: props,
            activeMarker: marker,
            showingInfoWindow: true
        });
    };

    onMapClicked = (props) => {
        if (this.state.showingInfoWindow) {
            this.setState({
                showingInfoWindow: false,
                activeMarker: null
            })
        }
    };

    render() {
        return (
            <Map
                google={this.props.google}
                onClick={this.onMapClicked}
                zoom={13}
                center={{
                    lat: this.state.lat,
                    lng: this.state.lng,
                }}
            >
                <Marker
                    onClick={this.onMarkerClick}
                    name={'Current location'}
                    position={{lat: this.state.lat, lng: this.state.lng}}
                />

                <InfoWindow
                    marker={this.state.activeMarker}
                    visible={this.state.showingInfoWindow}
                >
                    <h1>
                        {this.state.selectedPlace.name}
                    </h1>
                </InfoWindow>
            </Map>
        )
    };
}

export default GoogleApiWrapper({
    apiKey: GOOGLE_API_KEY,
})(MapContainer)