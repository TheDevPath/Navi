import {h, Component} from 'preact';
import style from './style';

const { APP_NAME } = require('../../../config');

export default class Logo extends Component {
	render(){
		return (
			<div class={style.logo}>
				<img src='../assets/logos/navi_logo.png'/>
				<h3>Welcome!</h3>
			</div>
		);
	}
}

