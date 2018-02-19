import { h, Component } from "preact";
import style from "./style";
import MapContainer from '../../components/LeafletOsmMap';

export default class Maps extends MapContainer {
  render() {
    return (
      <div id='map' class={style.maps}>
      </div>
    );
  }
}
