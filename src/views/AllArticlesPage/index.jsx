import React, { Component } from 'react';
import Button from '../../components/Button/index.jsx';
import Input from '../../components/Input/index.jsx';
import ArticleCards from '../../components/ArticleCard/index.jsx';
import LoadingIndicator from '../../components/LoadingIndicator/index.jsx';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import InfiniteScroll from 'react-infinite-scroll-component';
import './style.scss';
import {
  fetchAllTagsRequest,
  searchByTitleRequest,
  filterByTagsRequest,
  fetchArticlesRequest,
  fetchMoreArticlesRequest
} from './index.action';

export class ArticlesPage extends Component {
  async componentDidMount() {
    await this.props.fetchArticlesRequest();
    await this.props.fetchAllTagsRequest();
  }

  handleSubmit = async event => {
    event.preventDefault();
    await this.props.searchByTitleRequest(event.target.search.value);
  };

  handleSelectChange = async event => {
    console.log(event.target.value);
    await this.props.filterByTagsRequest(event.target.value);
  };

  render() {
    const { isLoading, articles, allArticles, allTags } = this.props.articles;
    const { theme } = this.props.theme;
    return (
      <div className="container">
        <div className="top-panel">
          <p className="catch-phrase text-center">
            Find the best resources on tech related articles{' '}
          </p>
          <div className="action-fields">
            <select
              disabled={allTags.length < 0}
              onChange={this.handleSelectChange}
              onBlur={this.handleSelectChange}
              className="tagFilter"
              name="Tag filter"
            >
              <option selected="true" disabled="disabled">
                filter by tags
              </option>
              {allTags.map(tag => (
                <option key={tag.id} value={tag.name}>
                  {tag.name}
                </option>
              ))}
            </select>
            <form className="form-search" onSubmit={this.handleSubmit}>
              <Input
                customClassName="input-search"
                placeholder="Search e.g Getting started with Reactjs and Redux"
                name="search"
              />
              <Button type="submit" customClassName="button-search">
                Search
              </Button>
            </form>
          </div>
        </div>
        <>
          {isLoading ? (
            <div className="container">
              <div className="col-md-12 center pt-4 pb-5">
                <LoadingIndicator />{' '}
              </div>
            </div>
          ) : (
            <>
              {allArticles.length < 1 ? (
                <InfiniteScroll
                  dataLength={
                    Object.keys(articles) < 1 ? 1 : articles.allArticles.length
                  }
                  className="row"
                  next={this.props.fetchMoreArticlesRequest}
                  hasMore={
                    Object.keys(articles) < 1
                      ? false
                      : articles.pageResponse.nextPage
                  }
                  loader={
                    <div className="container">
                      <div className="col-md-12 center pt-4 pb-5">
                        <LoadingIndicator />{' '}
                      </div>
                    </div>
                  }
                  endMessage={
                    <p className="end-messsage">Yay! You have seen it all</p>
                  }
                >
                  {Object.keys(articles) < 1
                    ? ''
                    : articles.allArticles.map(articleDetails => {
                        return (
                          <div className="col-md-4" key={articleDetails.id}>
                            <ArticleCards
                              theme={theme}
                              key={articleDetails.id}
                              {...articleDetails}
                            />
                          </div>
                        );
                      })}
                </InfiniteScroll>
              ) : (
                <div className="row">
                  {allArticles.map(articleDetails => {
                    return (
                      <div className="col-md-4" key={articleDetails.id}>
                        <ArticleCards
                          theme={theme}
                          key={articleDetails.id}
                          {...articleDetails}
                        />
                      </div>
                    );
                  })}
                </div>
              )}
            </>
          )}
          {}
        </>
      </div>
    );
  }
}

ArticlesPage.propTypes = {
  theme: PropTypes.object,
  filterByTagsRequest: PropTypes.func.isRequired,
  searchByTitleRequest: PropTypes.func.isRequired,
  fetchAllTagsRequest: PropTypes.func.isRequired,
  fetchArticlesRequest: PropTypes.func,
  fetchMoreArticlesRequest: PropTypes.func,
  articles: PropTypes.object
};

const mapStateToProps = state => ({
  theme: state.theme,
  articles: state.articles
});

export const mapDispatchToProps = dispatch => {
  return {
    filterByTagsRequest: async tag => dispatch(await filterByTagsRequest(tag)),
    searchByTitleRequest: async searchValue =>
      dispatch(await searchByTitleRequest(searchValue)),
    fetchAllTagsRequest: async () => dispatch(await fetchAllTagsRequest()),
    fetchMoreArticlesRequest: async () => {
      return dispatch(await fetchMoreArticlesRequest());
    },
    fetchArticlesRequest: async () => {
      return dispatch(await fetchArticlesRequest());
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ArticlesPage);
