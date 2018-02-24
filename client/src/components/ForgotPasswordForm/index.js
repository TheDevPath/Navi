import {h, Component} from 'preact';
import {Link} from 'preact-router/match';
import PropTypes from 'prop-types';
import style from './style';

export default class ForgotPasswordForm extends Component {
    render() {
        return (<div class={style['forgot-password-form']}>

            <h1>We will send you a temporary password, enter your email address</h1>
            <form action="/">
                <span>Email: </span><input type="text" name="email"/><br/>
                <br/>
                <input type="submit" value="Submit"/>
            </form>
            <a class={style.active} href="/register">register</a>
            <br/>
            <a class={style.active} href="/signin">sign in</a>
        </div>);
    }
}

ForgotPasswordForm.propTypes = {
    appName: PropTypes.string
}
