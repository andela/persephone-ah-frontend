import React from 'react';
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
  return (
    <div className={profileNavbarClass.join(' ')}>
      <div className="row profile-navbar flex">
        <div className="profile">
          <img
            src={props.authorImage}
            className="float-left profileImage"
            alt="author"
          />

          <p>
            {props.authorName}
            <br />
            <small>{props.username}</small>
          </p>
        </div>

        <div className="profile-navbar-button">
          <Button customClassName={btnClass.join(' ')}>Edit profile</Button>
        </div>
      </div>
      <div className="tabs-container">
        <ul className="row tabs">
          <li className="tab-focus">Publications</li>
          <li>Drafts</li>
          <li>Bookmarks</li>
          <li>Publications</li>
          <li>Followers</li>
          <li>Following</li>
        </ul>
      </div>
    </div>
  );
};

ProfileNavbar.propTypes = {
  lightTheme: PropTypes.bool,
  authorImage: PropTypes.any,
  authorName: PropTypes.string,
  username: PropTypes.string
};

export default ProfileNavbar;
