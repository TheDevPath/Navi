import { h, Component } from 'preact';

export default class MapPane extends Component {
    render() {
        const styles = {
            height: this.props.paneHeight,  // HAVE TO SET HEIGHT TO RENDER MAP
        }
        return (
            <div id="map" style={styles}/>
        )
    };
}
