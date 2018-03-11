import {h, Component} from 'preact';
import style from './style';
import {makeRequest, token} from "../../js/server-requests-utils";
import {SEARCH_HISTORY_PATH} from '../../../config';

export default class SearchHistoryCard extends Component {
  constructor() {
    super();
    this.state = {
      user: {},
      searchHistory: [],
    };
    this.getSearchHistory = this.getSearchHistory.bind(this);
    this.displayHistory = this.displayHistory.bind(this);
  }

  componentWillMount() {
    this.setState({user: this.props.user});
    this.getSearchHistory();
  }

  displayHistory(searchHistory) {
    let histories = [];
    searchHistory.map( search => {
      histories.push(<div>{search.query}</div>);
    });
    if(histories.length == 0) histories.push(<div>No saved searches</div>);
    this.setState({histories: histories});
  }

  getSearchHistory() {
    makeRequest('GET', SEARCH_HISTORY_PATH)
      .then(function (response) {
        this.displayHistory(response.data.searchHistory);
      }.bind(this))
      .catch(function (error) {
        if (error.response === undefined) {
          this.setState({searchHistory: error});
        } else {
          this.setState({searchHistory: error.response.data});
        }
      }.bind(this));
  }

  render({}, {user, histories}) {


    return (
      <div class={style.searchHistoryCard}>

        <span id={style.searchHistoryCardTitle}>Search History</span><br/>


        <div class={style.searchHistoriesContainer}>{histories}</div>

      </div>
    );
  }
}
