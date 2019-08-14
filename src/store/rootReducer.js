import { combineReducers } from 'redux';
import themeToggler from '../views/LandingPage/index.reducer';
import authReducer from '../views/SignupPage/signup.reducer';

const rootReducer = combineReducers({
  theme: themeToggler,
  signup: authReducer
});

export default rootReducer;
