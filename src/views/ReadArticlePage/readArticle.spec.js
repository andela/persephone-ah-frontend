jest.unmock('axios');
import React from 'react';
import '@babel/polyfill';
import moxios from 'moxios';
import { mount, configure } from 'enzyme';
import { Provider } from 'react-redux';
import readArticleReducer from './readArticle.reducer';
import Adapter from 'enzyme-adapter-react-16';
import configureStore from 'redux-mock-store';
import { BrowserRouter } from 'react-router-dom';
import thunk from 'redux-thunk';
import {
  getSingleArticle,
  getSingleArticleStart,
  getSingleArticleSuccess,
} from './readArticle.action';
import { ReadArticle, mapDispatchToProps, mapStateToProps } from './index.jsx';
import {
  GET_SINGLE_ARTICLE_SUCCESS,
  GET_SINGLE_ARTICLE_START,
} from '../../actionTypes/index';

configure({ adapter: new Adapter() });

const middlewares = [thunk]; // add your middlewares like `redux-thunk`
const mockStore = configureStore(middlewares);

let store = mockStore({});

const response = {
  status: 'success',
  data: {
    id: 19,
    title: 'how-to-build-high-performance-teams',
    userId: 5,
    description: null,
    body:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi commodo nisl eget neque aliquam',
    image:
      '{"0":"https://res.cloudinary.com/fxola/image/upload/v1565123296/post/bump-collaboration-colleagues-1068523.jpg.jpg"}',
    readTime: '1 min read',
    viewsCount: 1,
    slug: 'how-to-build-high-performance-teams-16',
    isPublished: true,
    publishedAt: '2019-08-06T20:47:09.975Z',
    isDeleted: false,
    createdAt: '2019-08-06T20:44:44.966Z',
    updatedAt: '2019-08-12T01:23:34.044Z',
    deletedAt: null,
    author: {
      firstName: 'Halimah',
      lastName: 'Oladosu',
      image:
        'https://res.cloudinary.com/fxola/image/upload/v1562006344/avatar.png'
    },
    Tags: [
      {
        name: 'product'
      },
      {
        name: 'design'
      }
    ],
    likesCount: 0,
    likers: [],
    rating: {
      totalNumberOfRatings: 0,
      sumOfRatings: 0,
      averageRating: 0
    }
  }
};
describe('Read Single Article Page', () => {
  describe('ReadArticle Actions', () => {
    beforeEach(() => moxios.install());
    afterEach(() => moxios.uninstall());

    it('dispatches getSingleArticleStart action', done => {
      const expectedActions = [{ type: 'GET_SINGLE_ARTICLE_START' }];

      store.dispatch(getSingleArticleStart());

      expect(store.getActions()).toEqual(expectedActions);
      done();
    });

    it('dispatches getSingleArticleSuccess action', done => {
      const expectedActions = [
        { type: 'GET_SINGLE_ARTICLE_START' },
        {
          type: 'GET_SINGLE_ARTICLE_SUCCESS',
          article: {
            id: 19,
            title: 'how-to-build-high-performance-teams',
            userId: 5,
            description: null,
            body:
              'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi commodo nisl eget neque aliquam',
            image:
              '{"0":"https://res.cloudinary.com/fxola/image/upload/v1565123296/post/bump-collaboration-colleagues-1068523.jpg.jpg"}',
            readTime: '1 min read',
            viewsCount: 1,
            slug: 'how-to-build-high-performance-teams-16',
            isPublished: true,
            publishedAt: '2019-08-06T20:47:09.975Z',
            isDeleted: false,
            createdAt: '2019-08-06T20:44:44.966Z',
            updatedAt: '2019-08-12T01:23:34.044Z',
            deletedAt: null,
            author: {
              firstName: 'Halimah',
              lastName: 'Oladosu',
              image:
                'https://res.cloudinary.com/fxola/image/upload/v1562006344/avatar.png'
            },
            Tags: [
              {
                name: 'product'
              },
              {
                name: 'design'
              }
            ],
            likesCount: 0,
            likers: [],
            rating: {
              totalNumberOfRatings: 0,
              sumOfRatings: 0,
              averageRating: 0
            }
          }
        }
      ];

      store.dispatch(getSingleArticleSuccess(response.data));
      expect(store.getActions()).toEqual(expectedActions);
      done();
    });

    it('dispatches getSingleArticle action', done => {
      const slug = 'how-to-build-high-performance-teams-16';

      moxios.stubRequest(
        `https://persephone-backend-staging.herokuapp.com/api/v1/articles/${slug}`,
        {
          status: 200,
          response: response
        }
      );

      const expectedActions = [
        { type: 'GET_SINGLE_ARTICLE_START' },
        {
          type: 'GET_SINGLE_ARTICLE_SUCCESS',
          article: {
            id: 19,
            title: 'how-to-build-high-performance-teams',
            userId: 5,
            description: null,
            body:
              'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi commodo nisl eget neque aliquam',
            image:
              '{"0":"https://res.cloudinary.com/fxola/image/upload/v1565123296/post/bump-collaboration-colleagues-1068523.jpg.jpg"}',
            readTime: '1 min read',
            viewsCount: 1,
            slug: 'how-to-build-high-performance-teams-16',
            isPublished: true,
            publishedAt: '2019-08-06T20:47:09.975Z',
            isDeleted: false,
            createdAt: '2019-08-06T20:44:44.966Z',
            updatedAt: '2019-08-12T01:23:34.044Z',
            deletedAt: null,
            author: {
              firstName: 'Halimah',
              lastName: 'Oladosu',
              image:
                'https://res.cloudinary.com/fxola/image/upload/v1562006344/avatar.png'
            },
            Tags: [
              {
                name: 'product'
              },
              {
                name: 'design'
              }
            ],
            likesCount: 0,
            likers: [],
            rating: {
              totalNumberOfRatings: 0,
              sumOfRatings: 0,
              averageRating: 0
            }
          }
        },
        { type: 'GET_SINGLE_ARTICLE_START' }
      ];

      store.dispatch(getSingleArticle(slug));

      expect(store.getActions()).toEqual(expectedActions);
      done();
    });
  });

  describe('ReadArticle Reducers', () => {
    const initialState = {
      article: null,
      loading: false
    };

    it('Should return default state', () => {
      const newState = readArticleReducer(undefined, {});
      expect(newState).toEqual(initialState);
    });

    it('Should return a new state if it recieves GET_SINGLE_ARTICLE_START in action type', () => {
      const state = {
        article: null,
        loading: true
      };
      const newState = readArticleReducer(initialState, {
        type: GET_SINGLE_ARTICLE_START
      });
      expect(newState).toEqual(state);
    });

    it('Should return a new state if it recieves GET_SINGLE_ARTICLE_SUCCESS in action type', () => {
      const article = {
        id: 19,
        title: 'how-to-build-high-performance-teams',
        userId: 5,
        description: null
      };
      const expectedAction = {
        article: article,
        loading: false
      };
      const newState = readArticleReducer(initialState, {
        type: GET_SINGLE_ARTICLE_SUCCESS,
        article,
        loading: false
      });

      expect(newState).toEqual(expectedAction);
    });
  });

  describe('ReadArticle Page', () => {
    it('should render read article page', done => {
      const props = {
        lightTheme: false,
        article: null,
        fetchSingleArticle: jest.fn(),
        match: {
          params: 'product'
        },
        getAllUserBookmarks: jest.fn(),
        createBookmark: jest.fn(),
      };
      const readArticle = mount(
        <BrowserRouter>
          <ReadArticle {...props} />
        </BrowserRouter>
      );
      const loadingIcon = readArticle.find('.loader');
      expect(loadingIcon).toBeTruthy();
      done();
    });

    it('should render an article', done => {
      const props = {
        lightTheme: false,
        article: response.data,
        fetchSingleArticle: jest.fn(),
        getAllUserBookmarks: jest.fn(),
        createBookmark: jest.fn(),
        match: {
          params: 'product'
        },
        loading: false,
        token: 'some-token',
        bookmark: {
          allUserBookmark: {
            bookmarks: [
              {
                title: 'some title'
              }
            ]
          }
        }
      };
      let store = mockStore({
        theme: false,
        article: response.data,
        readArticle: response.data,
        articleComment: true,
        signup: { token: 'some-token' }
      });
      const readArticle = mount(
        <Provider store={store}>
          <BrowserRouter>
            <ReadArticle {...props} />
          </BrowserRouter>
        </Provider>
      );
      const readArticlePage = readArticle.find('.article-title');
      expect(readArticlePage).toBeTruthy();
      done();
    });

    it('should render with initial dispatch state', done => {
      const initialState = {
        readArticle: {
          article: null,
          loading: false
        },
        theme: {
          theme: 'dark-theme'
        }
      };

      expect(mapStateToProps(initialState).article).toEqual(null);
      expect(mapStateToProps(initialState).loading).toEqual(false);
      done();
    });

    it('should dispatch action', done => {
      const dispatch = jest.fn();
      mapDispatchToProps(dispatch).fetchSingleArticle();
      expect(typeof dispatch.mock.calls[0][0]).toEqual('function');
      done();
    });

    it('should dispatch createBookmark action', done => {
      const dispatch = jest.fn();
      mapDispatchToProps(dispatch).createBookmark();
      expect(typeof dispatch.mock.calls[0][0]).toEqual('function');
      done();
    });
  });
});
