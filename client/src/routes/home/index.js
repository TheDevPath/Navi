import { h, Component } from 'preact';
import style from './style';
import MapContainer from '../../components/GoogleMap';

export default class Home extends Component {
	render() {
		return (
			<div class={style.home}>
			<MapContainer />
			</div>
		);
	}
}
