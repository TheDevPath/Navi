import { h, Component } from 'preact';
import { Link } from 'preact-router/match';
import style from './style';
import MenuPage from '../MenuPage';

export default class Header extends Component {
	render() {
		return (
			<MenuPage/>
		);
	}
}
