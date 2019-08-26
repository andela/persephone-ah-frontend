import { combineReducers } from 'redux';
import themeToggler from '../components/Header/index.reducer';
import authReducer from '../views/SignupPage/signup.reducer';
import loginReducer from '../views/LoginPage/login.reducer';
import singleArticleReducer from '../views/ReadArticlePage/readArticle.reducer';
import commentReducer from '../components/CreateComment/createComment.reducer';
import articlesReducer from '../views/AllArticlesPage/index.reducer';
import createArticle from '../views/CreateArticle/createArticle.reducer';

const rootReducer = combineReducers({
  theme: themeToggler,
  signup: authReducer,
  user: loginReducer,
  readArticle: singleArticleReducer,
  articleComment: commentReducer,
  articles: articlesReducer,
  createArticle
});

export default rootReducer;
