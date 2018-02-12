import { h, Component } from 'preact';
import { Link } from 'preact-router/match';
import style from './style';
import Nav from '../Nav';

export default class Header extends Component {
	render() {
		return (
			<Nav/>
		);
	}
}
