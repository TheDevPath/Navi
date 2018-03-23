// node_module imports
import { h, Component } from 'preact';
import { route } from 'preact-router';
import { connect } from 'preact-redux';

// app module imports
import style from './style';
import Search from '../../components/Search';
import SearchResults from '../../components/SearchResults';
import { updateUserPosition } from '../../js/store/actions';

// react-redux functions
const mapStateToProps = state => {
	return {
		userPosition: state.userPosition,
	};
};

const mapDispatchToProps = dispatch => {
	return {
		updateUserPosition: userPosition => dispatch(updateUserPosition(userPosition)),
	};
};

class ConnectedHome extends Component {
	constructor() {
		super();

		this.routeToMap = this.routeToMap.bind(this);
	}

	componentDidMount() {
		// get user location if not already available
		if (!this.props.userPosition) {
			console.log('Home: getting user location');
			navigator.geolocation.getCurrentPosition(
				(position) => {
					const userPosition = {
						lat: position.coords.latitude,
						lng: position.coords.longitude
					}
					this.props.updateUserPosition(userPosition);
					console.log('\tuser position found: ', userPosition);
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
			console.log('Home: already have user location: ', this.props.userPosition);
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
					<Search routeUrl={this.props.url}>
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

const Home = connect(mapStateToProps, mapDispatchToProps) (ConnectedHome);

export default Home;
