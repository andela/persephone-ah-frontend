import React, { Component } from 'react';
import { hot } from 'react-hot-loader';
import { ToastContainer, Slide } from 'react-toastify';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import HomePage from './views/HomePage/index.jsx';
import 'react-toastify/dist/ReactToastify.css';
import LoginPage from './views/LoginPage/index.jsx';
import ArticlePage from './views/ArticlePage/index.jsx';
import { Provider } from 'react-redux';
import setupStore from './store';
import './styles/main.scss';
import Header from './components/Header/index.jsx';
import Footer from './components/Footer/index.jsx';
import SignupPage from './views/SignupPage/index.jsx';

import ProfileNavBar from './components/ProfileNavbar/index.jsx';

const store = setupStore();
class App extends Component {
  state = {
    show: false,
    lightTheme: true,
    authorName: 'Halimah Oladosu',
    username: '@halimah',
    authorImage: '../src/assets/images/img.jpg'
  };

  handleClose = () => this.setState({ show: false });
  handleShow = () => this.setState({ show: true });

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
            <Route path="/signup" component={SignupPage} />
          </Switch>
          <ProfileNavBar
            lightTheme={this.state.lightTheme}
            authorName={this.state.authorName}
            username={this.state.username}
            authorImage={this.state.authorImage}
          />
          <br />
          <Footer />
        </Router>
      </Provider>
    );
  }
}

export default hot(module)(App);
