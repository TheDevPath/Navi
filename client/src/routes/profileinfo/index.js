import {h, Component} from 'preact';
import style from './style';

import Logo from '../../components/Logo';
import ProfileCard from '../../components/ProfileCard';
import SavedPins from '../../components/SavedPins';
import SearchHistory from '../../components/SearchHistory';
import ProfileEditForm from '../../components/ProfileEditForm';
import ProfileSettingsForm from '../../components/ProfileSettingsForm';
import {setStateUserOrRedirectToSignIn} from "../../js/utilities";

export default class ProfileInfo extends Component {

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
        {success}
        <div class={style.link}><a href="/">Home</a></div>
        <div class={style.profile}>
          <ProfileCard />
        </div>
        <div class={style.profile}>
          <SavedPins />
        </div>
        <div class={style.profile}>
          <SearchHistory />
        </div>
        <div class={style.profile}>
          <ProfileEditForm />
        </div>
        <div class={style.profile}>
          <ProfileSettingsForm />
        </div>
      </div>
    );
  }
}
