import React from 'react';
import PropTypes from 'prop-types';
import './ArticleCard.scss';

// how to make use of the image tag
{
  /* <img src={'../../src/assets/images/react.png'} className="float-left avatarImage" alt="author" /> */
}

const articleCard = props => {
  const articleImage = Object.values(JSON.parse(props.image));
  return (
    <div className={`card articleCard ${props.theme}`}>
      <img className="card-img-top" src={articleImage[0]} alt="article" />
      <div className={`card-body ${props.theme}`}>
        <h5 className="card-title">{props.title}</h5>
        <div className="card-text flex">
          <div className="avatar">
            <img
              src={props.author.image}
              className="float-left avatarImage"
              alt="author"
            />

            <span>
              <div>{`${props.author.firstName} ${props.author.lastName}`}</div>

              <div>
                {' '}
                <small>{props.author.email}</small>
              </div>
            </span>
          </div>

          <div className="flex mins-read">
            <small>{props.readTime} </small>
            <small> </small>
          </div>
        </div>
      </div>
    </div>
  );
};

articleCard.propTypes = {
  articleImage: PropTypes.any,
  theme: PropTypes.any,
  articleTitle: PropTypes.any,
  authorImage: PropTypes.any,
  author: PropTypes.object,
  email: PropTypes.any,
  readTime: PropTypes.any,
  image: PropTypes.any,
  title: PropTypes.string
};

export default articleCard;
