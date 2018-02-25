import { h, Component } from "preact";
import style from "./style";

export default class Pins extends Component {
  render() {
    return (
      <div class={style.pins}>
        <h1>Pins</h1>
        <p>This is the Pins Component.</p>
      </div>
    );
  }
}
