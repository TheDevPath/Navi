import {h, Component} from 'preact';
import {Link} from 'preact-router/match';
import PropTypes from 'prop-types';
import style from './style';
import {handleRegisterSubmit, clearForms} from "../../js/utilities";

import ResetPasswordForm from "../ResetPasswordForm";

export default class RegisterForm extends Component {
  constructor() {
    super();
    this.handleRegisterSubmit = handleRegisterSubmit.bind(this);
  }

  componentWillMount = () => {
    clearForms();
  }

  render() {
    return (
      <div class={style['register-form']}>
        <div>
          <h1>Join</h1>
          <div id="message_area"/>
          <form onSubmit={this.handleRegisterSubmit}>
            <span>Name:</span><input type="text" name="name" value=""/><br/>
            <span>Email: </span><input type="text" name="email" value=""/><br/>
            <br/>
            <span>New password: </span><input type="password" name="password" value=""/><br/>
            <span>Confirm password: </span><input type="password" name="confirm_password" value=""/><br/>

            <input type="submit" value="Join!"/>
          </form>
        </div>
        <p>
          <Link activeClassName={style.active} href="/signin">sign in</Link>
        </p>
        <p>
          <Link activeClassName={style.active} href="/forgot-password">forgot password?</Link>
        </p>
      </div>);
  }
}

ResetPasswordForm.propTypes = {
  appName: PropTypes.string
}
