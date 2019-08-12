import React from 'react';
import './index.scss';
import PropTypes from 'prop-types';
import IconComponent from '../IconComponent/index.jsx';

const AuthorCard = props => {
  const { image, fullname, handle, bio, isFollowing, lightTheme } = props;

  const followText = isFollowing ? 'Following' : 'Follow';
  const followButtonClass = isFollowing
    ? 'follow-author isFollowing'
    : 'follow-author isNotFollowing';
  const themeClass = lightTheme ? 'author-card-light' : 'author-card-dark';

  return (
    <div className={themeClass}>
      <div className="container-fluid d-flex  pt-4">
        <IconComponent
          src={image}
          alt="avatar"
          className="rounded-circle author-image"
        />
        <div className="row pl-3">
          <p className="small-text  author-name text-sm-left col-sm-12">
            {fullname}
          </p>
          <p className="small-text  text-sm-left col-sm-12">@{handle}</p>
        </div>
      </div>
      <p className="author-bio small-text">{bio}</p>

      <button className={followButtonClass}>
        <span className="follow-text">{followText}</span>
      </button>
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
