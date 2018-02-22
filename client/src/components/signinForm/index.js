import { h, Component } from 'preact';
import { Link } from 'preact-router/match';
import style from './style';

import {Button, Elevation, TextField} from 'preact-material-components';
import 'preact-material-components/Button/style.css';
import 'preact-material-components/Elevation/style.css';
import 'preact-material-components/TextField/style.css';
import {handleSigninSubmit} from "../../js/auth-helpers";

export default class SigninForm extends Component {
  constructor() {
    super();
    this.handleSigninSubmit = handleSigninSubmit.bind(this);
  }

  render() {
      return (
          <Elevation z={2}>
	       <div id="message_area"/>
              <div class={style.form}>
                  <div class='mdc-form-field mdc-form-field--align-end'>
                      <form onSubmit={this.handleSigninSubmit}>
                          <TextField label="Enter your email" id="email" name="email" type="email" /> <br /><br />
                          <TextField label="Enter your password" id="password" name="password" type="password" />
                          <br />
                          <Button id="loginBtn">Login!</Button>
                          <p><Link activeClassName={style.active} href="/register">register</Link></p>
                          <p><Link activeClassName={style.active} href="/forgot-password">forgot password?</Link></p>
                      </form>
                   </div>
              </div>
      </Elevation>
      );
  }
}
