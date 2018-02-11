/* global google */
import { h, Component } from 'preact';
import PropTypes from 'prop-types';

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
        this.event = null;
      }

    componentDidMount() {
        
        const { types=['(cities)'], componentRestrictions, bounds, } = this.props;
        const config = {
          types,
          bounds,
        };
    
        if (componentRestrictions) {
          config.componentRestrictions = componentRestrictions;
        }
    
        this.autocomplete = new google.maps.places.Autocomplete(this.refs.searchInput, config);
    
        this.event = this.autocomplete.addListener('place_changed', this.onSelected.bind(this));
      }
      
    componentWillUnmount() {
        this.event.remove();
      }
    
      onSelected() {
        if (this.props.onPlaceSelected) {
          this.props.onPlaceSelected(this.autocomplete.getPlace());
        }
      }

      render() {
        const {onPlaceSelected, types, componentRestrictions, bounds, ...rest} = this.props;
    
        return (
          <input
          ref={searchInput => this.searchInput = searchInput} 
           // ref="searchInput"
            {...rest}
          />
        );
      }
}