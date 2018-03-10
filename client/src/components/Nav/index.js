import {h, Component} from 'preact';
import { route } from 'preact-router';
import style from './style.css';

export default class Nav extends Component {
  constructor(props) {
    super(props);

    this.routeToHome = this.routeToHome.bind(this);
    this.routeToProfile = this.routeToProfile.bind(this);
  } 

  routeToHome() {
    route('/', true);
  };

  routeToProfile() {
    route('/profile', true);
  };

  render() {
    return (
      <div class={style.nav}>
        <img src='../../assets/icons/leaflet/SVG/NaviHomeIcon.svg' alt='Home screen icon'
          class={style.homeIcon} onClick={this.routeToHome}/>
        <img src='../../assets/icons/leaflet/SVG/ProfileIcon.svg' alt='Profile page icon'
          class={style.profileIcon} onClick={this.routeToProfile}/>
      </div>
    );
  }
}