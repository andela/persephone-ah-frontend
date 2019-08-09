import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { themeToggler } from './index.action';
import Toggle from '../../components/Toggle/index.jsx';
import './header.scss';
import IconComponent from '../IconComponent/index.jsx';

export class Header extends Component {
  constructor() {
    super();
    this.state = {
      toggle: 'switch',
      theme: 'light-theme'
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
            >
              <span className="navbar-toggler-icon"></span>
            </button>

            <div
              className="collapse navbar-collapse"
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
  theme: PropTypes.object
};

const mapStateToProps = state => ({
  theme: state.theme
});

export default connect(
  mapStateToProps,
  { themeToggler }
)(Header);
