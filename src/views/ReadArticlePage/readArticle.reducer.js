import {
  // GET_SINGLE_ARTICLE_FAIL,
  GET_SINGLE_ARTICLE_SUCCESS,
  GET_SINGLE_ARTICLE_START
} from '../../actionTypes/index';

import { updateObject } from '../../utils/helper';

const initialState = {
  article: null,
  loading: false
};

const getSingleArticleStart = state => {
  return updateObject(state, {
    loading: true
  });
};

const getSingleArticleSuccess = (state, action) => {
  return updateObject(state, {
    article: action.article,
    loading: false
  });
};

export default (state = initialState, action) => {
  switch (action.type) {
    case GET_SINGLE_ARTICLE_START:
      return getSingleArticleStart(state, action);
    case GET_SINGLE_ARTICLE_SUCCESS:
      return getSingleArticleSuccess(state, action);

    default:
      return state;
  }
};
