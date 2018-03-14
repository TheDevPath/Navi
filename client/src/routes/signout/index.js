import { h, Component } from 'preact';
import { logout } from "../../js/validate-account-form";
import Home from '../home';

export default class SignOut extends Component {
	componentWillMount() {
		logout();
	}

	render() {
    		window.history.pushState({url: '/'}, 'Home', '/');
		return (<Home logout={true}/>)
	}
}

