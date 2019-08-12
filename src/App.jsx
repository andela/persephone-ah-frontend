import React, { Component } from 'react';
import { hot } from 'react-hot-loader';
import { ToastContainer, Slide } from 'react-toastify';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import HomePage from './views/HomePage/index.jsx';
import PropTypes from 'prop-types';
import 'react-toastify/dist/ReactToastify.css';
import LoginPage from './views/LoginPage/index.jsx';
import { Provider } from 'react-redux';
import jwt_decode from 'jwt-decode';
import setupStore from './store';
import './styles/main.scss';
import 'react-toastify/dist/ReactToastify.css';
import Header from './components/Header/index.jsx';
import Footer from './components/Footer/index.jsx';
import SignupPage from './views/SignupPage/index.jsx';
import ReadArticle from './views/ReadArticlePage/index.jsx';
import VerifyUser from './views/VerifyUserPage/index.jsx';
import AllArticlesPage from './views/AllArticlesPage/index.jsx';
import SocialLogin from './components/Social/index.jsx';
import CreateArticle from './views/CreateArticle/index.jsx';
import PrivateRoute from './views/AppRouter/PrivateRoute.js';
import { setCurrentUser, logout } from './views/Auth/auth.action.js';
import DraftArticle from './views/DraftArticle/index.jsx';
import PublishedArticle from './views/PublishedArticle/index.jsx';

const store = setupStore();
if (localStorage.user) {
  // get user object
  const user = JSON.parse(localStorage.user);
  // set current user
  store.dispatch(setCurrentUser(user));
}

class App extends Component {
  state = {
    user: null
  };

  componentDidMount() {
    if (localStorage.user) {
      // get user object
      const user = JSON.parse(localStorage.user);
      // set current user
      store.dispatch(setCurrentUser(user));
      // this.setState({ user });
      // for expired token
      const currentTime = Date.now() / 1000;
      //decode the token
      const decoded = jwt_decode(user.token);
      if (decoded.exp < currentTime) {
        // logout current user
        store.dispatch(logout(this.props.history));
        window.location.href = '/login';
      }
    }
  }
  render() {
    return (
      <Provider store={store}>
        <Router>
          <Route component={Header} />

          <ToastContainer
            autoClose={3000}
            transition={Slide}
            position="top-center"
          />

          <Switch>
            <PrivateRoute path="/verify" component={VerifyUser} />
            <PrivateRoute path="/compose" component={CreateArticle} />
            <Route path="/" exact component={HomePage} />
            <Route path="/login" component={LoginPage} />
            <Route path="/signup" component={SignupPage} />
            <Route
              path="/articles/:slug"
              render={props => (
                <ReadArticle
                  {...props}
                  token={this.state.user && this.state.user.token}
                />
              )}
            />
            <Route path="/articles" component={AllArticlesPage} />
            <Route path="/social" component={SocialLogin} />
            <Route path="/articles/:slug" component={ReadArticle} />
            <PrivateRoute path="/publication" component={PublishedArticle} />
            <PrivateRoute path="/draft" component={DraftArticle} />
          </Switch>
          <Footer />
        </Router>
      </Provider>
    );
  }
}

App.propTypes = {
  history: PropTypes.object
};
export default hot(module)(App);
