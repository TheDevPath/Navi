import { h, Component, render } from 'preact';
import style from './style.css';
import { handleSubmit, clearForms, setStateUserOrRedirectToSignIn } from "../../js/utilities";
import { LOGIN_PATH, REGISTER_PATH, RESET_PATH } from '../../../config';
import linkState from "linkstate";

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

  render({path},{ form_message, user, name, email, password, new_password, confirm_password }) {

    //DEFAULT TO LOGIN_PATH
    let form_header = "Sign In";
    let name_input = "";
    let email_input = <div>Email: <input id="email" name="email" type="text" value={email} onInput={linkState(this, 'email')}/></div>;
    let password_input =  <div>Password: <input id="password" name="password" type="password" value={password} onInput={linkState(this, 'password')}/></div>;
    let new_password_input = "";
    let confirm_password_input = "";
    let submit_button = <div><button>Login!</button></div>;
    let link1 = <p><a href="/register">register</a></p>;
    let link2 = "";
    // let link2 = <p><a href="/forgot-password">forgot password?</a></p>;

    if(path === REGISTER_PATH){
      form_header = "Register";
      name_input = <div>Name: <input name="name" type="text" value={name} onInput={linkState(this, 'name')}/></div>;
      confirm_password_input = <div>Confirm password: <input name="confirm_password" type="password" value={confirm_password} onInput={linkState(this, 'confirm_password')}/></div>;
      submit_button = <div><button>Join!</button></div>;
      link1 = <p><a href="/signin">Sign in</a></p>;
    }
    if(path === RESET_PATH){
      form_header = "Reset Password";
      email_input = <div>Email: <b>{user ? user.email : ''}</b><input name="email" type="hidden" value={user ? user.email : ''}/></div>;
      password_input =  <div>Current password: <input id="password" name="password" type="password" value={password} onInput={linkState(this, 'password')}/></div>;
      new_password_input = <div>New password: <input name="new_password" type="password" value={new_password} onInput={linkState(this, 'new_password')}/></div>;
      confirm_password_input = <div>Confirm new password: <input name="confirm_password" type="password" value={confirm_password} onInput={linkState(this, 'confirm_password')}/></div>;
      submit_button = <div><button>Reset!</button></div>;;
      link1 = "";
    }
      return (
        <div>
          <h1>{form_header}</h1>
          <div>{form_message}</div>
          <div class={style.form}>
            <form onSubmit={this.doSubmit}>
              {name_input}
              {email_input}
              {password_input}
              {new_password_input}
              {confirm_password_input}
              {submit_button}
              {link1}
              {link2}
            </form>
          </div>
        </div>
      );
    }
  // }
}
