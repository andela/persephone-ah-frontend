import { APP_THEME } from '../../actionTypes';

const initialSate = {};

export default (state = initialSate, action) => {
  switch (action.type) {
    case APP_THEME:
      return {
        ...state,
        theme: action.payload
      };
    default:
      return state;
  }
};
