/**
 * Created by HP on 3/11/2018.
 */
import { h, Component } from "preact";
import style from "./style";
import {makeRequest} from "../../js/server-requests-utils";
import axios from 'axios';
import classNames from 'classnames';
import 'font-awesome/css/font-awesome.min.css';

const CONFIG = require('../../../../config/secrets.json');


export default class PlaceDetails extends Component {

    constructor (props) {
        super(props);
        // as It's not completely clear for now how this component will get place_id
        // for making a request I keep two properties for state: placeId for making a request
        // and a place object itself
        this.placeId = 'ChIJxxRh5LCe4jARFw0N68oQ9cw';
        this.place = props.place || testPlace;
        this.state = {
            fullScreenMode : true,
            showWorkingHours : false,
        }
    }



    /**
     * strips 'http://' and slash in the end of a URL
     * @param url
     * @returns {XML|string|void|*|any}
     */
    static prettyWebsiteName (url) {
        const regex = new RegExp('[^http:\/\/][^]*', 'g');
        return regex.exec(url)[0].replace('/', '');
    }


    /**
     * JSX for partial screen mode information about a place
     * @returns {XML[]}
     */
    partialScreenMode () {
        return [
            <div class={style.details__item}>{this.place.placeName}</div>,
            <div class={style.details__item}>{this.place.address}</div>,
            <div class={style.details__item}><a href="#" onClick={e => this.setState({fullScreenMode : true})}>More about this place</a></div>
        ];
    }


    /**
     * JSX for full screen mode information about a place
     * @returns {XML[]}
     */
    fullScreenMode () {
        return [
            <div class={style.details__item}>
                <img alt={`${this.place.name} picture`} src={this.place.imgURL} class={style.place__image}/>
            </div>,
            <div class={style.details__item}>{this.place.name}</div>,
            <div class={style.details__item}>{this.place.address}</div>,
            <div class={style.details__item}><img src={this.place.pictureURL}/></div>,
            <div class={style.details__item}>{this.place.phoneNumber}</div>,
            <div class={style.details__item}>{this.place.website}</div>,
            <div class={style.details__item}>
                <div>
                    Open now: {this.place.openNow ? 'yes' : 'no'}
                    <span class="style.details__days-toggler"
                          onClick={() => this.setState({showWorkingHours: !this.state.showWorkingHours})}>
                        <i class="fa fa-angle-down"></i>
                    </span>
                </div>
                <div class={this.state.showWorkingHours ? style.hours__seen : style.hours__hidden}>
                    {this.place.openingHours.map(period => <div>{period}</div>)}
                </div>
            </div>,
            <div class={style.details__item}><a href="#" onClick={e => this.setState({fullScreenMode: false})}>X</a></div>
        ]
    }

    componentDidMount() {
        console.log('===========================================================');
        makeRequest('GET', 'places', '', '', {place_id : this.placeId})
            .then((data) =>  console.log('DATA', data))
            .catch(e => console.error('ERROR', e))
    }


    render () {
        return (
            <div class={style.placeDetails__container}>
                <div class={this.state.fullScreenMode ? style.placeDetails__innerbig : style.placeDetails__innersmall}>
                    <button class={style.directionsButton}>Directions</button>
                    {this.state.fullScreenMode ?  this.fullScreenMode() : this.partialScreenMode()}
                </div>
            </div>
        )
    }
}


/**
 * A mock-up object which represent information about a place from back-end
 * @type {{placeName: string, address: string, phoneNumber: string, openNow: boolean, openingHours: string[], website: (XML|string|void|*|any), pictureURL: string}}
 */
const testPlace = {
    placeName    : 'Saxophone Bar',
    address      : '3/8 ซอย ราชวิถี 11 Phayathai Rd, Khwaeng Thanon Phaya Thai, Khet Ratchathewi, Krung Thep Maha Nakhon 10400, Thailand',
    phoneNumber  : '+66 2 246 5472',
    openNow      : true,
    openingHours : [
        "Monday: 6:00 PM – 2:00 AM",
        "Tuesday: 6:00 PM – 2:00 AM",
        "Wednesday: 6:00 PM – 2:00 AM",
        "Thursday: 6:00 PM – 2:00 AM",
        "Friday: 6:00 PM – 2:00 AM",
        "Saturday: 6:00 PM – 2:00 AM",
        "Sunday: 6:00 PM – 2:00 AM"
    ],
    website      : PlaceDetails.prettyWebsiteName('http://www.saxophonepub.com/'),
    imgURL   : 'http://via.placeholder.com/350x150'
}