/**
 * Created by HP on 3/11/2018.
 */
import { h, Component } from "preact";
import style from "./style";
import {makeRequest, BASE_ENDPOINTS} from "../../js/server-requests-utils";
import axios from 'axios';
import classNames from 'classnames';
import 'font-awesome/css/font-awesome.min.css';
import Cookies from "universal-cookie";

const CONFIG = require('../../../../config/secrets.json');


export default class PlaceDetails extends Component {

    constructor (props) {
        super(props);
        // as It's not completely clear for now how this component will get place_id
        // for making a request I keep two properties for state: placeId for making a request
        // and a place object itself
        this.placeId = 'ChIJxxRh5LCe4jARFw0N68oQ9cw';
        this.state = {
            fullScreenMode : true,
            showWorkingHours : false,
            place : null
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


    static getStarsForRating (rating) {
        const partials = rating.toString().split('.');
        let fullStars = new Array(parseInt(partials[0]));
        const halfStar  = partials[1] >= 0.5;
        fullStars = fullStars.fill().map(s => <i class="fa fa-star"></i>);
        return fullStars.concat(halfStar && <i class="fa fa-star-half"></i>);
    }


    /**
     * JSX for partial screen mode information about a place
     * @returns {XML[]}
     */
    partialScreenMode () {
        const {formatted_address, name} = this.state.place || testPlace;
        return [
            <div class={style.details__item}>{name}</div>,
            <div class={style.details__item}>{formatted_address}</div>,
            <div class={style.details__item}><a href="#" onClick={e => this.setState({fullScreenMode : true})}>More about this place</a></div>
        ];
    }


    /**
     * JSX for full screen mode information about a place
     * @returns {XML[]}
     */
    fullScreenMode () {
        const {
            name,
            place_id,
            rating,
            formatted_address,
            formatted_phone_number,
            international_phone_number,
            website,
            opening_hours,
            imgURL
            } = this.state.place;
        return [
            <div class={style.details__img}>
                <img alt={`${name} picture`} src={imgURL || 'http://via.placeholder.com/350x150'} class={style.place__image}/>
                <div class={style.details__directions}>
                    <a href="#" class={style.directions__link}><i class="fa fa-exchange"></i></a>
                </div>
            </div>,
            <div class={style.details__basicinfo}>
                <div class={style.details__name}>{name}</div>
                <div class={style.details__rating}>
                    {rating}
                    {PlaceDetails.getStarsForRating(rating)}
                </div>
            </div>,
            <div class={style.details__extra}>
                <div class={style.details__address}>
                    <i class="fa fa-compass"></i>
                    <p>{formatted_address}</p>
                </div>
                <div class={style.details__phone}>
                    <i class="fa fa-mobile"></i>
                    <p>{formatted_phone_number}</p>
                </div>
                <div class={style.details__website}>
                    <i class="fa fa-mouse-pointer"></i>
                    <a href={website}>{PlaceDetails.prettyWebsiteName(website)}</a>
                </div>
                <div class={style.details__workinghours}>
                    <div>
                        <div class={style.details__periodtitle}>
                            Open now: {opening_hours.open_now ? 'yes' : 'no'}
                            <span class="style.details__days-toggler"
                              onClick={() => this.setState({showWorkingHours: !this.state.showWorkingHours})}>
                            <i class="fa fa-angle-down"></i>
                        </span>
                        </div>
                        <div class={this.state.showWorkingHours ? style.hours__seen : style.hours__hidden}>
                            {opening_hours.weekday_text.map(period => <div class={style.details__period}>{period}</div>)}
                        </div>
                    </div>
                </div>
            </div>,
            <div class={style.details__modeswitch}>
                <i class="fa fa-2x fa-arrow-up" onClick={e => this.setState({fullScreenMode: false})}></i>
            </div>
        ]
    }


    /**
     * Getting details of a place based on it's id
     * Sets state.place to response object from back-end
     */
    componentDidMount() {
        makeRequest('GET', BASE_ENDPOINTS.places, `/${this.placeId}`)
            .then(data =>  {
                console.log(data.data);
                if(!data.data.error_message) this.setState({place: data.data.result})
            })
            .catch(e => console.error('ERROR1', e))
    }


    render () {
        return (
            this.state.place &&
            <div class={style.placeDetails__container}>
                <div class={this.state.fullScreenMode
                 ? style.placeDetails__innerbig
                 : style.placeDetails__innersmall}>
                    {this.state.fullScreenMode ?  this.fullScreenMode() : this.partialScreenMode()}
                </div>
            </div>
        )
    }
}








/*
 My questions:
 1) Image url is not presetn in Google API response.
 2) How to test the server via Postman (headers)
 3) No directions component?
 4) How to mix classNames in preact (Classnames library does not work)
 5) Issue on destructuring response form Google
 */





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