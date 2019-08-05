import * as types from '../../actionTypes';
import initialState from '../../store/initialState';
const loginReducer = (state = initialState.user, action) => {
  switch (action.type) {
    case types.LOG_IN_USER:
      return { ...state, user: action.payload };
    case types.LOG_IN_USER_ERROR:
      return { ...state, error: action.payload };
    default:
      return state;
  }
};

export default loginReducer;
