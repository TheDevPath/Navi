import { h, Component } from 'preact';
import style from './style.css';

export default class Favorites extends Component {
  /* dummy data */
    state = {
      favorites: [
        {
          city: 'Paris',
          coordinates: '86, 75, -309',
          landmark: 'Eiffel Tower',
          lastVisit: '10/31/1866',
        },
        {
          city: 'Seattle',
          coordinates: '86, 75, -309',
          landmark: 'Top Pot Donuts',
          lastVisit: '10/31/1866',
        }
      ]
    };
    render({ }, { favorites }) {
        return (
          <div class={style.card}>
            <h4 class={style.card__header}>
              Favorites
            </h4>
            <ul class={style.card__list}>
              { favorites.map((favorite, i) => (
                  <li key={i} class={style.card__item}>
                    <span class={style.card__itemHeader}>
                      {favorite.city}
                    </span>
                    <ul class={style.card__itemDetails}>
                      <li>
                        <p>Coordinates:</p>
                        {favorite.coordinates}
                      </li>
                      <li>
                        <p>Landmark:</p>
                        {favorite.landmark}
                      </li>
                      <li>
                        <p>Last Visit:</p>
                        {favorite.lastVisit}
                      </li>
                    </ul>
                    {/*  End favorite details list  */}
                  </li>
              ))}
            </ul>
            {/*  End favorites list  */}
          </div>
        );
    }
}
