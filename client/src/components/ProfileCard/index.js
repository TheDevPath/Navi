import {h, Component} from 'preact';
import style from './style';

export default class ProfileCard extends Component {

    state = {
        time: Date.now()
    };

    // gets called when this route is navigated to
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

    render({ user }, { time }) {
        return (
        <div class={style.profileCard}>
            <span id={style.profileCardTitle}>Profile: {user}</span><br/>
            <hr/>
            <span>picture here</span><br/>
            <span>Local time: {new Date(time).toTimeString()}</span><br/>
            <span>saved pins: 5000</span>

        </div>
        );
    }
}
