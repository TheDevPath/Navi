import { h, Component } from "preact";
import style from "./style";

export default class Directions extends Component {
  render() {
    return (
      <div class={style.directions}>
        <h1>Directions</h1>
        <p>This is the Directions Route.</p>
      </div>
    );
  }
}