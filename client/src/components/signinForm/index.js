import { h, Component } from 'preact';
import style from './style.css';
import {Button, Label} from 'preact-material-components';
import 'preact-material-components/Button/style.css';

import Elevation from 'preact-material-components/Elevation';
import 'preact-material-components/Elevation/style.css';

import TextField from 'preact-material-components/TextField';
import 'preact-material-components/TextField/style.css';


export default class SigninForm extends Component {
  constructor() {
    super();
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(event) {
    event.preventDefault();
    const data = new FormData(event.target);
    fetch('/api/form-submit-url', {
      method: 'POST',
      body: data,
    });
  }

  render() {
      return (
          <Elevation z={2}>
              <div class={style.form}>
                  <div class='mdc-form-field mdc-form-field--align-end'>
                      <form onSubmit={this.handleSubmit}>
                          <TextField label="Enter your email" id="email" name="email" type="email" /> <br /><br />
                          <TextField label="Enter your password" id="password" name="password" type="password" />
                          <br />
                          <Button id="loginBtn">Login!</Button>
                          <Button id="registerBtn">Register</Button>
                          <Button id="resetBtn">Reset password</Button>
                       </form>
                   </div>
              </div>
      </Elevation>
      );
  }
}
