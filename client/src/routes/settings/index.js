import { h, Component } from 'preact';
import style from './style';
import AccountForm from "../../components/AccountForm";


export default class Settings extends Component {

    render() {
        return (
            <div class={style.main}>
              <div><a href="/reset-password">Reset password</a></div>
              <div><a href="/signout">Sign Out</a></div>
            </div>
        );
    }
}

