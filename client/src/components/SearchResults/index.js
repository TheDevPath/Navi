import { h, Component } from 'preact';
import style from './style.css';

export default class UnorderedList extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <ul>
        {this.props.predictions.map((prediction, index) => {
          return <div key={index}>{prediction}</div>
        })}
      </ul>
    )
  }
}
