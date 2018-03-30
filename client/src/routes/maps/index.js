import { h, Component } from "preact";
import style from "./style";
import MapContainer from '../../components/LeafletOsmMap';

export default class MapExplorer extends Component {
  render() {
    return (
      <div class={style.maps}>
        <MapContainer paneHeight={this.props.paneHeight} routeUrl={this.props.url}
          userPosition={this.props.userPosition} placeDetail={this.props.placeDetail} selectedPin={this.props.selectedPin} />
      </div>
    );
  }
}
