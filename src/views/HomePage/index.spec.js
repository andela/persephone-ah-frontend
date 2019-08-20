import React from 'react';
import { mount, shallow } from 'enzyme';
import axios from 'axios';
import { BrowserRouter } from 'react-router-dom';
import { HomePage } from './index.jsx';
jest.unmock('axios');
const defaultProps = {
  themeToggler: jest.fn(),
  theme: {},
  fetchArticles: jest.fn()
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

  it('calls `fetchArticles` when mounted', () => {
    const state = {
      technologyArticles: [],
      startupArticles: [],
      productDesignArticles: [],
      isLoading: false,
      themeToggler: jest.fn(),
      theme: {}
    };
    const wrapper = shallow(<HomePage {...state} />);
    const instance = wrapper.instance();
    jest.spyOn(instance, 'fetchArticles');
    instance.componentDidMount();
    expect(instance.fetchArticles).toHaveBeenCalled();
  });

  it('fetches technology articles from server when server returns a successful response', done => {
    // 1
    const state = {
      technologyArticles: [],
      startupArticles: [],
      productDesignArticles: [],
      isLoading: false,
      themeToggler: jest.fn(),
      theme: {}
    };
    const mockSuccessResponse = {};
    const mockJsonPromise = Promise.resolve(mockSuccessResponse); // 2
    const mockFetchPromise = Promise.resolve({
      // 3
      response: () => mockJsonPromise({ data: {} })
    });
    jest.spyOn(axios, 'get').mockImplementation(() => mockFetchPromise); // 4

    const wrapper = shallow(<HomePage {...state} />); // 5

    expect(axios.get).toHaveBeenCalledTimes(1);
    process.nextTick(() => {
      // 6
      expect(wrapper.state()).toEqual({
        technologyArticles: [],
        startupArticles: [],
        productDesignArticles: [],
        isLoading: true
      });

      wrapper.instance().setState({ technologyArticles: mockFetchPromise });
      expect(wrapper.state()).toEqual({
        startupArticles: [],
        technologyArticles: mockFetchPromise,
        productDesignArticles: [],
        isLoading: true
      });

      axios.get.mockClear(); // 7
      done(); // 8
    });
  });
});
