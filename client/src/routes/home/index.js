import { h, Component } from 'preact';
import style from './style';

export default class Home extends Component {
	render() {
		return (
			<div class={style.home}>
				<p>What Can navi find for you today!</p>
				<a href="/maps"><button>Map</button></a>				
				<a href="/profile"><button>Profile</button></a>
			</div>
		);
	}
}
