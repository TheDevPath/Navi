import { h, Component } from 'preact';
import PropTypes from 'prop-types';

const { GOOGLE_API_KEY } = require('../../../config');

export default class SearchAutocomplete extends Component {
    static propTypes = {
        onPlaceSelected: PropTypes.func,
    types: PropTypes.array,
    componentRestrictions: PropTypes.object,
    bounds: PropTypes.object,
    }

    constructor(props) {
        
        super(props);
        this.autocomplete = null;
        this.onSelected = this.onSelected.bind(this);
      }

    componentDidMount() {
      this.loadScript();      
      }

      loadScript(){        
        this.script = document.createElement('script')
        this.script.src = `https://maps.googleapis.com/maps/api/js?key=${GOOGLE_API_KEY}&libraries=places`
        this.script.async = 1
        this.script.defer = 1
        this.script.onload = () => this.initAutocomplete()
      // this.script.onerror = () => this.initAuthcompleteFailed()
        document.body.appendChild(this.script);
      }
      
      initAutocomplete () {                
        const { types=['(cities)'], componentRestrictions, bounds, } = this.props;
        const config = {
          types,
          bounds,
        };
    
        if (componentRestrictions) 
          config.componentRestrictions = componentRestrictions;
    
        this.autocomplete = new google.maps.places.Autocomplete(this._input, config);
    
        this.autocomplete.addListener('place_changed', this.onSelected);
      } 
    

    componentWillUnmount() {
      document.body.removeChild(this.script)
      this.autocomplete.removeListener('place_changed')
      }
    
      onSelected() {
        if (this.props.onPlaceSelected) {
         
          var place = this.autocomplete.getPlace();
          this.props.onPlaceSelected(place);

          //ToDo: Remove this and add to state as required.
          console.log(place);
        }
      }

      render() {
        const {onPlaceSelected, types, componentRestrictions, bounds, ...rest} = this.props;
    
        return (
          <input
          ref={(c) => this._input = c}
            {...rest}
          />
        );
      }
}

