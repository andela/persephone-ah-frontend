import * as types from '../../actionTypes';

const bookmarkReducer = (state = {}, action) => {
  switch (action.type) {
    case types.CREATE_BOOKMARK_SUCCESS:
      return { ...state, bookmarkCreated: action.payload };
    case types.CREATE_BOOKMARK_FAIL:
      return { ...state, bookmarkCreatedError: action.payload };
    case types.DELETE_BOOKMARK_SUCCESS:
      return { ...state, bookmarkDeleted: action.payload };
    case types.DELETE_BOOKMARK_FAIL:
      return { ...state, bookmarkDeletedError: action.payload };
    case types.GET_ALL_BOOKMARKS_SUCCESS:
      return { ...state, allUserBookmark: action.payload };
    case types.GET_ALL_BOOKMARKS_FAIL:
      return { ...state, allUserBookmarkError: action.payload };
    default:
      return state;
  }
};
export default bookmarkReducer;
