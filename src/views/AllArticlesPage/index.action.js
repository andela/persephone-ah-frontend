import * as type from '../../actionTypes';
import axios from '../../utils/axiosConfig';

export const addAllArticles = articles => {
  return {
    type: type.ADD_ALL_ARTICLES,
    payload: articles
  };
};

export const updateArticlesLoading = () => {
  return {
    type: type.UPDATE_ARTICLES_LOADING
  };
};

export const addAllTags = tags => {
  return {
    type: type.ADD_ALL_TAGS,
    payload: tags
  };
};

export const fetchAllTagsRequest = () => {
  return async dispatch => {
    const responseArticles = await axios.get(`articles/tags`);
    dispatch(addAllTags(responseArticles.data.data));
  };
};

export const searchByTitleRequest = async keyWord => {
  return async dispatch => {
    // dispatch(updateArticlesLoading());
    const responseArticles = await axios.get(`search?title=${keyWord}`);
    dispatch(addAllArticles(responseArticles.data.data.searchResult));
  };
};

export const filterByTagsRequest = async keyWord => {
  return async dispatch => {
    // dispatch(updateArticlesLoading());
    const responseArticles = await axios.get(`search?tag=${keyWord}`);
    dispatch(addAllArticles(responseArticles.data.data.searchResult));
  };
};
