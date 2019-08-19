import axios from 'axios';
import * as actionTypes from '../../actionTypes/index';

export const getSingleArticleStart = () => {
  return {
    type: actionTypes.GET_SINGLE_ARTICLE_START
  };
};

export const getSingleArticleSuccess = article => {
  return {
    type: actionTypes.GET_SINGLE_ARTICLE_SUCCESS,
    article
  };
};

export const getSingleArticle = slug => {
  return dispatch => {
    dispatch(getSingleArticleStart());
    return axios
      .get(
        `https://persephone-backend-staging.herokuapp.com/api/v1/articles/${slug}`
      )
      .then(response => {
        const { data } = response.data;
        dispatch(getSingleArticleSuccess(data));
      });
  };
};
