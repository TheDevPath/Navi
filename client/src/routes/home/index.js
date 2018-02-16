import { h, Component } from 'preact';
import style from './style';
// import MapContainer from '../../components/GoogleMap';
import MapContainer from '../../components/LeafletOsmMap';  // use leaflet.js for now
import SearchAutocomplete from '../../components/search';


export default class Home extends Component {
	render() {
		return (
			<div class={style.home}>
				<p>What Can Map-e find for you today!</p>
				<SearchAutocomplete style={{width: '80%'}}
    												onPlaceSelected={(place) => {
      											console.log(place);
    			}}
				/><button type="submit">Search</button>
				<a href="/maps"><button>Map</button></a>
				<a href="/directions"><button>Directions</button></a>
				<a href="/pins"><button>Places</button></a>
				<a href="/profile"><button>Profile</button></a>
			</div>
		);
	}
}
