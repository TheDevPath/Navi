import { h, Component } from 'preact';
import style from './style';
import PropTypes from 'prop-types';
import SigninForm from '../../components/signinForm';


export default class Signin extends Component {

	render() {
		return (
			<div class={style.main}>
				<div class={style.signin}>
					<div class={style.logo}>
						<img src='../assets/icons/google_maps_2014.png'/>
						<h3>Welcome to {this.props.appName}, login</h3>
					</div>
					<SigninForm />
				</div>
			</div>
		);
	}
}

Signin.propTypes = {
	appName: PropTypes.string,
}
