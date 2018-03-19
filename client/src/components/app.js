import { h, Component } from 'preact';
import { Router } from 'preact-router';
import Match from 'preact-router/match';
import { LOGIN_PATH, RESET_PATH, REGISTER_PATH } from "../../config";

// import components
import Nav from './Nav';
import Logo from './Logo';
import Pins from './Pins';

// import routes
import Home from '../routes/home';
import Profile from '../routes/profile';
import Directions from '../routes/directions';
import Maps from '../routes/maps';
import Account from '../routes/account';
import SignOut from '../routes/signout';
import Settings from '../routes/settings';

// Available screen real state after factoring space for navbar
const AVAIL_PANE_HEIGHT = screen.availHeight * 0.93;

export default class App extends Component {
	constructor() {
		super();
		this.state = {
			navbarHeight: screen.availHeight - AVAIL_PANE_HEIGHT,
			position: null,
			searchResult: null,
		};

		this.setSearchResult = this.setSearchResult.bind(this);
	}

	/** Gets fired when the route changes.
	 *	@param {Object} event		"change" event from [preact-router](http://git.io/preact-router)
	 *	@param {string} event.url	The newly routed URL
	 */
	handleRoute = e => {
		this.currentUrl = e.url;
	};

	setSearchResult(result) {
		this.setState({ searchResult: result });
	}

	componentDidMount() {
		// get user location if possible before map is loaded
		if (navigator.geolocation) {
			navigator.geolocation.getCurrentPosition((position) => {
				this.setState({
					position: {
						lat: position.coords.latitude,
						lng: position.coords.longitude,
					},
				});
			},
			(error) => {console.log(error)},
			{enableHighAccuracy:false, maximumAge:Infinity, timeout:60000});
		}
	}

	render() {
		return (
			<div id="app">
				<Nav navHeight={this.state.navbarHeight}/>
				<Router onChange={this.handleRoute}>
					<Home path="/" paneHeight={AVAIL_PANE_HEIGHT} setSearchResult={this.setSearchResult}
					  position={this.state.position}/>
					<Profile path="/profile/" user="me" />
					<Profile path="/profile/:user" />
					<Account path="/register" paneHeight={AVAIL_PANE_HEIGHT}/>
					<Account path="/signin" paneHeight={AVAIL_PANE_HEIGHT}/>
					<Account path="/forgot-password" paneHeight={AVAIL_PANE_HEIGHT}/>
          				<Account path="/reset-password" paneHeight={AVAIL_PANE_HEIGHT}/>
          				<Settings path="/settings" paneHeight={AVAIL_PANE_HEIGHT}/>
					<SignOut path="/signout"/>
					<Directions path="/directions" />
					<Pins path="/pins" />
					<Maps path="/maps" paneHeight={AVAIL_PANE_HEIGHT} position={this.state.position}
						searchResult={this.state.searchResult}/>
				</Router>
			</div>
		);
	}
}
