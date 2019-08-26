import axios from 'axios';
import * as types from '../../actionTypes';
import { toast } from 'react-toastify';

export const createBookmarkSuccess = bookmark => {
  return {
    type: types.CREATE_BOOKMARK_SUCCESS,
    payload: bookmark
  };
};
export const createBookmarkFail = error => {
  return {
    type: types.CREATE_BOOKMARK_FAIL,
    payload: error
  };
};

export const createBookmark = (slug, token) => {
  if (!token) {
    toast.error('Please sign in to bookmark this article');
  }
  return async dispatch => {
    try {
      const response = await axios.post(
        `https://persephone-backend-staging.herokuapp.com/api/v1/articles/${slug}/bookmarks`,
        null,
        {
          headers: { authorization: `Bearer ${token}` }
        }
      );

      if (response.status === 201) {
        toast.success(response.data.data.message);
        dispatch(createBookmarkSuccess(response.data.data.message));
      }
    } catch (error) {
      toast.error(error.response.data.data.message);
      dispatch(createBookmarkFail(error.response.data.data.message));
    }
  };
};
