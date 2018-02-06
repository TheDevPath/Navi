import { h, Component } from 'preact';

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
            <h4>Favorites</h4>
            <ul>
              { favorites.map((favorite, i) => (
                  <li key={i}>
                    {favorite.name}
                  </li>
              ))}
            </ul>
          </div>
        );
    }
}
