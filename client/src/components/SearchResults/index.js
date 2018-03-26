import { h, Component } from 'preact';
import style from './style.css';
import { makeRequest, BASE_ENDPOINTS } from '../../js/server-requests-utils';
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
  handleClick(event, prediction) {
    event.preventDefault();
    makeRequest('POST', BASE_ENDPOINTS.geocode, '', {
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
          return <div key={index} onClick={(e) => this.handleClick(e, prediction)} >
              <p class={style.mainText}> {this.props.descSubfields[index].mainText} </p>
              <p class={style.secondaryText}> {this.props.descSubfields[index].secondaryText} </p>
            </div>
        })}
      </ul>
    )
  }
}
