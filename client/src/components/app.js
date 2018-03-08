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
// import Signin from '../routes/signin';
import SignOut from '../routes/signout';
// import Register from '../routes/register';
import Settings from '../routes/settings';

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
				<Match path="/">
					{ ({ matches, path, url }) => matches && (
						<Logo />
					) }
				</Match>
				<Router onChange={this.handleRoute}>
					<Home path="/" />
					<Profile path="/profile/" user="me" />
					<Profile path="/profile/:user" />
					<Account path="/register" />
					<Account path="/signin"/>
					<Account path="/forgot-password"/>
          				<Account path="/reset-password"/>
          				<Settings path="/settings"/>
					<SignOut path="/signout"/>
					<Directions path="/directions" />
					<Pins path="/pins" />
					<Maps path="/maps" />
				</Router>
			</div>
		);
	}
}
