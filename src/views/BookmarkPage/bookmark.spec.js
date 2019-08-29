import axios from 'axios';
import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { createBookmark } from '../BookmarkPage/bookmark.action';
import bookmarkReducer from '../BookmarkPage/bookmark.reducer';
import {
  CREATE_BOOKMARK_SUCCESS,
  CREATE_BOOKMARK_FAIL,
  DELETE_BOOKMARK_SUCCESS,
  DELETE_BOOKMARK_FAIL,
  GET_ALL_BOOKMARKS_SUCCESS,
  GET_ALL_BOOKMARKS_FAIL
} from '../../actionTypes';

configure({ adapter: new Adapter() });

jest.mock('axios');

describe('Bookmark Reducer Tests', () => {
  it('Should return a new state if it recieves a create bookmark action type', () => {
    const message = 'create bookmark successfully';
    const newState = bookmarkReducer(undefined, {
      type: CREATE_BOOKMARK_SUCCESS,
      payload: message
    });
    expect(newState).toEqual({
      bookmarkCreated: 'create bookmark successfully'
    });
  });

  it('Should return a new state if it recieves create bookmark error action type', () => {
    const message = 'create bookmark failed';
    const newState = bookmarkReducer(undefined, {
      type: CREATE_BOOKMARK_FAIL,
      payload: message
    });
    expect(newState).toEqual({
      bookmarkCreatedError: 'create bookmark failed'
    });
  });
  it('Should return a new state if it recieves a delete bookmark action type', () => {
    const message = 'bookmark deleted successfully';
    const newState = bookmarkReducer(undefined, {
      type: DELETE_BOOKMARK_SUCCESS,
      payload: message
    });
    expect(newState).toEqual({
      bookmarkDeleted: 'bookmark deleted successfully'
    });
  });

  it('Should return a new state if it recieves a bookmark delete error action type', () => {
    const message = 'bookmark delete failed';
    const newState = bookmarkReducer(undefined, {
      type: DELETE_BOOKMARK_FAIL,
      payload: message
    });
    expect(newState).toEqual({
      bookmarkDeletedError: 'bookmark delete failed'
    });
  });
  it('Should return a new state if it recieves a get all user bookmarks action type', () => {
    const message = 'all user bookmarks successfully';
    const newState = bookmarkReducer(undefined, {
      type: GET_ALL_BOOKMARKS_SUCCESS,
      payload: message
    });
    expect(newState).toEqual({
      allUserBookmark: 'all user bookmarks successfully'
    });
  });

  it('Should return a new state if it recieves a log in error action type', () => {
    const message = 'get all user bookmarks fail';
    const newState = bookmarkReducer(undefined, {
      type: GET_ALL_BOOKMARKS_FAIL,
      payload: message
    });
    expect(newState).toEqual({
      allUserBookmarkError: 'get all user bookmarks fail'
    });
  });
});

describe('Bookmarks Action Tests', () => {
  const bookmarkParams = {
    slug: 'some-slug',
    token: 'some-token'
  };
  const middleware = [thunk];
  const mockStore = configureMockStore(middleware);
  let store;
  beforeEach(() => {
    store = mockStore({});
    jest.resetAllMocks();
  });
  afterEach(() => {
    store.clearActions();
  });

  it('Should Trigger the CREATE_BOOKMARK_SUCCESS dispatch function', async () => {
    const response = {
      status: 201,
      data: {
        data: {
          message: 'Successful'
        }
      }
    };

    axios.post.mockResolvedValueOnce(response);

    const expectedActions = [
      { type: 'CREATE_BOOKMARK_SUCCESS', payload: 'Successful' }
    ];
    store
      .dispatch(createBookmark(bookmarkParams.slug, bookmarkParams.token))
      .then(() => {
        expect(store.getActions()).toEqual(expectedActions);
      });
  });

  it('Should Trigger the CREATE_BOOKMARK_FAIL dispatch function', async () => {
    const error = {
      response: {
        status: 400,
        data: {
          data: {
            message: 'fail'
          }
        }
      }
    };

    axios.post.mockRejectedValueOnce(error);

    const expectedActions = [{ type: 'CREATE_BOOKMARK_FAIL', payload: 'fail' }];
    store
      .dispatch(createBookmark(bookmarkParams.slug, bookmarkParams.token))
      .then(() => {
        expect(store.getActions()).toEqual(expectedActions);
      });
  });
});
