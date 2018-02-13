import { h, Component } from 'preact';
import style from './style';
import PropTypes from 'prop-types';
import SigninForm from '../../components/signinForm';
import ForgotPasswordForm from '../../components/ForgotPasswordForm';
import ResetPasswordForm from '../../components/ResetPasswordForm';


export default class Signin extends Component {

	render() {
		let renderedForm;
		if(this.props.path == '/forgot-password') {
			renderedForm = (
				<ForgotPasswordForm/>
			)
		}else if(this.props.path == '/reset-password'){
			renderedForm = (
				<ResetPasswordForm />
			)
		}else{
			renderedForm = (
				<SigninForm />
			)
		}
		return (
			<div class={style.main}>
				<div class={style.signin}>
					{renderedForm}
				</div>
			</div>
		);
	}
}

Signin.propTypes = {
	appName: PropTypes.string,
}
