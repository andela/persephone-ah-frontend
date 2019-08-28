import React, { Component } from 'react';
import moment from 'moment';
import { connect } from 'react-redux';
import { toast } from 'react-toastify';
import {
  getSingleArticle,
  rateArticleRequest,
  cleanUpRating
} from './readArticle.action';
import PropTypes from 'prop-types';
import IconComponent from '../../components/IconComponent/index.jsx';
import './ReadArticlePage.scss';
import StarRatingComponent from 'react-star-rating-component';
import CreateComment from '../../components/CreateComment/index.jsx';
import Authorcard from '../../components/AuthorCard/index.jsx';
import Loading from '../../components/LoadingIndicator/index.jsx';
import reactHtmlParser from 'react-html-parser';
import { createBookmark } from '../../views/BookmarkPage/bookmark.action';

export class ReadArticle extends Component {
  state = {
    user: {},
    slug: ''
  };

  componentDidMount() {
    const user = JSON.parse(localStorage.getItem('user'));
    const { slug } = this.props.match.params;
    this.setState({ user, slug });
    this.props.fetchSingleArticle(slug);
  }

  handleCreateBookmark = async () => {
    await this.props.createBookmark(
      this.state.slug,
      this.props.auth.user.token
    );
  };
  onStarClick = (nextValue, prevValue, name) => {
    const { rateArticleRequest } = this.props;
    const payload = {
      rating: nextValue,
      articleId: name
    };
    rateArticleRequest(payload);
  };

  componentDidUpdate() {
    if (
      this.props.article &&
      Object.keys(this.props.article.rating).includes('ratingResponse')
    ) {
      if (this.props.article.rating.ratingResponse.status === 'fail')
        toast.error(this.props.article.rating.ratingResponse.data);
      if (this.props.article.rating.ratingResponse.status === 'success')
        toast.success(
          `You rated this article ${this.props.article.rating.ratingResponse.data.rating} stars`
        );
    }
  }
  componentWillUnmount;
  render() {
    let singleArticle = <Loading />;
    const articleUrl = window.location.href;
    if (!this.props.loading && this.props.article) {
      const {
        id,
        body,
        author,
        readTime,
        rating,
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
                        value={rating.averageRating}
                        editing={false}
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
              <div className="article-body">
                {reactHtmlParser(body)}
                {this.props.auth.user.token ? (
                  <div className="rating">
                    <span>Rate this post</span>
                    <StarRatingComponent
                      name={id.toString()}
                      onStarClick={this.onStarClick}
                      editing={!Object.keys(rating).includes('ratingResponse')}
                    />
                  </div>
                ) : (
                  ''
                )}
              </div>
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
                  articleUrl={articleUrl}
                  handleCreateBookmark={this.handleCreateBookmark}
                  slug={this.slug}
                />
              </div>
            </div>
          </div>
          <div className="row create-comment-section">
            <div className="col-sm-12 col-md-12 create-comment-container">
              <CreateComment {...this.props.match} />
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
  article: PropTypes.object,
  getAllUserBookmarks: PropTypes.func,
  bookmark: PropTypes.any,
  createBookmark: PropTypes.func,
  auth: PropTypes.object,
  rateArticleRequest: PropTypes.func,
  cleanUpRating: PropTypes.func,
  fetchArticleComment: PropTypes.func,
  article: PropTypes.object
};
export const mapStateToProps = state => {
  return {
    lightTheme: state.theme.theme === 'light-theme',
    article: state.readArticle.article,
    loading: state.readArticle.loading,
    auth: state.auth,
    allComment: state.commentOnArticle.allComment
  };
};

export const mapDispatchToProps = dispatch => {
  return {
    fetchSingleArticle: slug => dispatch(getSingleArticle(slug)),
    createBookmark: (slug, token) => dispatch(createBookmark(slug, token)),
    rateArticleRequest: (payload, token) => {
      dispatch(rateArticleRequest(payload, token));
    },
    cleanUpRating: () => dispatch(cleanUpRating())
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ReadArticle);
