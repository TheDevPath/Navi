import { h , Component, cloneElement } from 'preact';
import style from './style';
import axios from 'axios';
import {API_SERVER} from '../../../config';
import { route } from 'preact-router';
const OK_STATUS = 'OK';

export default class Search extends Component {
  constructor(props) {
    super(props);
    
    this.state = {
      value: '',
      predictions: [],
      placeIDs: [],
      descSubfields: [],
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  /**
   * Handle autocomplete processing for search query value
   * @param {object} event 
   */
  handleChange(event) {
    this.setState({value: event.target.value});
    // process autocomplete request and update list
    axios.post(`${API_SERVER}/search/autocomplete`, {
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

  /**
   * Handle processing of seqch query submission
   * @param {object} event 
   */
  handleSubmit(event) {
    event.preventDefault();
    axios.post(`${API_SERVER}/search/textsearch`, {
      input: this.state.value,
      lat: this.props.position.lat,
      lng: this.props.position.lng,
      }).then((response) => { 
        if(response.data.status == OK_STATUS)
        {
          const [searchResult] = response.data.results;
          
          if (this.props.url === '/maps'){
            this.props.onResultClicked(searchResult);
          } else {
            this.props.setSearchResult(searchResult);
            route('/maps', true);
          }
        }          
        else
          alert(response.data.status);      
      });
      
  }

  render() {
    // pass props to children components
    const childWithProps = this.props.children.map((child) => {
      return cloneElement(child, {
        predictions: this.state.predictions,
        descSubfields: this.state.descSubfields,
        onClicked: this.props.onResultClicked
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
