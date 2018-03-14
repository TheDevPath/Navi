import {h, Component} from 'preact';
import style from './style';
import {setStateUserOrRedirectToSignIn} from "../../js/validate-account-form";

export default class ProfileCard extends Component {
  constructor() {
    super();
    this.state = {
      time: Date.now(),
      user: {},
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
        <div class={style.profileCard}>
            <span id={style.profileCardTitle}>Profile: {user.name}</span><br/>
            <hr/>
            <span>picture here</span><br/>
            <span>Local time: {new Date(time).toTimeString()}</span><br/>
            <span>saved pins: 5000</span>

        </div>
        );
    }
}
