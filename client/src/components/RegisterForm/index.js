import { h, Component } from 'preact';
import { Link } from 'preact-router/match';
import PropTypes from 'prop-types';
import style from './style';

import Button from 'preact-material-components/Button';
import 'preact-material-components/Button/style.css';
import 'preact-material-components/Theme/style.css';

import Elevation from 'preact-material-components/Elevation';
import 'preact-material-components/Elevation/style.css';

import TextField from 'preact-material-components/TextField';
import 'preact-material-components/TextField/style.css';
import ResetPasswordForm from "../ResetPasswordForm";

export default class RegisterForm extends Component {
	render() {
		return (
			<Elevation z={2}>
				<div class={style['register-form']}>
					<div class='mdc-form-field mdc-form-field--align-end'>
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
					</div>
					<p><Link activeClassName={style.active} href="/signin">sign in</Link></p>
					<p><Link activeClassName={style.active} href="/forgot-password">forgot password?</Link></p>
				</div>
			</Elevation>
		);
	}
}

ResetPasswordForm.propTypes = {
	appName: PropTypes.string,
}
