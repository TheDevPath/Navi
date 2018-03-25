import { h, Component } from 'preact';
import style from './style';
import { route } from 'preact-router';
import Search from '../../components/Search';
import SearchResults from '../../components/SearchResults';

export default class Home extends Component {
	constructor(props) {
		super(props);

		this.state = {
			userPosition: null,
		}

		this.routeToMap = this.routeToMap.bind(this);
	}

	componentDidMount() {
		// get user location if not already available
		if (!this.state.userPosition) {
			console.log('Home: getting user location');
			navigator.geolocation.getCurrentPosition(
				(position) => {
					this.setState({
						userPosition: {
							lat: position.coords.latitude,
							lng: position.coords.longitude
						}
					});
					console.log('\tuser position found: ', this.state.userPosition);
				},
				(err) => {
					alert(err.message);
				},
				{
					enableHighAccuracy: false,
					timeout: 60000,
					maximumAge: Infinity,
				}
			);
		} else {
			console.log('Home: already have user location: ', this.state.userPosition);
		}
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
