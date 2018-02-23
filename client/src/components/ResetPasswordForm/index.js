import {h, Component} from 'preact';
import {Link} from 'preact-router/match';
import PropTypes from 'prop-types';
import style from './style';

export default class ResetPasswordForm extends Component {
    render() {
        return (<div class={style['reset-password-form']}>
            <h1>We sent you a temporary password. Please change it below.</h1>
            <form action="/">
                <span>Email: </span><input type="text" name="email"/><br/>
                <span>New Password: </span><input type="text" name="password"/><br/>
                <span>Confirm Password: </span><input type="text" name="confirm_password"/><br/>

                <input type="submit" value="Reset Account Password"/>
            </form>
            <a class={style.active} href="/register">register</a>
            <br/>
            <a class={style.active} href="/signin">sign in</a>
        </div>);
    }
}

ResetPasswordForm.propTypes = {
    appName: PropTypes.string
}
