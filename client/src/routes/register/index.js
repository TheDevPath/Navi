import { h, Component } from 'preact';
import { Link } from 'preact-router/match';
// import NonMapHeader from '../../components/Header/NonMapHeader';
import style from './style';

import Button from 'preact-material-components/Button';
import 'preact-material-components/Button/style.css';
import 'preact-material-components/Theme/style.css';

import TextField from 'preact-material-components/TextField';
import 'preact-material-components/TextField/style.css';

export default class Register extends Component {
	render() {
		return (
			<div>
				<h1>Join</h1>
				<form action="/">
					<div>
						<TextField label="Email" name="email"/>
					</div>
					<div>
						<TextField label="Password" name="password" type="password"/>
					</div>
					<div>
						<TextField label="Confirm Password" name="confirm_password" type="password"/>
					</div>
					<Button unelevated className="mdc-theme--primary-bg">
						Join
					</Button>
				</form>
				<p><Link activeClassName={style.active} href="/signin">sign in</Link></p>
				<p><Link activeClassName={style.active} href="/forgot-password">forgot password?</Link></p>
			</div>
		);
	}
}
