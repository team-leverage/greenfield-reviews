import React, { Component } from 'react';
import { connect } from 'react-redux';
import PT from 'prop-types';
import List from './RnR_list';
import { updateReviewsToRender } from '../../actions/RnR-Actions/RnR-action';
import { recordClickData } from '../../util/util';
import '../../styles/standard-styles.scss';
import '../../styles/RnR-styles.scss';

const apiurl = process.env.REACT_APP_APIURL || '123.456.789.1011';

const mapStateToProps = (state) => ({
  ...state,
});

class Sort extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  componentDidMount() {
    this.getAllReviews();
  }

  componentDidUpdate(prevProps) {
    const { productData } = this.props;
    if (prevProps.productData.id !== productData.id) {
      this.getAllReviews();
    }
  }

  getAllReviews() {
    const currentView = document.getElementById('sort-selector').value;
    const { productId, dispatch } = this.props;
    // fetch(`${apiurl}/reviews/${productId}/list`)
    fetch(`http://localhost:3000/reviews/${productId}/list`)
      .then((response) => {
        if (response.status !== 200) { console.log('problem'); }
        return response.json();
      })
      .then((data) => {
        console.log(data)
        if (currentView === 'helpfulness') {
          return data.results.sort((a, b) => ((a.helpfulness < b.helpfulness) ? 1 : -1));
        } if (currentView === 'date') {
          return data.results.sort((a, b) => ((a.date < b.date) ? 1 : -1));
        }
        return data.results.sort((a, b) => {
          if (a.helpfulness > 4 || b.helpfulness > 4) {
            return 1;
          }
          if (new Date().getTime() - Date.parse(a.date) < 6048000000
          || new Date().getTime() - Date.parse(b.date) < 6048000000) {
            return 1;
          }
          return (a.date < b.date) ? 1 : -1;
        });
      })
      .then((info) => { dispatch(updateReviewsToRender(info)); });
  }

  handleClick(e) {
    recordClickData(e.target, 'sort_list');
    this.getAllReviews();
  }

  render() {
    const { updateReviewNumber } = this.props;
    const upperStr = `${updateReviewNumber} reviews, sorted by `;
    return (
      <div className="tile-container">
        <form className="sort-list">
          {upperStr}
          <select id="sort-selector" className="selector" onChange={this.handleClick.bind(this)}>
            <option value="relevance">Relevance</option>
            <option value="date">Date</option>
            <option value="helpfulness">Helpfulness</option>
          </select>
        </form>
        <List />
      </div>
    );
  }
}

Sort.propTypes = {
  productId: PT.number.isRequired,
  updateReviewNumber: PT.oneOfType([PT.number, PT.string]).isRequired,
  productData: PT.shape({ id: PT.number }).isRequired,
  dispatch: PT.func.isRequired,
};

const ConnectSort = connect(mapStateToProps, null)(Sort);
export default ConnectSort;
