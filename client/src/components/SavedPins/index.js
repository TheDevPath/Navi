import {h, Component} from 'preact';
import style from './style';
import {setStateUserOrRedirectToSignIn} from "../../js/utilities";

export default class SavedPins extends Component {
  constructor() {
    super();
    this.state = {
      time: Date.now(),
      user: {},
      search: {},
    };
    setStateUserOrRedirectToSignIn(this);
  }

    componentDidMount() {
        // start a timer for the clock:
        this.timer = setInterval(this.updateTime, 1000);
    }

    // gets called just before navigating away from the route
    componentWillUnmount() {
        clearInterval(this.timer);
    }

    // update the current time
    updateTime = () => {
        this.setState({time: Date.now()});
    };

    render({  }, { user, time }) {
        return (
        <div class={style.savedPins}>
            <span id={style.savedPinsTitle}>SavedPins: {}</span><br/>
        </div>
        );
    }
}
