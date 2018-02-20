import { h, Component } from "preact";
import style from "./style";
import MapContainer from '../../components/LeafletOsmMap';

export default class Directions extends MapContainer {
  render() {
    return (
      <div id='map' class={style.directions}>
      </div>
    );
  }
}