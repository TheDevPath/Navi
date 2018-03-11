import { h, Component } from 'preact';
import style from './style';
import PropTypes from 'prop-types';
import AccountForm from '../../components/AccountForm';
import ForgotPasswordForm from '../../components/ForgotPasswordForm';
import { LOGIN_PATH, RESET_PATH, REGISTER_PATH } from "../../../config";


export default class Account extends Component {

	render() {
		let renderedForm;
		if(this.props.path == '/forgot-password') {
			renderedForm = (
				<ForgotPasswordForm/>
			)
    }else if(this.props.path == '/register'){
      renderedForm = (
        <AccountForm path={REGISTER_PATH}/>
      )
    }else if(this.props.path == '/reset-password'){
      renderedForm = (
        <AccountForm path={RESET_PATH}/>
      )
		}else{
			renderedForm = (
        <AccountForm path={LOGIN_PATH}/>
			)
		}

		const styles = {
			height: this.props.paneHeight
		}

		return (
			<div class={style.main} style={styles}>
				{renderedForm}
			</div>
		);
	}
}

Account.propTypes = {
	appName: PropTypes.string,
}
