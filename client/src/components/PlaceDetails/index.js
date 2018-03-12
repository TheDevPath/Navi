/**
 * Created by HP on 3/11/2018.
 */
import { h, Component } from "preact";
import style from "./style";
import axios from 'axios';
import classNames from 'classnames';
import 'font-awesome/css/font-awesome.min.css';

const CONFIG = require('../../../../config/secrets.json');

export default class PlaceDetails extends Component {

    constructor (props) {
        super(props);
        this.place = props.place || this.testPlace;
        this.state = {
            fullScreenMode : false,
            showWorkingHours : false,
            image : ''
        }
    }


    /**
     * A mock-up object which represent information about a place from back-end
     * @type {{placeName: string, address: string, phoneNumber: string, openNow: boolean, openingHours: string[], website: (XML|string|void|*|any), pictureURL: string}}
     */
    testPlace = {
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
        website      : PlaceDetails.prettyUrl('http://www.saxophonepub.com/'),
        photoReference   : 'CmRaAAAAl5eVwYeNMgYRyZaQxMVi2FxARxWDLMxX8kh4zHmsfiwUTNruKJw0zfU7hPu96j-XDi_V-bYOHDnaId3lEIgyOvFESntTNgbCB6Nr5iPEQUzTgTD87uM2dAi8yqQTgBWTEhDFE5rUR3ZAtD8YFL7HbOkRGhQjoJlBJbiOv8uJU1rGQ5DVpXguWA'
    }


    /**
     * strips 'http://' and slash in the end of a URL
     * @param url
     * @returns {XML|string|void|*|any}
     */
    static prettyUrl (url) {
        const regex = new RegExp('[^http:\/\/][^]*', 'g');
        return regex.exec(url)[0].replace('/', '');
    }



    partialScreenMode () {
        return [
            <div class={style.details__item}>{this.place.placeName}</div>,
            <div class={style.details__item}>{this.place.address}</div>,
            <div class={style.details__item}><a href="#" onClick={e => this.setState({fullScreenMode : true})}>More about this place</a></div>
        ];
    }

    getPlacePictureFromGoogle () {
        const url = `https://maps.googleapis.com/maps/api/place/photo?
        key=${CONFIG.google_maps.api_key}&
        photoreference=${this.place.photoReference}&
        maxwidth=300`;
        axios.get(url)
            .then(image => {
                this.setState({image})
            })
            .catch(err => `ERR: ${err.response}`)
    }

    fullScreenMode () {
        return [
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
        this.getPlacePictureFromGoogle();
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