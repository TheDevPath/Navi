import { h, Component } from 'preact';
import style from './style';
import RegisterForm from '../../components/RegisterForm';

export default class Register extends Component {
	render() {
		return (
			<div class={style.main}>
				<div class={style.register}>
					<RegisterForm/>
				</div>
			</div>
		);
	}
}
