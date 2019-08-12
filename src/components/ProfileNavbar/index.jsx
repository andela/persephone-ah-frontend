import React from 'react';
import { Link } from 'react-router-dom';
import './index.scss';
import Button from '../../components/Button/index.jsx';
import PropTypes from 'prop-types';

const ProfileNavbar = props => {
  let profileNavbarClass = ['navbar-container', 'dark-theme'];
  let btnClass = ['btn-navbar', 'btn-dark'];
  if (props.lightTheme) {
    profileNavbarClass.pop();
    btnClass.pop();
    profileNavbarClass.push('light-theme');
  }

  const name = `${props.firstName} ${props.lastName}`;
  return (
    <div className={profileNavbarClass.join(' ')}>
      <div className="row profile-navbar flex">
        <div className="profile">
          <img
            src={
              props.image
                ? props.image
                : 'https://res.cloudinary.com/fxola/image/upload/v1562711912/ezkc4mj7pktwzqhmrbpt.png'
            }
            className="float-left profileImage"
            alt="author"
          />

          <p>
            {name}
            <br />
            <small>@{props.firstName.toLowerCase()}</small>
          </p>
        </div>

        <div className="profile-navbar-button">
          <Button customClassName={btnClass.join(' ')}>Edit profile</Button>
        </div>
      </div>
      <div className="tabs-container">
        <ul className="row tabs">
          <li className={props.active === 'published' ? 'tab-focus' : ''}>
            <Link to="/publication">Publications</Link>
          </li>
          <li className={props.active === 'draft' ? 'tab-focus' : ''}>
            <Link to="/draft">Drafts</Link>
          </li>
          <li className={props.active === 'bookmark' ? 'tab-focus' : ''}>
            <Link to="/bookmark">Bookmarks</Link>
          </li>
          <li className={props.active === 'followers' ? 'tab-focus' : ''}>
            <Link to="/followers">Followers</Link>
          </li>
          <li className={props.active === 'following' ? 'tab-focus' : ''}>
            <Link to="/following">Following</Link>
          </li>
        </ul>
      </div>
    </div>
  );
};

ProfileNavbar.propTypes = {
  lightTheme: PropTypes.bool,
  userDetails: PropTypes.object,
  image: PropTypes.any,
  firstName: PropTypes.string,
  lastName: PropTypes.string,
  username: PropTypes.string,
  active: PropTypes.string
};

export default ProfileNavbar;
