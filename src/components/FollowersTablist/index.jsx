import React from 'react';
import PropTypes from 'prop-types';
import TablistContainer from '../TablistContainer/index.jsx';
import Button from '../../components/Button/index.jsx';

import './FollowersTablist.scss';

/**
 *  Sample Usage
 *  const props = {
      lightTheme: true,
      isFollowing: false,
      email: 'damilola.adekoya@andela.com',
      name: 'Damilola Adekoya'
    };
 *  <FollowersTablist {...props} />
 */

const followersTablist = props => {
  const isIn = true;

  let buttonText = props.isFollowing ? 'Following' : 'Follow';

  const customClassName = props.isFollowing ? 'following-hover' : 'follow-text';

  return (
    <TablistContainer lightTheme={props.lightTheme}>
      <div className="row followers-list">
        <div className="row follower-info">
          <img
            className="row"
            src="../../src/assets/images/20190731_095437.jpg"
            alt="profileImage of the user"
          />
          <h5>
            {props.name}
            <br />
            <small>{props.email}</small>
          </h5>
        </div>
        <div>
          <Button
            customClassName={customClassName}
            buttonText={buttonText}
            isInverse={isIn}
          />
        </div>
      </div>
    </TablistContainer>
  );
};

followersTablist.propTypes = {
  isFollowing: PropTypes.bool.isRequired,
  lightTheme: PropTypes.bool.isRequired,
  isIn: PropTypes.bool,
  name: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired
};

export default followersTablist;
