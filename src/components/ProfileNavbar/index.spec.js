import React from 'react';
import { shallow, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import ProfileNavbar from './index';

configure({ adapter: new Adapter() });

describe('<ProfileNavbar />', () => {
  it('should render light theme ArticleCard', () => {
    const props = {
      lightTheme: true,
      active: 'published'
    };
    shallow(<ProfileNavbar {...props} />);
  });

  it('should render dark theme ArticleCard', () => {
    const prop = {
      lightTheme: false,
      active: 'draft'
    };
    shallow(<ProfileNavbar {...prop} />);
  });

  it('should render dark theme ArticleCard', () => {
    const prop = {
      lightTheme: false,
      active: 'bookmark'
    };
    shallow(<ProfileNavbar {...prop} />);
  });

  it('should render dark theme ArticleCard', () => {
    const prop = {
      lightTheme: false,
      active: 'followers'
    };
    shallow(<ProfileNavbar {...prop} />);
  });

  it('should render dark theme ArticleCard', () => {
    const prop = {
      lightTheme: false,
      active: 'following'
    };
    shallow(<ProfileNavbar {...prop} />);
  });
});
