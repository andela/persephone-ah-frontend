import React from 'react';
import { shallow } from 'enzyme';
import AuthorCard from './';

describe('Render component', () => {
  it('renders The Author card component', () => {
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
        <p className="author-bio small-text">
          This would be a short summary of the users bio, for little interest
          display for readers
        </p>
      )
    ).toBeTruthy();
    expect(
      component.contains(<span className="follow-text">Follow</span>)
    ).toBeTruthy();
  });

  it('renders The Author card component when isFollowing true', () => {
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
    expect(
      component.contains(
        <p className="author-bio small-text">
          This would be a short summary of the users bio, for little interest
          display for readers
        </p>
      )
    ).toBeTruthy();
    expect(
      component.contains(<span className="follow-text">Following</span>)
    ).toBeTruthy();
  });
});
