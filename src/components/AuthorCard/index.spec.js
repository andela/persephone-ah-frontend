import React from 'react';
import { shallow } from 'enzyme';
import AuthorCard from './';
import { BrowserRouter, Link } from 'react-router-dom';

describe('Render component', () => {
  it('renders The Author card component in dark mode when user is not following author', () => {
    const component = shallow(
      <AuthorCard
        image="./../src/assets/images/avatar.png"
        fullname="Firstname Lastname"
        handle="Lastma"
        bio="This would be a short summary of the users bio, for little interest
    display for readers"
        isFollowing={false}
        lightTheme={false}
      />
    );

    expect(
      component.contains(
        <p className="container-fluid author-bio small-text">
          This would be a short summary of the users bio, for little interest
          display for readers
        </p>
      )
    ).toBeTruthy();
    expect(
      component.contains(
        <div className="author-card-follow-button-container">
          <Link
            to="#"
            className="follow-author button author-card-follow-button isNotFollowing"
          >
            Follow
          </Link>
        </div>
      )
    ).toBeTruthy();
  });
  it('renders The Author card component in dark mode when user is following author', () => {
    const component = shallow(
      <AuthorCard
        image="./../src/assets/images/avatar.png"
        fullname="Firstname Lastname"
        handle="Lastma"
        bio="This would be a short summary of the users bio, for little interest
    display for readers"
        isFollowing={true}
        lightTheme={false}
      />
    );
    console.log(34, component.debug());

    expect(
      component.contains(
        <p className="container-fluid author-bio small-text">
          This would be a short summary of the users bio, for little interest
          display for readers
        </p>
      )
    ).toBeTruthy();
    expect(
      component.contains(
        <Link
          to="#"
          className="follow-author button author-card-follow-button isFollowing"
        >
          Following
        </Link>
      )
    ).toBeTruthy();
  });
  it('renders The Author card component in light mode when user is following author', () => {
    const component = shallow(
      <AuthorCard
        image="./../src/assets/images/avatar.png"
        fullname="Firstname Lastname"
        handle="Lastma"
        bio="This would be a short summary of the users bio, for little interest
    display for readers"
        isFollowing={true}
        lightTheme={true}
      />
    );

    console.log(34, component.debug());
    expect(
      component.contains(
        <p className="container-fluid author-bio small-text">
          This would be a short summary of the users bio, for little interest
          display for readers
        </p>
      )
    ).toBeTruthy();
    expect(
      component.contains(
        <div className="author-card-follow-button-container">
          <Link
            to="#"
            className="follow-author button author-card-follow-button isFollowing"
          >
            Following
          </Link>
        </div>
      )
    ).toBeTruthy();
  });
});
