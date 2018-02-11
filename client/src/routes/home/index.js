import { h, Component } from 'preact';
import style from './style';

export default class Home extends Component {
	render() {
		return (
			<div class={style.home}>
				<h1>Sign in or create </h1>
				<p>This is the Home component.</p>
			</div>
		);
	}
}
