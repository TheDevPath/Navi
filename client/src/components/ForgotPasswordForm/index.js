import {h, Component} from 'preact';
import {Link} from 'preact-router/match';
import PropTypes from 'prop-types';
import style from './style';

export default class ForgotPasswordForm extends Component {
    render() {
        return (
        <div class={style['forgot-password-form']}>
            <h2>Forgot Your Password?</h2>
            <p>Enter your email address below to reset your password.</p>
            <form action="/" class={style.form}>
                <input type="email" name="email" placeholder="email address"
                  class={style.formChild} required/>
                <button type="button" class={style.formChild}>RESET PASSWORD</button>
            </form>
            <p>Not a member? <a href="/register">Sign up!</a></p>
        </div>);
    }
}

ForgotPasswordForm.propTypes = {
    appName: PropTypes.string
}
