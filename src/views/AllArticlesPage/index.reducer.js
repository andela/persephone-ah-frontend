import * as type from '../../actionTypes';

const initialSate = {
  allArticles: [],
  allTags: []
};

export default (state = initialSate, action) => {
  switch (action.type) {
    case type.ADD_ALL_ARTICLES:
      return {
        ...state,
        allArticles: action.payload,
        isLoading: false
      };
    case type.UPDATE_ARTICLES_LOADING:
      return {
        ...state,
        articlesLoading: action.payload,
        isLoading: true
      };
    case type.ADD_ALL_TAGS:
      return {
        ...state,
        allTags: action.payload,
        isLoading: false
      };
    default:
      return state;
  }
};
