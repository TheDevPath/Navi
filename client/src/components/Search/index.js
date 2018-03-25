import { h , Component, cloneElement } from 'preact';
import style from './style';
import { route } from 'preact-router';
import { makeRequest, BASE_ENDPOINTS } from '../../js/server-requests-utils';
const OK_STATUS = 'OK';

export default class Search extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: '',
      predictions: [],
      placeIDs: [],
      descSubfields: [],
      marker: null
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleSelectedPlace = this.handleSelectedPlace.bind(this);
  }

  handleChange(event) {
    this.setState({value: event.target.value});
    // process autocomplete request and update list
    makeRequest('POST', BASE_ENDPOINTS.autocomplete, '', {
      input: this.state.value,      
      lat: this.props.position.lat,
      lng: this.props.position.lng,
    }).then((response) => {
      const status = response.data.status;
      const predictions = response.data.predictions;
      const placeIds = response.data.placeIds;
      const descSubfields = response.data.descSubfields;

      this.setState({
        predictions,
        placeIds,
        descSubfields,
      });
    });
  }

  handleSubmit(event) {
    event.preventDefault();
    makeRequest('POST', BASE_ENDPOINTS.textsearch, '', {
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
    if (this.props.routeUrl === '/maps') {
      this.props.addMarker(placeDetail.geometry.location, placeDetail.place_id);
      
      //TO DO: Customize the marker popup
      // this.state.marker.bindPopup(`<b>${placeDetail.name || ''} </b>${placeDetail.formatted_address}`)
    } else {
      this.props.updateSearchResult(placeDetail);
      route('/maps', true);
    }
  }

  render() {
    // pass props to children components
    const childWithProps = this.props.children.map((child) => {
      return cloneElement(child, {
        predictions: this.state.predictions,
        descSubfields: this.state.descSubfields,
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
