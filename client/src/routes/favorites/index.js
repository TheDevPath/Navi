import { h, Component } from 'preact';
import style from './css/style.css';

export default class Favorites extends Component {
  /* dummy data */
    state = {
      favorites: [
        {name: 'Paris'},
        {name: 'Tokyo'}
      ]
    };
    render({ }, { favorites }) {
        return (
          <div>
          Why
            <h4 class={style.card__header}>Favorites</h4>
            <ul>
              { favorites.map((favorite, i) => (
                  <li key={i} class={style.card__item}>
                    {favorite.name}
                  </li>
              ))}
            </ul>
          </div>
        );
    }
}
