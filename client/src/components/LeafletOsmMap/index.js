// node_module imports
import { h, Component } from "preact";
import { route } from "preact-router";

// app module imports
import style from "./style";
import MapPane from './MapPane';
import Search from '../../components/Search';
import SearchResults from '../../components/SearchResults';

export default class MapContainer extends Component {
  render() {
    return (
      <div class={style.fullscreen}>
        <Search map={this.state.map} routeUrl={this.props.routeUrl}
          addMarker={this.addPlaceDetailMarker}>
          <SearchResults />
        </Search>
        <MapPane paneHeight={this.props.paneHeight} />
      </div>
    );
  }
}
