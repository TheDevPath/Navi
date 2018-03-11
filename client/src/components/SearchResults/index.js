import { h, Component } from 'preact';
import style from './style.css';
import axios from 'axios';
import {API_SERVER} from '../../../config';
const OK_STATUS = 'OK'

export default class UnorderedList extends Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }

  /**
   * On search prediction selection , fetch the geolocation details and 
   * update the map with a marker on that location
   *
   * @param {*} prediction 
   */
  handleClick(prediction) {
    event.preventDefault();
    axios.post(`${API_SERVER}/map/geocode`, {
      input: prediction     
      }).then((response) => { 
        console.log(response);
        if(response.data.status == OK_STATUS)
        {
          const [searchResult] = response.data.results;
          this.props.onClicked(searchResult);
        }          
        else
          alert(response.data.status);
      
      });
    }


  render() {
    return (
      <ul>
        {this.props.predictions.map((prediction, index) => {
          return <div key={index} onClick={() => this.handleClick(prediction)} >{prediction}</div>
        })}
      </ul>
    )
  }
}
