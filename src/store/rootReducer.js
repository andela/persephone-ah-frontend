import { combineReducers } from 'redux';
import themeToggler from '../components/Header/index.reducer';
import signupReducer from '../views/SignupPage/signup.reducer';
import loginReducer from '../views/LoginPage/login.reducer';
import singleArticleReducer from '../views/ReadArticlePage/readArticle.reducer';
import commentReducer from '../components/CreateComment/createComment.reducer';
import articlesReducer from '../views/AllArticlesPage/index.reducer';
import authReducer from '../views/Auth/auth.reducer';

const rootReducer = combineReducers({
  theme: themeToggler,
  signup: signupReducer,
  user: loginReducer,
  auth: authReducer,
  readArticle: singleArticleReducer,
  articleComment: commentReducer,
  articles: articlesReducer
});

export default rootReducer;
