import { h, Component } from 'preact';
import { Link } from 'preact-router/match';
import style from './style';

import Button from 'preact-material-components/Button';
import 'preact-material-components/Button/style.css';
import 'preact-material-components/Theme/style.css';

import TextField from 'preact-material-components/TextField';
import 'preact-material-components/TextField/style.css';

export default class ForgotPassword extends Component {
	render() {
		return (
			<div>
				<h1>We'll send you a password.</h1>
				<form action="/reset-password">
					<div>
						<TextField label="Email" name="email"/>
					</div>
					<Button unelevated className="mdc-theme--primary-bg">
						Email temporary password
					</Button>
					<br/>
					<br/><Link activeClassName={style.active} href="/register">register</Link>
					<br/><Link activeClassName={style.active} href="/signin">sign in</Link>
				</form>
			</div>
		);
	}
}
