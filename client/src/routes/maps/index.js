import { h, Component } from "preact";
import style from "./style";
import MapContainer from '../../components/LeafletOsmMap';
import Search from '../../components/AppSearch'
import UnorderedList from '../../components/UnorderList';

export default class Maps extends Component {
  render() {
    return (
      <div class={style.maps}>
        <Search>
          <UnorderedList />
        </Search>
        <MapContainer />
      </div>
    );
  }
}
