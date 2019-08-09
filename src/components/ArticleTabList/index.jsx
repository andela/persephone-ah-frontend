import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import IconComponent from '../IconComponent/index.jsx';
import TablistContainer from '../TablistContainer/index.jsx';
import './ArticleTabList.scss';

/**
 *  Sample Usage
 *  
 * const props = {
  lightTheme: true,
  articleTitle: 'Understanding redux and react',
  articleDescription: 'Redux the best storage system',
  publishedAt: 'July 28',
  readTime: '6 mins',
  numberLikes: 120,
  numberComment: 70
};
 *  <ArticleTabList {...props} />
 */
const articleCardList = props => {
  return (
    <TablistContainer lightTheme={props.lightTheme}>
      <div className="row article-tab-list">
        <div className=" col-md-3 col-sm-4 article-tab-list-image">
          <img
            src="../src/assets/images/20190731_095440.jpg"
            className="image-fluid"
            alt="article"
          />
        </div>
        <div className="col-md-1"></div>
        <div className="col-md-8 col-sm-6 article-tab-list-main-body">
          <div className="row body-cover">
            <div className="col-md-12 col-sm-12 article-tab-list-body">
              <h3>{props.articleTitle}</h3>
              <h5>{props.articleDescription}</h5>
              <small>
                {props.publishedAt} - {props.readTime} read
              </small>
            </div>

            <div className="row col-md-12 article-tablist-second">
              <div className="col-md-4 article-tab-list-icon">
                <div>
                  <IconComponent
                    src={'../src/assets/images/like.svg'}
                    alt={'image asset'}
                    className={'icon-small'}
                  />
                  <span>{props.numberLikes}</span>
                </div>

                <div className="article-tab-list-comment">
                  <IconComponent
                    src={'../src/assets/images/comment.svg'}
                    alt={'image asset'}
                    className={'icon-small'}
                  />
                  <span>{props.numberComment}</span>
                </div>
              </div>
              <div className="col-md-5"></div>
              <div className="col-md-3 article-tab-list-action">
                <Link to="#">Unpublish</Link>
                <Link to="#" className="article-tab-list-action-edit">
                  Edit
                </Link>
                <Link to="#">Trash</Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </TablistContainer>
  );
};

articleCardList.propTypes = {
  articleTitle: PropTypes.string.isRequired,
  lightTheme: PropTypes.bool.isRequired,
  numberComment: PropTypes.number,
  numberLikes: PropTypes.number.isRequired,
  publishedAt: PropTypes.string.isRequired,
  readTime: PropTypes.string.isRequired,
  articleDescription: PropTypes.string.isRequired
};

export default articleCardList;
