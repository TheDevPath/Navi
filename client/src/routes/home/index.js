import { h, Component } from 'preact';
import style from './style';
import SearchAutocomplete from '../../components/search';

export default class Home extends Component {
	render() {
		return (
			<div class={style.home}>
				<SearchAutocomplete />
			</div>
		);
	}
}
