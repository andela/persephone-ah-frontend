import React from 'react';
import './index.scss';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import IconComponent from '../IconComponent/index.jsx';

const AuthorCard = props => {
  const { image, fullname, handle, bio, isFollowing, lightTheme } = props;

  const followText = isFollowing ? 'Following' : 'Follow';
  const followButtonClass = isFollowing
    ? 'follow-author button author-card-follow-button isFollowing'
    : 'follow-author button author-card-follow-button isNotFollowing';
  const themeClass = lightTheme ? 'author-card-light' : 'author-card-dark';

  return (
    <div className={themeClass}>
      <div className="container-fluid d-flex  pt-4 pb-3">
        <div>
          <IconComponent
            src={image}
            alt="avatar"
            className="rounded-circle author-image"
          />
        </div>
        <div className="row author-card-stat-container">
          <div className="row pl-3 author-card-user-details">
            <p className="small-text  author-name text-sm-left col-sm-12">
              {fullname}
            </p>
            <p className="small-text  text-sm-left col-sm-12">@{handle}</p>
          </div>
          <div className="container-fluid read-artile-like-stat">
            <span>
              25 <Link to="/#">Likes</Link>
            </span>
            <span>
              104 <Link to="/#">Bookmarks</Link>
            </span>
          </div>
          <div className="container-fluid read-article-social">
            <span>
              <IconComponent
                src={'../../src/assets/images/twitter-read-article.svg'}
                alt={'twitter asset'}
              />
            </span>
            <span>
              <IconComponent
                src={'../../src/assets/images/facebook-read-article.svg'}
                alt={'facebook asset'}
              />
            </span>
          </div>
        </div>
      </div>

      <hr />
      <p className="container-fluid author-bio small-text">{bio}</p>
      <div className="author-card-follow-button-container">
        <Link to="#" className={followButtonClass}>
          {followText}
        </Link>
      </div>
    </div>
  );
};

AuthorCard.propTypes = {
  image: PropTypes.string.isRequired,
  fullname: PropTypes.string.isRequired,
  handle: PropTypes.string.isRequired,
  bio: PropTypes.string.isRequired,
  isFollowing: PropTypes.bool.isRequired,
  lightTheme: PropTypes.bool.isRequired
};

export default AuthorCard;
