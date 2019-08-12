import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import IconComponent from '../IconComponent/index.jsx';
import './singleComment.scss';

const SingleComment = props => {
  const commentLikesCount = props.commentLikes.length;

  const commentClass = `single-comment-container ${props.theme}`;
  const { id, userComment, body, datePublished, handleLike } = props;
  const name = `${userComment.firstName} ${userComment.lastName}`;
  const commentBody = Object.values(body);
  return (
    <div className={commentClass}>
      <div className="card text-left">
        <div className="card-body">
          <p className="card-text">{commentBody}</p>
          <div className="row article-comment-details">
            <div className="row article-comment-author-detail">
              <div>
                <IconComponent
                  src={
                    userComment.image
                      ? userComment.image
                      : 'https://res.cloudinary.com/fxola/image/upload/v1562711912/ezkc4mj7pktwzqhmrbpt.png'
                  }
                  alt={'image asset'}
                  className="article-comment-author-image"
                />
              </div>
              <div className="article-comment-author-info">
                <h5>{name}</h5>
                <span>{userComment.lastName.toLowerCase()}@gmail.com</span>
              </div>
            </div>
            <div className="article-comment-like">
              <Link
                to="/"
                onClick={e => handleLike(e, id)}
                className="article-comment-like-click"
              >
                <IconComponent
                  src="../../../src/assets/images/like.svg"
                  alt={'image asset'}
                  className={'icon-small svg-fill'}
                />
              </Link>
              <span>{commentLikesCount}</span>
            </div>
          </div>
        </div>
        <div className="card-footer text-muted text-right">{datePublished}</div>
      </div>
    </div>
  );
};

SingleComment.propTypes = {
  theme: PropTypes.string,
  userComment: PropTypes.object,
  body: PropTypes.object,
  datePublished: PropTypes.string,
  handleLike: PropTypes.func,
  id: PropTypes.number
};

export default SingleComment;
