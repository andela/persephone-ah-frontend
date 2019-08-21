import React, { Component } from 'react';
import { hot } from 'react-hot-loader';
import { ToastContainer, Slide } from 'react-toastify';
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect
} from 'react-router-dom';
import HomePage from './views/HomePage/index.jsx';
import LoginPage from './views/LoginPage/index.jsx';
import { Provider } from 'react-redux';
import setupStore from './store';
import './styles/main.scss';
import 'react-toastify/dist/ReactToastify.css';
import Header from './components/Header/index.jsx';
import Footer from './components/Footer/index.jsx';
import SignupPage from './views/SignupPage/index.jsx';
import ReadArticle from './views/ReadArticlePage/index.jsx';
import VerifyUser from './views/VerifyUserPage/index.jsx';

const store = setupStore();
class App extends Component {
  state = {
    show: false,
    userToken: null,
    redirect: null
  };
  componentWillMount() {
    const user = localStorage.getItem('user');
    if (user) {
      const { token } = JSON.parse(user);
      this.setState({ userToken: token });
    }
    if (!user) {
      this.setState({ redirect: '/login' });
    }
  }
  render() {
    let authRedirect;
    if (this.state.redirect !== null) {
      authRedirect = <Redirect to="/login" />;
    }
    return (
      <Provider store={store}>
        <Router>
          <Header />
          {authRedirect}
          <ToastContainer
            autoClose={3000}
            transition={Slide}
            position="top-center"
          />
          <Switch>
            <Route path="/" exact component={HomePage} />
            <Route path="/login" component={LoginPage} />
            <Route path="/verify" component={VerifyUser} />
            <Route path="/signup" component={SignupPage} />
            <Route
              path="/articles/:slug"
              render={props => (
                <ReadArticle {...props} token={this.state.userToken} />
              )}
            />
          </Switch>
          <Footer />
        </Router>
      </Provider>
    );
  }
}

export default hot(module)(App);
