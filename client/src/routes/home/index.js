import { h, Component } from 'preact';
import style from './style';
import { route } from 'preact-router';
import Search from '../../components/Search';
import SearchResults from '../../components/SearchResults';

export default class Home extends Component {
	constructor(props) {
		super(props);

		this.state = {
			busyMessage: 'Loading your location...',
			userPosition: {
				lat: '',
				lng: ''
			},
		}

		this.routeToMap = this.routeToMap.bind(this);
	}

	componentDidMount() {
		if (this.state.userPosition.lat && this.state.userPosition.lng) {
			this._setBusyMessage('');
			return;
		}		

		if ('geolocation' in navigator === false){
			this._setBusyMessage('Could not find your location');
			return;
		}

		const self = this;
		navigator.geolocation.getCurrentPosition(
			(position) => {
				this.setState({
					busyMessage: '',
					userPosition: {
						lat: position.coords.latitude,
						lng: position.coords.longitude
					}
				});
				console.log('\tuser position found: ', this.state.userPosition);
			},
			(err) => {
				if (err.code && err.code === 1)
					self._setBusyMessage('Could not find your location');
				else
					self._setBusyMessage('Error occurred while getting your location');
			},
			{
				enableHighAccuracy: false,
				timeout: 60000,
				maximumAge: Infinity,
			}
		);
	}

	routeToMap() {
		route('/maps', true);
	}

	_setBusyMessage(message) {
		this.setState({ busyMessage: message });
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
					<p>{this.state.busyMessage || ''}</p>
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
