import { h, Component, render } from 'preact';
import style from './style.css';
import { validateAccountForm, clearForms } from "../../js/validate-account-form";
import { LOGIN_PATH, REGISTER_PATH, RESET_PATH } from '../../../config';
import linkState from "linkstate";
import { route } from 'preact-router';

export default class AccountForm extends Component {
  constructor() {
    super();

    this.routeToRegister = this.routeToRegister.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit = (event) => {
    event.preventDefault();

    const formData = {
      name: this.state.name,
      email: this.state.email,
      password: this.state.password,
      new_password: this.state.new_password,
      confirm_password: this.state.confirm_password,
    }

    const args = {
      path: this.props.path,
      formData,
    }

    validateAccountForm(args).then((response) => {
      console.log('validateAccountForm(): ', response);
      if (response.status) {
        if (this.props.path === RESET_PATH) {
          alert(response.message);
        } else {  // redirect to /profile with success for login/registration
          route(`/profile`, true);
        }
      } else {
        // TODO - alert failure to process
        alert(response.message);
      }
      }).catch(function (error) {
        // TODO - standardize API error output so we can handle cleanly
        // on frontend
        alert(error);
      });
   };

  componentWillUnmount = () => {
    clearForms();
  }

  routeToRegister() {
    route("/register", true);
  }

  render({ path },{ name, email, password, new_password, confirm_password }) {

    //DEFAULT TO LOGIN_PATH
    let display =
      <div class={style.display}>
        <form class={style.form} onSubmit={this.handleSubmit}>
          <input class={style.formChild} id="email" name="email" type="email" placeholder='email address' 
            value={email} onInput={linkState(this, 'email')} required/>
          <input class={style.formChild} id="password" name="password" type="password" placeholder='password'
            value={password} onInput={linkState(this, 'password')} required/>
          <div>
            <button class={style.formChild}>LOGIN</button>
          </div>
        </form>
        <div class={style.form}>
          <div class={style.strike}>
            <span>OR</span>
          </div>
          <button type="button" className={[style.formChild, style.regBtn].join(' ')}
            onClick={this.routeToRegister}>CREATE AN ACCOUNT</button>
        </div>
        <p class={style.link2}><a href="/forgot-password">forgot password?</a></p>
      </div>;

    if(path === REGISTER_PATH){
      display =
      <div class={style.display}>
        <form class={style.form} onSubmit={this.handleSubmit}>
          <input class={style.formChild} name="name" type="text" placeholder="firstname lastname"
            value={name} onInput={linkState(this, 'name')} required/>
          <input class={style.formChild} id="email" name="email" type="email" placeholder='email address' 
            value={email} onInput={linkState(this, 'email')} required/>
          <input class={style.formChild} id="password" name="password" type="password" placeholder='password'
            value={password} onInput={linkState(this, 'password')} required/>
          <input class={style.formChild} name="confirm_password" type="password" placeholder="confirm password"
            value={confirm_password} onInput={linkState(this, 'confirm_password')} required/>
          <button class={style.formChild}>SUBMIT</button>
        </form>
      </div>;
    }
    
    if(path === RESET_PATH){
      display =
      <div>
        <form class={style.form} onSubmit={this.handleSubmit}>
          <p>To change user info:</p>
          <input class={style.formChildReset} name="name" type="text" placeholder="Enter new name"
            value={name} onInput={linkState(this, 'name')}/>
          <input class={style.formChildReset} id="email" name="email" type="email" placeholder='Enter new email address' 
            value={email} onInput={linkState(this, 'email')}/>
          <button class={style.formChildReset}>Update Info</button>
        </form>
        <form class={style.form} onSubmit={this.handleSubmit}>
          <p>To change password:</p>
          <input class={style.formChildReset} id="password" name="password" type="password" placeholder="Enter current password"
            value={password} onInput={linkState(this, 'password')} required/>
          <input class={style.formChildReset} name="new_password" type="password" placeholder="Enter new password"
            value={new_password} onInput={linkState(this, 'new_password')} required/>
          <input class={style.formChildReset} name="confirm_password" type="password" placeholder="Confirm new password"
            value={confirm_password} onInput={linkState(this, 'confirm_password')} required/>
          <button class={style.formChildReset}>Reset Password</button>
        </form>
      </div>;
    }
      return (
        <div class={style.inherit}>
          <img class={style.logo} src='../../assets/icons/leaflet/SVG/darkLogo.svg' alt='Navi logo' />
          {display}
        </div>
      );
    }
}
