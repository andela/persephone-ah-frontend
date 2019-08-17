import axios from 'axios';
import * as actionTypes from '../../actionTypes/index';

export const editProfileStart = () => {
  return {
    type: actionTypes.EDIT_PROFILE_START
  };
};

export const editProfileSuccess = userData => {
  return {
    type: actionTypes.EDIT_PROFILE_SUCCESS,
    userData
  };
};

export const editProfileFail = error => {
  return {
    type: actionTypes.EDIT_PROFILE_FAIL,
    error
  };
};

export const updateProfile = (userData, token) => {
  return dispatch => {
    dispatch(editProfileStart());
    return axios
      .put(
        'https://persephone-backend-staging.herokuapp.com/api/v1/users',
        userData,
        {
          headers: { authorization: `Bearer ${token}` }
        }
      )
      .then(response => {
        const { data } = response.data;
        const setUserData = {
          ...data,
          token
        };

        localStorage.setItem('user', JSON.stringify(setUserData));
        dispatch(editProfileSuccess(data));
        // dispatch(setCurrentUser(userData));
        // setTimeout(() => {
        //   dispatch(setCurrentUser(userData));
        // }, 5000);
      });
  };
};
