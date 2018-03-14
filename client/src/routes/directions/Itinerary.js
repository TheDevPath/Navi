import { h, Component } from "preact";
import style from "./style";
import '../../../node_modules/leaflet/dist/leaflet.css';
import '../../../node_modules/leaflet-routing-machine/dist/leaflet-routing-machine.css';
import L from '../../js/leaflet-tileLayer-pouchdb-cached';
import Routing from '../../../node_modules/leaflet-routing-machine/src/index.js';

export default class Itinerary extends Component {

  //TO DO: Style the instruction display.
  //       On mouseover show the position in the map.

  constructor(props) {
    super(props);
    this.formatter = new L.Routing.Formatter({});
  }

  componentDidMount() {

  }


  render() {
    if (!this.props.data)
      return null;

    const { route } = this.props.data;
    return (
      <div >
        <div><strong>Route:</strong> {route.name} </div>
        <div><strong>Length: </strong>{this.formatter.formatDistance(route.summary.totalDistance)}. <strong>Time:</strong> {this.formatter.formatTime(route.summary.totalTime)}.</div>
        {this.props.directions.map((item) => {
          return (
            <div>{item}</div>
          );
        })}

      </div>
    );
  }
}