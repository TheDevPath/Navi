import { h , Component, cloneElement } from 'preact';
import style from './style';
import axios from 'axios';
import {API_SERVER} from '../../../config';
const OK_Status = 'OK';

export default class Search extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: '',
      predictions: [],
      placeIDs: [],
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.onPlaceFound = this.onPlaceFound.bind(this);
  }

  handleChange(event) {
    this.setState({value: event.target.value});
    // process autocomplete request and update list
    axios.post(`${API_SERVER}/search/autocomplete`, {
      input: this.state.value,
    }).then((response) => {
      const status = response.data.status;
      const predictions = response.data.predictions;
      const placeIds = response.data.placeIds;
      this.setState({
        predictions,
        placeIds,
      });
    });
  }

  handleSubmit(event) {
    // TODO - hookup to map instance and add marker for given location
    event.preventDefault();
    axios.post(`${API_SERVER}/search/textsearch`, {
      input: this.state.value,
      lat: this.props.position.lat,
      lng: this.props.position.lng,
      }).then((response) => { 
        if(response.data.status == OK_Status)
        {
          let [searchResult] = response.data.results;
          this.onPlaceFound(searchResult);
        }          
        else
          alert(response.data.status);
      
      });
      
  }

  /**
   * On search input query completion, add a marker to the map at the search result.
   *
   * @param {*} placeDetail 
   */
  onPlaceFound(placeDetail) {
    this.props.map.setZoom(16);
    const location = placeDetail.geometry.location;
    const userMarker = L.marker(location).addTo(this.props.map)
    .bindPopup(`<b>${placeDetail.name} </b>${placeDetail.formatted_address}`);
    this.props.map.setView(location, 16);
    //ToDO : add to state , this location should be separate to user location
    
    }

    handleSelection(data,event) {
      // TODO - hookup to map instance and add marker for given location
      //      - get geolocation details based on prediction
      console.log(data);
      
      }

  render() {
    // pass props to children components
    const childWithProps = this.props.children.map((child) => {
      return cloneElement(child, {
        predictions: this.state.predictions,
        onClicked: this.handleSelection
      });
    });
    
    return (
      <form class={style.form} onSubmit={this.handleSubmit}>
        <input type='search' placeholder='Search for a place or address' class={style.search}
          onInput={this.handleChange}/>
        {childWithProps}
      </form>
    );
  }
}
