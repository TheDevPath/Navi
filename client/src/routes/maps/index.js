import { h, Component } from "preact";
import style from "./style";
import MapContainer from '../../components/LeafletOsmMap';

export default class MapExplorer extends Component {
  render() {
    return (
      <div class={style.maps}>
        <MapContainer paneHeight={this.props.paneHeight} url={this.props.url}
          searchResult={this.props.searchResult}/>
      </div>
    );
  }
}
