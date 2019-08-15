import React, { Component } from 'react';
import { hot } from 'react-hot-loader';
import { ToastContainer, Slide } from 'react-toastify';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import HomePage from './views/HomePage/index.jsx';
import LoginPage from './views/LoginPage/index.jsx';
import ArticlePage from './views/ArticlePage/index.jsx';
import { Provider } from 'react-redux';
import setupStore from './store';
import './styles/main.scss';
import 'react-toastify/dist/ReactToastify.css';
import Header from './components/Header/index.jsx';
import Footer from './components/Footer/index.jsx';
import SignupPage from './views/SignupPage/index.jsx';
import AllArticles from './views/AllArticlesPage/index.jsx';

const store = setupStore();
class App extends Component {
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
            <Route path="/article" component={ArticlePage} />
            <Route path="/articles" component={AllArticles} />
            <Route path="/signup" component={SignupPage} />
            <Route path="/articles" component={AllArticles} />
          </Switch>
          <Footer />
        </Router>
      </Provider>
    );
  }
}

export default hot(module)(App);
