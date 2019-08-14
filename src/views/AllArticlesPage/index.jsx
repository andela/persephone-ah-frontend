import React, { Component } from 'react';
import Button from '../../components/Button/index.jsx';
import Input from '../../components/Input/index.jsx';
import ArticleCards from '../../components/ArticleCard/index.jsx';
import LoadingIndicator from '../../components/LoadingIndicator/index.jsx';
import axios from 'axios';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import './style.scss';
import InfiniteScroll from 'react-infinite-scroll-component';
export class ArticlesPage extends Component {
  state = {
    allArticles: [],
    allTags: [],
    isLoading: true,
    nextPage: ''
  };

  async componentDidMount() {
    const responseArticles = await axios.get(
      `${process.env.BASE_URL}articles?limit=9`
    );
    this.setState({
      allArticles: responseArticles.data.data.allArticles,
      nextPage: responseArticles.data.data.pageResponse.nextPage,
      isLoading: false
    });
  }

  fetchMoreArticles = async () => {
    const limit = this.state.allArticles.length + 9;
    const responsePromise = await axios.get(
      `${process.env.BASE_URL}articles?limit=${limit}`
    );
    const response = await responsePromise;
    this.setState({
      allArticles: response.data.data.allArticles,
      nextPage: response.data.data.pageResponse.nextPage,
      isLoading: false
    });
  };

  render() {
    const { isLoading, allArticles, nextPage } = this.state;
    const { theme } = this.props.theme;
    return (
      <>
        <div className="top-panel">
          <p className="catch-phrase text-center">
            Find the best resources on tech related articles{' '}
          </p>
          <div className="action-fields">
            <select className="tagFilter" name="Tag filter">
              <option value="firstOption">First Option</option>
              <option value="secondOption">Second Option</option>
              <option value="thirdOption">Third Option</option>
              <option value="fourthOption">Fourth Option</option>
              <option value="fifthOption">Fifth Option</option>
              <option value="sixthOption">Sixth Option</option>
            </select>
            <form className="form-search">
              <Input
                customClassName="input-search"
                placeholder="Search"
                name="search"
              />
              <Button customClassName="button-search">Search</Button>
            </form>
          </div>
        </div>
        {isLoading ? (
          <div className="container mx-auto">
            <div className="col-md-12 center pt-4 pb-5">
              <LoadingIndicator customClassName="text-center" />{' '}
            </div>
          </div>
        ) : (
          <div className="container">
            <InfiniteScroll
              dataLength={this.state.allArticles.length}
              className="row"
              next={this.fetchMoreArticles}
              hasMore={nextPage}
              loader={<LoadingIndicator customClassName="text-center" />}
              endMessage={
                <p className="end-messsage">Yay! You have seen it all</p>
              }
            >
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
            </InfiniteScroll>
          </div>
        )}
      </>
    );
  }
}

ArticlesPage.propTypes = {
  theme: PropTypes.object
};

const mapStateToProps = state => ({
  theme: state.theme
});

export default connect(mapStateToProps)(ArticlesPage);
