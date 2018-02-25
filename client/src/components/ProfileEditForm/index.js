import {h, Component} from 'preact';
import style from './style';

export default class ProfileEditForm extends Component {


    render({ user }, { time }) {
        return (
        <div class={style.profileEditForm}>
            <form action="/">
                <span id={style.editDetailsTitle}>Edit Details</span><br/>
                <span id={style.accountDate}>Account creation date: Today</span>
                <hr/>
                <span>First name: </span> <input type="text" name="fname"/><br/>
                <span>Last name: </span><input type="text" name="lname"/><br/>

                <span>Email: </span><input type="text" name="email"/><br/>
                <hr/>
                <span>New password: </span><input type="password" name="password"/><br/>
                <span>Confirm password: </span><input type="password" name="confirm_password"/><br/>

                <input type="submit" value="Submit"/>
                <hr/>
                <input id={style.deleteAccountBtn} type="submit" value="DELETE ACCOUNT?"/><br/>
                <span>Enter current password: </span><input type="password" name="account_delete_confirm"/><br/>

            </form>

        </div>
        );
    }
}
