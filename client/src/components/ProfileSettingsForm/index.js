import {h, Component} from 'preact';
import style from './style';

export default class ProfileSettingsForm extends Component {


    render({ user }, { time }) {
        return (
        <div class={style.profileSettingsForm}>
            <span id={style.profileSettinsFormTitle}>Account Settings</span>

            <p>features to be accounced</p>

        </div>
        );
    }
}
