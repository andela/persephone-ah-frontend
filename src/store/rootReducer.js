import { combineReducers } from 'redux';
import themeToggler from '../views/LandingPage/index.reducer';
import authReducer from '../views/SignupPage/signup.reducer';
import loginReducer from '../views/LoginPage/login.reducer';
import articlesReducer from '../views/AllArticlesPage/index.reducer';

const rootReducer = combineReducers({
  theme: themeToggler,
  signup: authReducer,
  user: loginReducer,
  articles: articlesReducer
});

export default rootReducer;
