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

export default class ResetPasswordForm extends Component {
	render() {
		return (
			<Elevation z={2}>
				<div class={style['reset-password-form']}>
					<div class='mdc-form-field mdc-form-field--align-end'>
						<h1>We sent you a temporary password. Please change it below:</h1>
						<form action="/">
							<div>
								<TextField label="Email" name="email"/>
							</div>
							<div>
								<TextField label="Temporary Password" name="password" type="password"/>
							</div>
							<div>
								<TextField label="New Password" name="new_password" type="password"/>
							</div>
							<div>
								<TextField label="Confirm New Password" name="confirm_password" type="password"/>
							</div>
							<Button unelevated className="mdc-theme--primary-bg">
								Join
							</Button>
						</form>
					</div>
				</div>
			</Elevation>
		);
	}
}

ResetPasswordForm.propTypes = {
	appName: PropTypes.string,
}
