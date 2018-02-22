import { h, Component } from "preact";
import style from "./style";
import MapContainer from '../../components/LeafletOsmMap';
import GoogleApiComponent from '../../components/search';

export default class Maps extends Component {
  render() {
    return (
      <div class={style.maps}>
        <GoogleApiComponent />
        <MapContainer />
      </div>
    );
  }
}
