import { h, Component } from 'preact';
import style from './style';
import Favorites from '../../components/favorites';
import SearchAutocomplete from '../../components/search';

export default class Profile extends Component {
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
		this.setState({ time: Date.now() });
	};

	// Note: `user` comes from the URL, courtesy of our router
	render({ user }, { time }) {
		return (
			<div class={style.profile}>
				<h1>Profile: {user}</h1>
				<p>This is the user profile for a user named { user }.</p>
				<div>Current time: {new Date(time).toLocaleString()}</div>
				<SearchAutocomplete style={{width: '80%'}}
    												onPlaceSelected={(place) => {
      											console.log(place);
    			}}
				/><button type="submit">Search</button>
				<Favorites/>
			</div>
		);
	}
}
