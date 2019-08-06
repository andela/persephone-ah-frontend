import React, { Component } from 'react';
import { hot } from 'react-hot-loader';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import HomePage from './views/HomePage/index.jsx';
import LoginPage from './views/LoginPage/index.jsx';
import ArticlePage from './views/ArticlePage/index.jsx';
import { Provider } from 'react-redux';
import setupStore from './store';
import './styles/main.scss';
import Header from './components/Header/index.jsx';
import Footer from './components/Footer/index.jsx';

const store = setupStore();
class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Router>
          <Header />
          <Switch>
            <Route path="/" exact component={HomePage} />
            <Route path="/login" component={LoginPage} />
            <Route path="/article" component={ArticlePage} />
          </Switch>
          <Footer />
        </Router>
      </Provider>
    );
  }
}

export default hot(module)(App);
