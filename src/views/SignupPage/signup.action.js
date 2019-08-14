import axios from 'axios';

import { toast } from 'react-toastify';
import * as actionTypes from '../../actionTypes/index';

export const userSignupStart = () => {
  return {
    type: actionTypes.USER_SIGNUP_START
  };
};

export const userSignupSuccess = (token, authData) => {
  return {
    type: actionTypes.USER_SIGNUP_SUCCESS,
    token,
    authData
  };
};

export const userSignupFailed = authError => {
  return {
    type: actionTypes.USER_SIGNUP_FAIL,
    authError
  };
};

export const authSignup = (userDetails, history) => {
  return dispatch => {
    dispatch(userSignupStart());
    return axios
      .post(
        'https://persephone-backend-staging.herokuapp.com/api/v1/users/signup',
        userDetails
      )
      .then(response => {
        const { token } = response.data.data;
        const { data } = response.data;
        localStorage.setItem('token', token);

        toast.success('Registration Successful');
        setTimeout(() => {
          history.push('/article');
        }, 3000);

        dispatch(userSignupSuccess(token, data));
      })
      .catch(error => {
        const { message } = error.response.data.data;

        toast.error(message);
        dispatch(userSignupFailed(message));
      });
  };
};
