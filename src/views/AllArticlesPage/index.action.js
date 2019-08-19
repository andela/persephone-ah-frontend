import * as types from '../../actionTypes';
import axios from '../../utils/axiosConfig';

export const addAllArticles = articles => {
  return {
    type: types.ADD_ALL_ARTICLES,
    payload: articles
  };
};

export const updateArticlesLoading = () => {
  return {
    type: types.UPDATE_ARTICLES_LOADING
  };
};

export const addAllTags = tags => {
  return {
    type: types.ADD_ALL_TAGS,
    payload: tags
  };
};

export const fetchArticlesStart = () => {
  return { type: types.FETCH_ALL_ARTICLES_START };
};

export const fetchArticles = articles => {
  return { type: types.FETCH_ALL_ARTICLES, payload: articles };
};

export const fetchMoreArticles = articles => {
  return { type: types.FETCH_MORE_ARTICLES, payload: articles };
};

export const fetchAllTagsRequest = () => {
  return async dispatch => {
    const responseArticles = await axios.get(`articles/tags`);
    dispatch(addAllTags(responseArticles.data.data));
  };
};

export const searchByTitleRequest = keyWord => {
  return async dispatch => {
    dispatch(updateArticlesLoading());
    const responseArticles = await axios.get(`search?title=${keyWord}`);
    dispatch(addAllArticles(responseArticles.data.data.searchResult));
  };
};

export const filterByTagsRequest = keyWord => {
  return async dispatch => {
    dispatch(updateArticlesLoading());
    const responseArticles = await axios.get(`search?tag=${keyWord}`);
    dispatch(addAllArticles(responseArticles.data.data.searchResult));
  };
};

export const fetchArticlesRequest = () => {
  return async dispatch => {
    dispatch(fetchArticlesStart());
    const response = await axios.get('articles?limit=9');
    const { data } = response.data;
    dispatch(fetchArticles(data));
  };
};

export const fetchMoreArticlesRequest = () => {
  return async (dispatch, getState) => {
    const limit = getState().articles.articles.allArticles.length + 9;
    const response = await axios.get(`articles?limit=${limit}`);
    const { data } = response.data;
    dispatch(fetchMoreArticles(data));
  };
};
