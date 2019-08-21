import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import Button from '../Button/index.jsx';
import PropTypes from 'prop-types';
import TextArea from '../TextArea/index.jsx';
import './CreateComment.scss';
import { createCommentOnArticle } from './createComment.action';

export class CreateComment extends Component {
  state = {
    comment: null
  };

  handleChange = e => {
    e.preventDefault();
    const updatedComment = e.target.value;

    this.setState({ comment: updatedComment });
  };

  submitComment = e => {
    e.preventDefault();
    const createdComment = { body: this.state.comment };

    this.props.postComment(
      this.props.article.slug,
      createdComment,
      this.props.token
    );
    //  e.target[0].value = '';
  };
  render() {
    return (
      <div className="create-comment">
        {this.props.token !== null ? (
          <form onSubmit={this.submitComment}>
            <div>
              <TextArea
                placeholder="Write your comment here"
                handleChange={e => this.handleChange(e)}
                required
                lightTheme={this.props.lightTheme}
                id="comment"
                name="comment"
              />
            </div>
            <div>
              <Button customClassName="create-comment-button">comment</Button>
            </div>
          </form>
        ) : (
          <h4>
            Please <Link to="/login">Login</Link> to contribute.
          </h4>
        )}
      </div>
    );
  }
}

CreateComment.propTypes = {
  lightTheme: PropTypes.bool,
  handleChange: PropTypes.func,
  handleBlur: PropTypes.func,
  postComment: PropTypes.func,
  article: PropTypes.object,
  token: PropTypes.string
};

export const mapStateToProps = state => {
  return {
    lightTheme: state.theme.theme === 'light-theme',
    article: state.readArticle.article,
    loading: state.articleComment.loading
  };
};

export const mapDispatchToProps = dispatch => {
  return {
    postComment: (slug, comment, token) =>
      dispatch(createCommentOnArticle(slug, comment, token))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CreateComment);
