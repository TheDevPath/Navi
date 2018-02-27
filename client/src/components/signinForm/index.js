import {h, Component} from 'preact';
import style from './style.css';
import {handleSigninSubmit, clearForms} from "../../js/utilities";

export default class SigninForm extends Component {
  constructor() {
    super();
    this.handleSigninSubmit = handleSigninSubmit.bind(this);
  }

  componentDidMount() {
    clearForms();
  }

  render() {
    return (
      <div>
        <div id="message_area"/>
        <div class={style.form}>
          <form onSubmit={this.handleSigninSubmit}>
            <div>Email: <input id="email" name="email" type="text"/></div>
            <div>Password: <input id="password" name="password" type="password"/></div>
            <div>
              <button>Login!</button>
            </div>
            <p><a href="/register">register</a></p>
            <p><a href="/forgot-password">forgot password?</a></p>
          </form>
        </div>
      </div>
    );
  }
}
