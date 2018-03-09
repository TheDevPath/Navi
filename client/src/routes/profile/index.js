import {h, Component} from 'preact';
import style from './style';

import Logo from '../../components/Logo';
import ProfileCard from '../../components/ProfileCard';
import ProfileEditForm from '../../components/ProfileEditForm';
import ProfileSettingsForm from '../../components/ProfileSettingsForm';
import SavedPinsCard from '../../components/SavedPinsCard';
import SearchHistoryCard from '../../components/SearchHistoryCard';
import {setStateUserOrRedirectToSignIn} from "../../js/utilities";

export default class Profile extends Component {

  constructor() {
    super();
    this.state = {
      timeLocale: 'To be used later for profile card',
      user: {},
      isSignedIn: false,
    };
    setStateUserOrRedirectToSignIn(this);
  }

render({success}, {user, time}) {
    return (
      <div class={style.profile}>
        <Logo/>
        <div class={style.successMessage}>{success}</div>
        <SearchHistoryCard user={user}/>
        <SavedPinsCard user={user}/>
        <div class={style.links_container}>
        <div class={style.link}><a href="/">Home</a></div>
        <div class={style.link}><a href="/maps">Your Maps</a></div>
        <div class={style.link}><a href="/settings">Settings</a></div>
        <div class={style.link}><a href="/signout">Sign Out</a></div>
        </div>
      </div>
    );
  }
}
