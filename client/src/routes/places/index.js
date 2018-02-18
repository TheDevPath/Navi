import { h, Component } from "preact";
import style from "./style";
import PlacesContainer from '../../components/PlacesMap';

export default class Places extends Component {
  render() {
    return (
      <div>
        <PlacesContainer />
      </div>
    );
  }
}
