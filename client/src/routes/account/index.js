import { h, Component } from 'preact';
import style from './style';
import PropTypes from 'prop-types';
import AccountForm from '../../components/AccountForm';
import ForgotPasswordForm from '../../components/ForgotPasswordForm';
import { BASE_ENDPOINTS } from "../../js/server-requests-utils";



export default class Account extends Component {

	render() {
		let renderedForm;
		if(this.props.path == '/forgot-password') {
			renderedForm = (
				<ForgotPasswordForm/>
			)
    }else if(this.props.path == '/register'){
      renderedForm = (
        <AccountForm path={BASE_ENDPOINTS.userRegister}/>
      )
    }else if(this.props.path == '/reset-password'){
      renderedForm = (
        <AccountForm path={BASE_ENDPOINTS.userReset}/>
      )
		}else{
			renderedForm = (
        <AccountForm path={BASE_ENDPOINTS.userLogin}/>
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
