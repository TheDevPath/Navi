import { h, Component } from 'preact';
import { Link } from 'preact-router/match';
import style from './style';

import Button from 'preact-material-components/Button';
import 'preact-material-components/Button/style.css';
import Label from 'preact-material-components/Label';

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
                          <p><Link activeClassName={style.active} href="/register">register</Link></p>
                          <p><Link activeClassName={style.active} href="/forgot-password">forgot password?</Link></p>
                      </form>
                   </div>
              </div>
      </Elevation>
      );
  }
}
