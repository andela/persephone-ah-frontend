import React from 'react';
import { mount } from 'enzyme';
import { BrowserRouter } from 'react-router-dom';
import { HomePage } from './index.jsx';

const defaultProps = {
  themeToggler: jest.fn(),
  theme: {}
};

describe('Render component', () => {
  it('should render component successfully', () => {
    const component = mount(
      <BrowserRouter>
        <HomePage {...defaultProps} />{' '}
      </BrowserRouter>
    );
    expect(
      component.contains(
        <h2 className="font-weight-light">
          Find the best resources on tech related articles
        </h2>
      )
    ).toBeTruthy();
  });

  it('should toggle to light theme', () => {
    const component = mount(
      <BrowserRouter>
        <HomePage {...defaultProps} />
      </BrowserRouter>
    );
    expect(component.find('button')).toBeTruthy();
    expect(component).toMatchSnapshot();
  });
});
