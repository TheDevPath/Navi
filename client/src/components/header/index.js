import { h, Component } from 'preact';
import { Link } from 'preact-router/match';
import style from './style';

export default class Header extends Component {
    render() {
        return (<header class={style.header}>
            <nav>
                <h1>Map-E</h1>
                <Link activeClassName={style.active} href="/">Home</Link>
                <Link activeClassName={style.active} href="/profile">Profile</Link>
                <Link activeClassName={style.active} href="/signin">Sign in</Link>
                <Link activeClassName={style.active} href="/register">Register</Link>
                <Link activeClassName={style.active} href="/directions">Directions</Link>
                <Link activeClassName={style.active} href="/pins">Pins</Link>
                <Link activeClassName={style.active} href="/maps">Maps</Link>
            </nav>
        </header>);
    }
}
