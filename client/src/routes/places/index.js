import { h, Component } from 'preact';
import style from './style';

const { GOOGLE_API_KEY } = require('../../../config');

export default class Places extends Component {
  render() {
    return (
      <div class={style.places}>
        <h1>Places</h1>
        <p>This is the Places Route.</p>
      </div>
    );
  }
}