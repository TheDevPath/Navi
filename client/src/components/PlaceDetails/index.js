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
import fakePlace from './fakePlace';


export default class PlaceDetails extends Component {

    constructor (props) {
        super(props);
        this.state = {
            fullScreenMode: true,
            showWorkingHours: false,
            place: null,
            placeId: null,
        }
    }



    /**
     * strips 'http://' and a slash in the end of a URL
     * @param url
     * @returns {XML|string|void|*|any}
     */
    static prettyWebsiteName (url) {
        const regex = new RegExp('[^http:\/\/][^]*', 'g');
        return regex.exec(url)[0].replace('/', '');
    }


    /**
     * This method returns JSX for place's rating which is represented by stars icons
     * @param rating
     * @returns {Array.<T>}
     */
    static getStarsForRating (rating) {
        const partials = rating.toString().split('.');
        let fullStars = new Array(parseInt(partials[0]));
        const halfStar  = partials[1] >= 0.5;
        fullStars = fullStars.fill().map(s => <i class="fa fa-star"></i>);
        return fullStars.concat(halfStar && <i class="fa fa-star-half"></i>);
    }


    /**
     * JSX for partial screen mode information about a place (isn't readdy yet)
     * @returns {XML[]}
     */
    partialScreenMode () {
        const {formatted_address, name} = this.state.place;
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
            website,
            opening_hours,
            imgURL
            } = this.state.place;
        return [
            <div class={style.details__directions}>
                <a href="#" class={style.directions__link}>
                    <p>Get</p>
                    <i class="fa fa-exchange"></i>
                </a>
            </div>,
            <div class={style.details__img}>
                <img alt={`${name} picture`} src={imgURL || 'http://via.placeholder.com/350x150'} class={style.place__image}/>
            </div>,
            <div class={style.details__basicinfo}>
                <div class={style.details__name}>{name}</div>
                <div class={style.details__rating}>
                    {rating}
                    {rating && PlaceDetails.getStarsForRating(rating)}
                </div>
            </div>,
            <div class={style.details__extra}>
                {formatted_address &&
                <div class={style.details__address}>
                    <i class="fa fa-compass"></i>
                    <p>{formatted_address}</p>
                </div>}
                {formatted_phone_number &&
                    <div class={style.details__phone}>
                        <i class="fa fa-mobile"></i>
                        <p>{formatted_phone_number}</p>
                    </div>}
                {website &&
                <div class={style.details__website}>
                    <i class="fa fa-mouse-pointer"></i>
                    <a href={website}>{ PlaceDetails.prettyWebsiteName(website)}</a>
                </div>}
                <div class={style.details__workinghours}>
                    {opening_hours &&
                    <div>
                        <div class={style.details__periodtitle}>
                            Open now: {opening_hours.open_now ? 'yes' : 'no'}
                            <span class="style.details__days-toggler"
                              onClick={() => this.setState({showWorkingHours: !this.state.showWorkingHours})}>
                            <i class="fa fa-angle-down"></i>
                        </span>
                        </div>
                        <div class={this.state.showWorkingHours ? style.hours__seen : style.hours__hidden}>
                            {opening_hours && opening_hours.weekday_text.map(period => <div class={style.details__period}>{period}</div>)}
                        </div>
                    </div>}
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
    componentWillReceiveProps(nextProps, _) {
        const gotNewPlace = nextProps => {
            return nextProps.placeId && (this.props.placeId !== nextProps.placeId);
        };
        if(gotNewPlace(nextProps)) {
            makeRequest('GET', BASE_ENDPOINTS.places, `/${nextProps.placeId}`)
                .then(data =>  {
                    console.log(data.data);
                    if(!data.data.error_message) this.setState({place: data.data.result})
                })
                .catch(e => console.error('ERROR1', e))
        }

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





