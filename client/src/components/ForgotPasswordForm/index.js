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

export default class ForgotPasswordForm extends Component {
	render() {
		return (
			<Elevation z={2}>
				<div class={style['forgot-password-form']}>
					<div class='mdc-form-field mdc-form-field--align-end'>
						<h1>We will send you a password.</h1>
						<form action="/reset-password">
							<div>
								<TextField label="Email" name="email"/>
							</div>
							<Button unelevated className="mdc-theme--primary-bg">
								Email temporary password
							</Button>
							<br/>
						</form>
						<br/><Link activeClassName={style.active} href="/register">register</Link>
						<br/><Link activeClassName={style.active} href="/signin">sign in</Link>
					</div>
				</div>
			</Elevation>
		);
	}
}

ForgotPasswordForm.propTypes = {
	appName: PropTypes.string,
}
