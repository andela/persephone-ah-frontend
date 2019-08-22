import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getSingleArticle } from './readArticle.action';
import PropTypes from 'prop-types';
import IconComponent from '../../components/IconComponent/index.jsx';
import './ReadArticlePage.scss';
import StarRatingComponent from 'react-star-rating-component';
import CreateComment from '../../components/CreateComment/index.jsx';
import Authorcard from '../../components/AuthorCard/index.jsx';
import Loading from '../../components/LoadingIndicator/index.jsx';
import moment from 'moment';

export class ReadArticle extends Component {
  componentDidMount() {
    const { slug } = this.props.match.params;
    this.props.fetchSingleArticle(slug);
  }
  render() {
    let singleArticle = <Loading />;
    if (!this.props.loading && this.props.article) {
      const {
        body,
        author,
        readTime,
        title,
        image,
        createdAt
      } = this.props.article;
      const authorName = `${author.firstName} ${author.lastName}`;
      const imageObj = JSON.parse(image);
      const datePublished = moment(createdAt).format('MMMM Do, YYYY');

      singleArticle = singleArticle = (
        <div className="container">
          <div className="row read-article-section">
            <div className="col-sm-12 col-md-9 article-details">
              <div className="article-image">
                <IconComponent src={imageObj[0]} alt={'image asset'} />
              </div>
              <div className="col-sm-12 article-title">
                <div className="row">
                  <h3>
                    <strong>{title}</strong>
                  </h3>
                </div>
                <div className="row read-article-stat">
                  <div className="row read-article-read-time-container">
                    <div className="read-article-read-time">
                      {datePublished} - {readTime}
                    </div>
                    <div className="read-article-ratings">
                      <StarRatingComponent
                        name="rate1"
                        starCount={5}
                        value={4}
                      />
                    </div>
                  </div>
                  <div className="read-article-bookmark">
                    {' '}
                    <IconComponent
                      src={'../../../src/assets/images/report.svg'}
                      alt={'image asset'}
                      className={'read-article-image'}
                    />
                  </div>
                </div>
              </div>
              <div className="article-body">{body}</div>
            </div>
            <div className="col-sm-12 col-md-3 article-details-second">
              <div className="read-article-author-card">
                <Authorcard
                  image="./../src/assets/images/avatar.png"
                  fullname={authorName}
                  handle={author.firstName}
                  bio="This would be a short summary of the users bio, for little interest
    display for readers"
                  isFollowing={false}
                  lightTheme={this.props.lightTheme}
                />
              </div>
            </div>
          </div>
          <div className="row create-comment-section">
            <div className="col-sm-12 col-md-12 create-comment-container">
              <CreateComment token={this.props.token} />
            </div>
          </div>
        </div>
      );
    }
    return singleArticle;
  }
}

ReadArticle.propTypes = {
  slug: PropTypes.string,
  token: PropTypes.string,
  lightTheme: PropTypes.bool,
  loading: PropTypes.bool,
  match: PropTypes.object,
  params: PropTypes.object,
  error: PropTypes.object,
  fetchSingleArticle: PropTypes.func,
  article: PropTypes.object
};
export const mapStateToProps = state => {
  return {
    lightTheme: state.theme.theme === 'light-theme',
    article: state.readArticle.article,
    loading: state.readArticle.loading
  };
};

export const mapDispatchToProps = dispatch => {
  return {
    fetchSingleArticle: slug => dispatch(getSingleArticle(slug))
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ReadArticle);
