import { h, Component } from "preact";
import style from "./style";
// import MapContainer from '../../components/LeafletOsmMap';
import Search from '../../components/AppSearch'
import SearchResults from '../../components/SearchResults';
import Explore from '../../components/Explore';

export default class Maps extends Component {
  render() {
    return (
      <div class={style.maps}>
        <Search>
          <SearchResults />
        </Search>
        <Explore />
      </div>
    );
  }
}
