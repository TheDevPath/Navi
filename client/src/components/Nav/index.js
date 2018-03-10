import {h, Component} from 'preact';
import style from './style.css';

export default class Nav extends Component {

  componentDidMount() {
  }

  render() {
    return (
      <div class={style.nav}>
        <img src='../../assets/icons/leaflet/SVG/NaviHomeIcon.svg' alt='Home screen icon' class={style.homeIcon}/>
        <img src='../../assets/icons/leaflet/SVG/ProfileIcon.svg' alt='Profile page icon' class={style.profileIcon}/>
      </div>
    );
  }
}