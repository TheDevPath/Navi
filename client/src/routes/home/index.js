import { h, Component } from 'preact';
import style from './style';
import { route } from 'preact-router';
import Search from '../../components/Search';
import SearchResults from '../../components/SearchResults';
import { BASE_ENDPOINTS, makeRequest } from '../../js/server-requests-utils';

export default class Home extends Component {
	constructor(props) {
		super(props);

		this.state = {
			userPosition: null,
		}

		this.routeToMap = this.routeToMap.bind(this);
	}

	componentDidMount() {
		makeRequest('GET', BASE_ENDPOINTS.geolocation).then((response) => {
			console.log('Home.geolocation(): ', response);
			this.setState({ userPosition: response.data.location });
			this.props.setUserPosition(this.state.userPosition);
		}).catch((err) => {
			console.log('Home.geolocation(): ', err);
		});
	}

	routeToMap() {
		route('/maps', true);
	}

	render() {
		return (
			<div class={style.home}>
				<div class={style.welcome}>
					<h2>WELCOME TO</h2>
					<img src='../../assets/icons/leaflet/SVG/darkLogo.svg' />
				</div>
				<div class={style.search}>
					<p>Where can we take you today?</p>
					<Search position={this.state.userPosition} routeUrl={this.props.url}
						updateSearchResult={this.props.updateSearchResult}>
						<SearchResults />
					</Search>
				</div>
				<div class={style.myLocation}>
				<a href="/maps" class={style.mapLink}>where am I?</a>
				<img src='../../assets/icons/leaflet/SVG/FindLocationPin.svg'
					class={style.pin} onClick={this.routeToMap}/>	
				</div>
			</div>
		);
	}
}
