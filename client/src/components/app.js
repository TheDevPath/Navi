import { h, Component } from 'preact';
import { Router } from 'preact-router';
import Match from 'preact-router/match';

// import components
import GoogleMap from './GoogleMap';
import PlacesMap from './PlacesMap';
import Nav from './Nav';
import Logo from './Logo';
import Pins from './Pins';

// import routes
import Home from '../routes/home';
import Profile from '../routes/profile';
import Directions from '../routes/directions';
import Places from '../routes/places';
import Maps from '../routes/maps';
import Signin from '../routes/signin';
import Register from '../routes/register';

// import Home from 'async!../routes/home';
// import Profile from 'async!../routes/profile';

export default class App extends Component {
	/** Gets fired when the route changes.
	 *	@param {Object} event		"change" event from [preact-router](http://git.io/preact-router)
	 *	@param {string} event.url	The newly routed URL
	 */
	handleRoute = e => {
		this.currentUrl = e.url;
	};

	render() {
		return (
			<div id="app">
				<Nav />
				<Match path="/">
					{ ({ matches, path, url }) => matches && (
						<Logo />
					) }
				</Match>
				<Router onChange={this.handleRoute}>
					<Home path="/" />
					<Profile path="/profile/" user="me" />
					<Profile path="/profile/:user" />
					<Register path="/register" />
					<Signin path="/signin" />
					<Signin path="/forgot-password"/>
					<Signin path="/reset-password"/>
					<Places path="/places" />
					<Directions path="/directions" />
					<Pins path="/pins" />
					<Maps path="/maps" />
				</Router>
			</div>
		);
	}
}
