// node_module imports
import { h, Component } from 'preact';
import { route } from 'preact-router';
import { connect } from 'preact-redux';

// app module imports
import style from './style';
import Search from '../../components/Search';
import SearchResults from '../../components/SearchResults';
import { BASE_ENDPOINTS, makeRequest } from '../../js/server-requests-utils';
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
		if (!this.props.userPosition) {
			makeRequest('GET', BASE_ENDPOINTS.geolocation).then((response) => {
				console.log('Home.geolocation(): ', response);
				this.props.updateUserPosition(response.data.location);
			}).catch((err) => {
				console.log('Home.geolocation(): ', err);
			});
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
