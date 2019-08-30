/* eslint-disable linebreak-style */
/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable no-alert */
import React from 'react';
import PropTypes from 'prop-types';
import Modal from './Modal';

class AddAnswer extends React.Component {
  constructor(props, { data, productName }) {
    super(props, { data, productName });

    this.state = {
      show: false,
    };

    this.showModal = (boolean) => {
      this.setState({ show: boolean });
    };

    this.hideModal = (boolean) => {
      this.setState({ show: boolean });
    };
  }

  render() {
    const { show } = this.state;
    const { data, productName } = this.props;
    return (
      <button
        className="questions-clear-btn"
        type="button"
        onClick={() => this.showModal(true)}
      >
        <u style={{ fontSize: '12px', color: 'gray' }}>Add Answer</u>
        <Modal show={show}>
          <form
            autoComplete="off"
            className="form-style-7"
            onSubmit={() => {
              const modalData = {
                body: document.getElementById('qna-modal-a-body').value,
                name: document.getElementById('qna-modal-a-name').value,
                email: document.getElementById('qna-modal-a-email').value,
                photos: document.getElementById('qna-modal-a-pic').value.split(' '),
              };

              fetch(`http://18.217.220.129/qa/${data.question_id}/answers`, {
                method: 'POST',
                body: JSON.stringify(modalData),
                headers: {
                  'Content-Type': 'application/json',
                },
              })
                .then((result) => {
                  if (result.ok) {
                    alert('Thanks for answering!');
                  } else {
                    alert('Something went horribly wrong, we\'re so sorry!');
                  }
                });
            }}
          >
            <h1>Submit your Answer</h1>
            <h1>
              {`${productName}: ${data.question_body}`}
            </h1>
            <ul>
              <li>
                <label htmlFor="name">Name</label>
                <input
                  type="text"
                  name="name"
                  maxLength="60"
                  id="qna-modal-a-name"
                />
                <span>Enter your nickname here</span>
              </li>
              <li>
                <label htmlFor="email">Email</label>
                <input
                  type="email"
                  name="email"
                  maxLength="60"
                  id="qna-modal-a-email"
                />
                <span>Enter a valid email address</span>
              </li>
              <li>
                <label htmlFor="url">Picture</label>
                <input
                  type="url"
                  name="url"
                  maxLength="240"
                  id="qna-modal-a-pic"
                />
                <span>Valid link to your picture/s (eg: http://www.google.com)</span>
              </li>
              <li>
                <label htmlFor="bio">Your Answer</label>
                <textarea
                  name="bio"
                  maxLength="1000"
                  id="qna-modal-a-body"
                />
                <span>{`Your answer to: ${data.question_body}`}</span>
              </li>
              <li>
                <input type="submit" value="Send This" />
              </li>
            </ul>
          </form>
        </Modal>
      </button>
    );
  }
}

AddAnswer.propTypes = {
  data: PropTypes.shape({
    question_body: PropTypes.string.isRequired,
    question_id: PropTypes.number.isRequired,
  }),
  productName: PropTypes.string.isRequired,
};

AddAnswer.defaultProps = {
  data: {
    question_body: 'Please browse for a real product.',
  },
};

export default AddAnswer;
