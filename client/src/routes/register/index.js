import { h, Component } from 'preact';
import style from './style';
import PropTypes from 'prop-types';
import RegisterForm from '../../components/registerForm';


export default class Register extends Component {

    render() {
        return (
            <div class={style.main}>
                <div class={style.register}>
                    <div class={style.logo}>
                        <img src='../assets/icons/google_maps_2014.png'/>
                        <h3>Join {this.props.appName}</h3>
                    </div>
                    <RegisterForm />
                </div>
            </div>
        );
    }
}

Register.propTypes = {
	appName: PropTypes.string,
}
