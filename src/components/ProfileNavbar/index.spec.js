import React from 'react';
import { shallow, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import ProfileNavbar from './index';

configure({ adapter: new Adapter() });

describe('<ProfileNavbar />', () => {
  const props = {
    lightTheme: true
  };

  const prop = {
    lightTheme: false
  };
  it('should render light theme ArticleCard', () => {
    shallow(<ProfileNavbar {...props} />);
  });

  it('should render dark theme ArticleCard', () => {
    shallow(<ProfileNavbar {...prop} />);
  });
});
