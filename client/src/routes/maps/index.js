import { h, Component } from "preact";
import style from "./style";

export default class Maps extends Component {
  render() {
    return (
      <div class={style.maps}>
        <h1>Maps</h1>
        <p>This is the Maps Route.</p>
      </div>
    );
  }
}
