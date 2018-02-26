import { h, Component } from "preact";
import style from "./style";
import MapContainer from '../../components/LeafletOsmMap';
import Search from '../../components/Search'
import SearchResults from '../../components/SearchResults';

export default class MapExplorer extends Component {
  render() {
    return (
      <div class={style.maps}>
        <Search>
          <SearchResults />
        </Search>
        <MapContainer />
      </div>
    );
  }
}
