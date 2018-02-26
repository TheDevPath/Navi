import { h , Component, cloneElement } from 'preact';
import style from './style';
import axios from 'axios';
import {API_SERVER} from '../../../config';

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
    alert('A query was submitted: ', this.state.value);
    event.preventDefault();
  }

  render() {
    // pass props to children components
    const childWithProps = this.props.children.map((child) => {
      return cloneElement(child, {
        predictions: this.state.predictions,
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
