import { combineReducers } from 'redux';
import themeToggler from '../components/Header/index.reducer';
import authReducer from '../views/SignupPage/signup.reducer';
import loginReducer from '../views/LoginPage/login.reducer';
import singleArticleReducer from '../views/ReadArticlePage/readArticle.reducer';
import commentReducer from '../components/CreateComment/createComment.reducer';

const rootReducer = combineReducers({
  theme: themeToggler,
  signup: authReducer,
  user: loginReducer,
  readArticle: singleArticleReducer,
  articleComment: commentReducer
});

export default rootReducer;
