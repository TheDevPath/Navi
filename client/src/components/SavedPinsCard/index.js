import {h, Component} from 'preact';
import style from './style';
import {makeRequest, token} from "../../js/server-requests-utils";
import {SAVED_PINS_PATH} from '../../../config';

export default class SavedPinsCard extends Component {
  constructor() {
    super();
    this.state = {
      user: {},
      savedPins: [],
    };
    this.getSavedPins = this.getSavedPins.bind(this);
    this.displayPins = this.displayPins.bind(this);
  }

  componentWillMount() {
    this.setState({user: this.props.user});
    this.getSavedPins();
  }

  displayPins(savedPins) {
    let pins = [];
    savedPins.map( pin => {
      pins.push(<div>{pin.place_id}</div>);
    });
    if(pins.length == 0) pins.push(<div>No saved pins</div>);
    this.setState({pins: pins});
  }

  getSavedPins() {
    makeRequest('GET', SAVED_PINS_PATH)
      .then(function (response) {
        this.displayPins(response.data.savedPins);
      }.bind(this))
      .catch(function (error) {
        if (error.response === undefined) {
          this.setState({savedPins: error});
        } else {
          this.setState({savedPins: error.response.data});
        }
      }.bind(this));
  }

  render({}, {user, pins}) {


    return (
      <div class={style.savedPinsCard}>

        <span id={style.savedPinsCardTitle}>Saved Pins</span><br/>


        <div class={style.savedPinsContainer}>{pins}</div>

      </div>
    );
  }
}
