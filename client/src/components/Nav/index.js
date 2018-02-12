import {h, Component} from 'preact';
import {Menu, Button} from 'preact-material-components';
import 'preact-material-components/List/style.css';
import 'preact-material-components/Menu/style.css';
import 'preact-material-components/Button/style.css';

export default class Nav extends Component {
	render(){
		return (
			<div>
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
						<a href="/profile"><Menu.Item>Profile</Menu.Item></a>
						<a href="/directions"><Menu.Item>Directions</Menu.Item></a>
						<a href="/pins"><Menu.Item>Pins</Menu.Item></a>
						<a href="/maps"><Menu.Item>Maps</Menu.Item></a>
						<a href="/signin"><Menu.Item>Sign in</Menu.Item></a>
					</Menu>
				</Menu.Anchor>
			</div>
		);
	}
}