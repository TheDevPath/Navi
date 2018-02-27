import {h, Component} from 'preact';
import style from './style';
import ProfileCard from '../../components/ProfileCard';
import ProfileEditForm from '../../components/ProfileEditForm';
import ProfileSettingsForm from '../../components/ProfileSettingsForm';

export default class Profile extends Component {

    state = {
        timeLocale: 'To be used later for profile card'
    };

    // Note: `user` comes from the URL, courtesy of our router
    render({ user }, { time }) {
        return (
            <div class={style.profile}>
                <ProfileCard user={user}/>
                <ProfileEditForm user={user} />
                <ProfileSettingsForm user={user} />
            </div>
        );
    }
}
