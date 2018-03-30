import { h, Component } from 'preact';
import style from './style';

import Logo from '../../components/Logo';
import SavedPinsCard from '../../components/SavedPinsCard';
import SearchHistoryCard from '../../components/SearchHistoryCard';
import { setStateUserOrRedirectToSignIn } from "../../js/validate-account-form";

export default class Profile extends Component {

  constructor() {
    super();
    this.state = {
      user: {},
      isSignedIn: false,
    };
    setStateUserOrRedirectToSignIn(this);
  }

  render({ success }, { user, time }) {
    return (
      <div class={style.profile}>
        <Logo />
        <div class={style.successMessage}>{success}</div>
        <form>
          <fieldset>
            <legend>User Info</legend>
            Name: {user.name}<br />
            Email: {user.email}<br />
          </fieldset>
        </form>
        <SearchHistoryCard user={user} />
        <SavedPinsCard user={user} setSelectedPin={this.props.setSelectedPin} />
        <div class={style.links_container}>
          <div class={style.link}><a href="/maps">Explore Map</a></div>
          <div class={style.link}><a href="/reset-password">Update User Info</a></div>
          <div class={style.link}><a href="/signout">Sign Out</a></div>
        </div>
      </div>
    );
  }
}
