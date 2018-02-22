import { h, Component } from 'preact';
import { Link } from 'preact-router/match';
import style from './style';
import {handleRegisterSubmit} from "../../js/auth-helpers";

import {Button, Elevation, TextField} from 'preact-material-components';
import 'preact-material-components/Button/style.css';
import 'preact-material-components/Theme/style.css';
import 'preact-material-components/Elevation/style.css';
import 'preact-material-components/TextField/style.css';

export default class RegisterForm extends Component {
	constructor() {
		super();
		this.handleRegisterSubmit = handleRegisterSubmit.bind(this);
	}

	render() {
		return (
			<Elevation z={2}>
				<div id="message_area"/>
				<div class={style['register-form']}>
					<div class='mdc-form-field mdc-form-field--align-end'>
						<h1>Join</h1>
						<form onSubmit={this.handleRegisterSubmit}>
							<div>
								<TextField label="Name" name="name"/>
							</div>
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
