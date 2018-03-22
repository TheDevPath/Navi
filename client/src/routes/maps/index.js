// node_module imports
import { h, Component } from "preact";
import { connect } from 'preact-redux';

// app module imports
import style from "./style";
import MapContainer from '../../components/LeafletOsmMap';

export default class MapExplorer extends Component {
  render() {
    return (
      <div class={style.maps}>
        <MapContainer paneHeight={this.props.paneHeight} routeUrl={this.props.url}/>
      </div>
    );
  }
}
