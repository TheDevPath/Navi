import {h, Component} from 'preact';
import {Link} from 'preact-router/match';
import PropTypes from 'prop-types';
import style from './style';

import ResetPasswordForm from "../ResetPasswordForm";

export default class RegisterForm extends Component {
    render() {
        return (<div class={style['register-form']}>
            <div>
                <h1>Join</h1>
                <form action="/">
                    <span>First name:</span>
                    <input type="text" name="fname"/><br/>
                    <span>Last name: </span><input type="text" name="lname"/><br/>

                    <span>Email: </span><input type="text" name="email"/><br/>
                    <br/>
                    <span>New password: </span><input type="password" name="password"/><br/>
                    <span>Confirm password: </span><input type="password" name="confirm_password"/><br/>

                    <input type="submit" value="Submit"/>
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
