import { h , Component, cloneElement } from 'preact';
import style from './style';
import axios from 'axios';
import {API_SERVER} from '../../../config';
const OK_STATUS = 'OK';

export default class Search extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: '',
      predictions: [],
      placeIDs: [],
      marker: null,
      position: {},
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleSelectedPlace = this.handleSelectedPlace.bind(this);
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
        if(response.data.status == OK_STATUS)
        {
          const [searchResult] = response.data.results;
          this.handleSelectedPlace(searchResult);
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
  
  handleSelectedPlace(placeDetail) {
    this.props.map.setZoom(16);
    console.log(placeDetail)
    if (this.state.marker) 
      this.props.map.removeLayer(this.state.marker); 
    this.setState({
      marker : L.marker(placeDetail.geometry.location).addTo(this.props.map),
      position: placeDetail.geometry.location
    })
    
    //TO DO: Customize the marker popup
    this.state.marker.bindPopup(`<b>${placeDetail.name || ''} </b>${placeDetail.formatted_address}`)

    this.props.map.setView(this.state.position, 16);
    
    }

    handleMarkerPopupContent

  render() {
    // pass props to children components
    const childWithProps = this.props.children.map((child) => {
      return cloneElement(child, {
        predictions: this.state.predictions,
        onClicked: this.handleSelectedPlace
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
