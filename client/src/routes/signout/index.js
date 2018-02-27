import { h, Component } from 'preact';
import { logout } from "../../js/utilities";

export default class SignOut extends Component {
	componentWillMount() {
		logout();
	}

	render() {
		return null;
	}
}

