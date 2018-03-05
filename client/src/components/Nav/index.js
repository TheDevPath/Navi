import {h, Component} from 'preact';
import style from './style.css';

export default class Nav extends Component {

  componentDidMount() {
    let navIcon = document.getElementsByClassName(style.navIcon)[0];
    let linkContainer = document.getElementsByClassName(style.linkContainer)[0];
    linkContainer.style.display = "none";
    navIcon.onclick = function (e) {
      e.preventDefault();
      var x = linkContainer;
      if (x.style.display === "block") {
        x.style.display = "none";
      } else {
        x.style.display = "block";
      }
      return false;
    }

    let links = document.getElementsByClassName(style.link);
    for (let link of links) {
      link.onclick = function () {
        linkContainer.style.display = "none";
      }
    }
  }

  render() {
    return (
      <div class={style.nav}>
        <a class={style.navIcon} href="">&#9776;</a>
        <div class={style.linkContainer}>
          <p><a href="/" class={style.link}>Home</a></p>
          <p><a href="/maps" class={style.link}>Maps</a></p>
          <p><a href="/directions" class={style.link}>Directions</a></p>
          <p><a href="/profile" class={style.link}>Profile</a></p>
        </div>
      </div>
    );
  }
}