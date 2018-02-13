import { h, Component } from 'preact';
import style from './style';


export default class Home extends Component {
	render() {
		return (
			<div class={style.home}>
				<p>Welcome to Map-e</p>
			</div>
		);
	}
}
