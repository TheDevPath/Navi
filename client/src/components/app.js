import { h, Component } from 'preact';
import { Router } from 'preact-router';
import GoogleMap from './GoogleMap';
import Header from './header';
import Home from '../routes/home';
import Profile from '../routes/profile';
import Directions from '../routes/directions';
import Pins from '../routes/pins';
import Maps from '../routes/maps';
import Signin from '../routes/signin';
import ForgotPassword from '../routes/forgot-password';
import Register from '../routes/register';
import ResetPassword from '../routes/reset-password';

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
				<Header />
				<Router onChange={this.handleRoute}>
					<Home path="/" />
					<GoogleMap path="/showMap" />
					<Profile path="/profile/" user="me" />
					<Profile path="/profile/:user" />
					<Signin appName="E-map" path="/signin/" />
					<Directions path="/directions" />
					<Pins path="/pins" />
					<Maps path="/maps" />
					<Register path="/register" />
					<ForgotPassword path="forgot-password"/>
					<ResetPassword path="reset-password"/>
				</Router>
			</div>
		);
	}
}
