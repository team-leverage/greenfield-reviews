/* eslint-disable linebreak-style */
import React from 'react';
import PropTypes from 'prop-types';

class Search extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      search: '',
    };
    this.searchFilter = () => {
      const { questions } = this.props;
      this.setState({ search: document.getElementById('qna-searchbar').value }, () => {
        const { search } = this.state;
        if (search.length >= 3) {
          const filteredQuestions = questions.filter(
            (question) => question.question_body.toLowerCase().includes(search.toLowerCase()),
          );
          console.log(filteredQuestions);
        }
      });
    };
  }

  render() {
    return (
      <div id="search-bar-container">
        <div className="search-input-icons">
          <i className="material-icons">search</i>
          <input
            id="qna-searchbar"
            className="search-input-field"
            type="text"
            placeholder="HAVE A QUESTION? FIND AN ANSWER..."
            onChange={this.searchFilter}
          />
        </div>
      </div>
    );
  }
}

Search.propTypes = {
  questions: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default Search;
