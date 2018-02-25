import {h, Component} from 'preact';
import style from './style';
import {handleRegisterSubmit, clearForms} from "../../js/utilities";

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
      <div>
        <div id="message_area"/>
        <div class={style['register-form']}>
          <h1>Join</h1>
          <form onSubmit={this.handleRegisterSubmit}>
            <div>Name: <input name="name" type="text" value=""/></div>
            <div>Email: <input name="email" type="text" value=""/></div>
            <div>Password: <input name="password" type="password" value=""/></div>
            <div>Confirm Password: <input name="confirm_password" type="password" value=""/></div>
            <div>
              <button>Join!</button>
            </div>
            <p><a href="/signin">sign in</a></p>
            <p><a href="/forgot-password">forgot password?</a></p>
          </form>
        </div>
      </div>
    );
  }
}
