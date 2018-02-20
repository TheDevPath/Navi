import {h, Component} from 'preact';
import style from './style';

import Menu from 'preact-material-components/Menu';
import Button from 'preact-material-components/Button';

import 'preact-material-components/List/style.css';
import 'preact-material-components/Menu/style.css';
import 'preact-material-components/Button/style.css';

import Logo from '../Logo';

export default class Nav extends Component {
	render(){
		return (
			<div class={style.nav}>
				<Menu.Anchor>
					<Button
						onClick={e => {
							this.menu.MDComponent.open = true;
						}}
					>
						&#9776;
					</Button>
					<Menu
						ref={menu => {
							this.menu = menu;
						}}
					>
						<a href="/"><Menu.Item>Home</Menu.Item></a>
						<a href="/maps"><Menu.Item>Maps</Menu.Item></a>
						<a href="/directions"><Menu.Item>Directions</Menu.Item></a>
						<a href="/places"><Menu.Item>Places</Menu.Item></a>						
						<a href="/profile"><Menu.Item>Profile</Menu.Item></a>
						<a href="/signin"><Menu.Item>Sign in</Menu.Item></a>
					</Menu>
				</Menu.Anchor>
			</div>
		);
	}
}