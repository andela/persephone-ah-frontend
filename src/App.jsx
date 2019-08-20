import React, { Component } from 'react';
import { hot } from 'react-hot-loader';
import { ToastContainer, Slide } from 'react-toastify';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
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
    show: false
  };

  render() {
    return (
      <Provider store={store}>
        <Router>
          <Header />
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
            <Route path="/articles/:slug" component={ReadArticle} />
          </Switch>
          <Footer />
        </Router>
      </Provider>
    );
  }
}

export default hot(module)(App);
