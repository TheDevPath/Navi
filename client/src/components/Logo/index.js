import {h, Component} from 'preact';
import style from './style';

const { APP_NAME } = require('../../../config');

export default class Logo extends Component {
	render(){
		return (
			<div class={style.logo}>
				<img src='../assets/icons/favicon-32x32.png'/>
				<h3>Welcome to {APP_NAME}, login</h3>
			</div>
		);
	}
}

