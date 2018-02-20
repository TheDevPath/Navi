import { h, Component } from 'preact';

export default class MapContainer extends Component {
    constructor(props) {
        super(props);
        }

    render() {
        const styles = {
            height: this.props.height,  // HAVE TO SET HEIGHT TO RENDER MAP
        }
        return (
            <div id="map" style={styles}/>
        )
    };

    componentWillUnmount() {
        // console.log('begin - componentWillUnmount() ', this.state.map);
        // // stop watching user position when map is unmounted
        // navigator.geolocation.clearWatch(this.state.watchID);
        // this.state.map.remove();
        // console.log('begin - componentWillUnmount() ', this.state.map);
    }
}
