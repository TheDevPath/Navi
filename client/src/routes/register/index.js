import { h, Component } from 'preact';
import style from './style';
import PropTypes from 'prop-types';
import RegisterForm from '../../components/registerForm';


export default class Register extends Component {

    render() {
        return (
            <div class={style.main}>
                <div class={style.register}>

                    <RegisterForm />
                </div>
            </div>
        );
    }
}

Register.propTypes = {
	appName: PropTypes.string,
}
