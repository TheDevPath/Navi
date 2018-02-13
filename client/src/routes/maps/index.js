import { h, Component } from "preact";
import style from "./style";
import MapContainer from '../../components/GoogleMap';

export default class Maps extends Component {
  render() {
    return (
      <div class={style.maps}>
        <h1>Maps</h1>
          <MapContainer />
      </div>
    );
  }
}
