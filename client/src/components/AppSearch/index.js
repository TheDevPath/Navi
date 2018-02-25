import { h , Component } from 'preact';
import style from './style';

export default class Search extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: '',
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({value: event.target.value});
    console.log('Search.handleChange(): ', this.state.value);
    // process autocomplete request and update list
  }

  handleSubmit(event) {
    alert('A query was submitted: ', this.state.value);
    event.preventDefault();
  }

  render() {
    return (
      <div class={style.autocomplete}>
        <input type='search' placeholder='Search for a place or address' class={style.search}
          onChange={this.handleSubmit} onInput={this.handleChange}/>
        {this.props.children}
      </div>
    );
  }
}
