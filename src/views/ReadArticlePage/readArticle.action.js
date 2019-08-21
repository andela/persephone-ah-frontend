import axiosUtil from '../../utils/axiosConfig';
import axios from 'axios';
import * as actionTypes from '../../actionTypes/index';
import { checkAuth } from '../../utils/checkAuth';

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

export const rateArticle = payload => {
  return { type: actionTypes.RATE_ARTICLE, payload };
};

export const rateArticleError = payload => {
  return { type: actionTypes.RATE_ARTICLE_ERROR, payload };
};

export const cleanUpRating = () => {
  return { type: actionTypes.CLEAN_UP_RATING, payload: {} };
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

export const rateArticleRequest = payload => {
  return async dispatch => {
    try {
      if (!checkAuth()) {
        throw {
          response: {
            data: {
              status: 'fail',
              data: `You need to sign in to rate this article`
            }
          }
        };
      }
      const user = JSON.parse(localStorage.getItem('user'));
      const response = await axiosUtil.post(`articles/ratings`, payload, {
        headers: { Authorization: `Bearer ${user.token}` }
      });
      dispatch(rateArticle(response.data));
      dispatch(cleanUpRating());
    } catch (error) {
      dispatch(rateArticleError(error.response.data));
      dispatch(cleanUpRating());
    }
  };
};
