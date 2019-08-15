import React, { Component } from 'react';
import Button from '../../components/Button/index.jsx';
import Input from '../../components/Input/index.jsx';
import ArticleCards from '../../components/ArticleCard/index.jsx';
import LoadingIndicator from '../../components/LoadingIndicator/index.jsx';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import './style.scss';
import {
  fetchAllTagsRequest,
  searchByTitleRequest,
  filterByTagsRequest
} from './index.action';

export class ArticlesPage extends Component {
  async componentDidMount() {
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
    const { isLoading, allArticles, allTags } = this.props.articles;
    const { theme } = this.props.theme;
    return (
      <div>
        <div className="articles-wrapper">
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
                <option value="">filter by tags</option>
                {allTags.map(tag => (
                  <option key={tag.id} value={tag.name}>
                    {tag.name}
                  </option>
                ))}
              </select>
              <form className="form-search" onSubmit={this.handleSubmit}>
                <Input
                  customClassName="input-search"
                  placeholder="Search"
                  name="search"
                />
                <Button type="submit" customClassName="button-search">
                  Search
                </Button>
              </form>
            </div>
          </div>
          {isLoading ? (
            <div className="container mx-auto">
              <div className="col-md-12 center pt-4 pb-5">
                <LoadingIndicator />{' '}
              </div>
            </div>
          ) : (
            <div className="articles-main">
              {allArticles.length > 0 ? (
                allArticles.map(articleDetails => {
                  return (
                    <ArticleCards
                      theme={theme}
                      key={articleDetails.id}
                      {...articleDetails}
                    />
                  );
                })
              ) : (
                <p>No Articles found</p>
              )}
            </div>
          )}
        </div>
      </div>
    );
  }
}

ArticlesPage.propTypes = {
  theme: PropTypes.object,
  articles: PropTypes.object.isRequired,
  filterByTagsRequest: PropTypes.func.isRequired,
  searchByTitleRequest: PropTypes.func.isRequired,
  fetchAllTagsRequest: PropTypes.func.isRequired
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
    fetchAllTagsRequest: async () => dispatch(await fetchAllTagsRequest())
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ArticlesPage);
