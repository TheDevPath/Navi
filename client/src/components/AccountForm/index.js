import { h, Component, render } from 'preact';
import style from './style.css';
import { handleSubmit, clearForms, setStateUserOrRedirectToSignIn } from "../../js/utilities";
import { LOGIN_PATH, REGISTER_PATH, RESET_PATH } from '../../../config';
import linkState from "linkstate";
import { route } from 'preact-router';

export default class AccountForm extends Component {
  constructor() {
    super();
    this.state = {
      form_message: "",
      successMessageMap: this.createMessageMap(),
      matchPasswordsMap: this.createMatchPasswordsMap(),
      validatePasswordMap: this.createValidatePasswordMap(),
    };
    this.handleSubmit = handleSubmit.bind(this);
    this.routeToRegister = this.routeToRegister.bind(this);
  }

  createMessageMap = () => {
    const messageMap = new Map;
    messageMap.set(LOGIN_PATH, 'You have signed in.');
    messageMap.set(REGISTER_PATH, 'You have created an account.');
    messageMap.set(RESET_PATH, 'You have changed your password.');
    return messageMap;
  }

  createMatchPasswordsMap = () => {
    const matchPasswordsMap = new Map;
    matchPasswordsMap.set(REGISTER_PATH, ['password','confirm_password']);
    matchPasswordsMap.set(RESET_PATH, ['new_password','confirm_password']);
    return matchPasswordsMap;
  }

  createValidatePasswordMap = () => {
    const validatePasswordMap = new Map;
    validatePasswordMap.set(LOGIN_PATH, 'password');
    validatePasswordMap.set(REGISTER_PATH, 'password');
    validatePasswordMap.set(RESET_PATH, 'new_password');
    return validatePasswordMap;
  }

  doSubmit = (event) => {
    const args = {
      event: event,
      path: this.props.path,
      message_key: 'form_message',
      component: this,
      matchPasswordFields: this.state.matchPasswordsMap.get(this.props.path),
      passwordToValidate: this.state.validatePasswordMap.get(this.props.path),
      successMessage: this.getSuccessMessage(),
    };
    this.handleSubmit(args);
   }

  getSuccessMessage = () => {
    return this.state.successMessageMap.get(this.props.path);
  }

  componentWillUnmount = () => {
    clearForms();
  }

  componentDidMount = () => {
    if (this.props.path === RESET_PATH) {
      setStateUserOrRedirectToSignIn(this);
    }
  }

  routeToRegister() {
    route("/register", true);
  }

  render({path},{ form_message, user, name, email, password, new_password, confirm_password }) {

    //DEFAULT TO LOGIN_PATH
    let form_header = "Sign In";
    let name_input = "";
    let email_input =
      <input class={style.formChild} id="email" name="email" type="text" placeholder='email address' 
        value={email} onInput={linkState(this, 'email')}/>;
    let password_input =
      <input class={style.formChild} id="password" name="password" type="password" placeholder='password'
        value={password} onInput={linkState(this, 'password')}/>;
    let new_password_input = "";
    let confirm_password_input = "";
    let submit_button =
    <div>
      <button class={style.formChild}>LOGIN</button>
      <div class={style.strike}>
        <span>OR</span>
      </div>
      <button type="button" className={[style.formChild, style.regBtn].join(' ')}
        onClick={this.routeToRegister}>CREATE AN ACCOUNT</button>
    </div>;
    let link2 = <p class={style.link2}><a href="/forgot-password">forgot password?</a></p>;

    if(path === REGISTER_PATH){
      form_header = "Register";
      name_input = 
        <input class={style.formChild} name="name" type="text" placeholder="firstname lastname"
          value={name} onInput={linkState(this, 'name')} required/>;
      confirm_password_input = 
        <input class={style.formChild} name="confirm_password" type="password" placeholder="confirm password"
          value={confirm_password} onInput={linkState(this, 'confirm_password')} required/>;
      submit_button = <button class={style.formChild}>SUBMIT</button>;
      link2 = "";
    }
    
    if(path === RESET_PATH){
      form_header = "Reset Password";
      name_input =
        <div>
          <p>To change user info:</p>
          <input class={style.formChild} name="name" type="text" placeholder="Enter new name"
            value={name} onInput={linkState(this, 'name')}/>
          <input class={style.formChild} id="email" name="email" type="email" placeholder='Enter new email address' 
            value={email} onInput={linkState(this, 'email')}/>
      </div>;
      email_input = "";
      password_input =
        <div>
          <p>To change password:</p>
          <input class={style.formChild} id="password" name="password" type="password" placeholder="Enter current password"
            value={password} onInput={linkState(this, 'password')}/>
          <input class={style.formChild} name="new_password" type="password" placeholder="Enter new password"
            value={new_password} onInput={linkState(this, 'new_password')}/>
          <input class={style.formChild} name="confirm_password" type="password" placeholder="Confirm new password"
            value={confirm_password} onInput={linkState(this, 'confirm_password')}/>
        </div>;
      submit_button = <button class={style.formChild}>Update</button>;
      link2 = "";
    }
      return (
        <div class={style.inherit}>
          <img class={style.logo} src='../../assets/icons/leaflet/SVG/darkLogo.svg' alt='Navi logo' />
          <div>{form_message}</div>
          <div>
            <form class={style.form} onSubmit={this.doSubmit}>
              {name_input}
              {email_input}
              {password_input}
              {new_password_input}
              {confirm_password_input}
              {submit_button}
            </form>
          </div>
          {link2}
        </div>
      );
    }
}
