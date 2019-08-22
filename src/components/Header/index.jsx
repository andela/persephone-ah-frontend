import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { themeToggler } from './index.action';
import { logout } from '../../views/Auth/auth.action';
import Toggle from '../../components/Toggle/index.jsx';
import './header.scss';
import IconComponent from '../IconComponent/index.jsx';

export class Header extends Component {
  constructor() {
    super();
    this.state = {
      toggle: 'switch',
      theme: 'light-theme',
      auth: {},
      openNav: 'hidden'
    };
    this.handleClick = this.handleClick.bind(this);
    this.app_theme = localStorage.getItem('app_theme');
  }

  componentWillMount() {
    if (this.app_theme === null) {
      // dispatch an action
      this.props.themeToggler('dark-theme');
    }
    if (this.app_theme !== null) {
      // dispatch an action
      this.props.themeToggler(this.app_theme);
      document.body.classList.toggle(this.app_theme);
      // update state
      this.app_theme === 'light-theme'
        ? this.setState({ toggle: '', theme: 'dark-theme' })
        : '';
    }
  }

  handleLogOut(e) {
    e.preventDefault();
    this.props.logout(this.props.history);
  }

  handleClick() {
    if (this.app_theme !== null && this.app_theme === 'dark-theme') {
      document.body.classList.remove('dark-theme');
    }
    document.body.classList.toggle('light-theme');
    this.state.toggle === 'switch'
      ? this.setState({ toggle: '', theme: 'dark-theme' })
      : this.setState({ toggle: 'switch', theme: 'light-theme' });
    this.props.themeToggler(this.state.theme);
    // store user preference
    localStorage.setItem('app_theme', this.state.theme);
  }

  render() {
    const { toggle } = this.state;
    const { theme } = this.props.theme;
    const { isAuthenticated, user } = this.props.auth;
    const { image } = user;
    const { openNav } = this.state;
    return (
      <React.Fragment>
        <nav
          className={`${theme} navbar navbar-expand-lg navbar-light nav-shadow`}
        >
          <div className="container p-0">
            <div className="navbar-logo">
              <Link to="/">
                <h3 className="m-0">Author's Haven</h3>
              </Link>
            </div>
            <button
              className="navbar-toggler"
              type="button"
              data-toggle="collapse"
              data-target="#navbarSupportedContent"
              aria-controls="navbarSupportedContent"
              aria-expanded="false"
              aria-label="Toggle navigation"
              onClick={() => this.setState({ openNav: 'show' })}
            >
              <span className={`${theme} navbar-toggler`}>
                <div className={`${theme}`}></div>
                <div className={`${theme}`}></div>
                <div className={`${theme}`}></div>
              </span>
            </button>

            <div
              className={`${openNav} collapse navbar-collapse`}
              id="navbarSupportedContent"
            >
              <div className="navbar-nav ml-auto">
                <div className="mr-4 mt-1 display-flex ">
                  <div className="mr-1">
                    {theme === 'light-theme' ? (
                      <IconComponent
                        src="./../src/assets/images/sun-dark-mode.svg"
                        alt="sun-dark-mode"
                      />
                    ) : (
                      <IconComponent
                        src="./../src/assets/images/sun-light-mode.svg"
                        alt="sun-light-mode"
                      />
                    )}
                  </div>
                  <Toggle classToggle={toggle} handleClick={this.handleClick} />
                  <div className="ml-1">
                    {theme === 'light-theme' ? (
                      <IconComponent
                        src="./../src/assets/images/moon-dark-mode.svg"
                        alt="moon-dark-mode"
                      />
                    ) : (
                      <IconComponent
                        src="./../src/assets/images/moon-light-mode.svg"
                        alt="moon-light-mode"
                      />
                    )}
                  </div>
                </div>
                <hr className="border-1" />
                {isAuthenticated === false ? (
                  <React.Fragment>
                    <Link
                      to="/signup"
                      className="button  navbtn_signup button-normal border-0 pr-3 pl-3  pb-1 mr-4"
                    >
                      Sign Up
                    </Link>

                    <Link
                      to="/login"
                      className="button  navbtn_login button-inverse pr-3 pl-3   pb-1  mr-4"
                    >
                      Login
                    </Link>
                  </React.Fragment>
                ) : (
                  <React.Fragment>
                    <Link
                      to="/compose"
                      className="button compose-btn  navbtn_signup button-normal border-0 pr-3 pl-3  pb-1 mr-4"
                    >
                      Compose
                    </Link>
                    <div className="dropdown">
                      <div className="dropdown_btn">
                        {' '}
                        <IconComponent
                          id="userProfile"
                          alt="user profile page"
                          src={image ? image : ''}
                          className="user icon-medium rounded-circle"
                        />
                      </div>

                      <div className={`${theme} dropdown-fill`}>
                        <Link
                          onClick={this.handleLogOut.bind(this)}
                          to="/"
                          className="logout"
                        >
                          <i className="ion-log-out dropdown_icon pr-2"></i>Log
                          Out
                        </Link>
                      </div>
                    </div>
                  </React.Fragment>
                )}
              </div>
            </div>
          </div>
        </nav>
      </React.Fragment>
    );
  }
}

Header.propTypes = {
  themeToggler: PropTypes.func.isRequired,
  theme: PropTypes.object,
  auth: PropTypes.object,
  logout: PropTypes.func,
  history: PropTypes.object
};

const mapStateToProps = state => ({
  theme: state.theme,
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { themeToggler, logout }
)(Header);
