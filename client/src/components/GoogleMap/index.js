import { Component } from 'preact';
const { GOOGLE_API_KEY } = require('../../../config');

import Map, { GoogleApiWrapper, Marker, InfoWindow } from 'google-maps-react';

class MapContainer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showingInfoWindow: false,
            activeMarker: {},
            selectedPlace: {},
        }
        this.onMarkerClick = this.onMarkerClick.bind(this);
        this.onMapClicked = this.onMapClicked.bind(this);
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
                    lat: 48.8684921,
                    lng: 2.3174882,
                }}
            >
                <Marker
                    onClick={this.onMarkerClick}
                    name={'PWA Paris'}
                    position={{lat: 48.8827176, lng: 2.3202777}}
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
