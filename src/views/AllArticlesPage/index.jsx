import React, { Component } from 'react';
import Button from '../../components/Button/index.jsx';
import Input from '../../components/Input/index.jsx';
import ArticleCards from '../../components/ArticleCard/index.jsx';
import LoadingIndicator from '../../components/LoadingIndicator/index.jsx';
import axios from 'axios';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import './style.scss';
// import IconComponent from '../../components/IconComponent/index.jsx';

export class ArticlesPage extends Component {
  state = {
    allArticles: [],
    allTags: [],
    isLoading: false
  };

  componentDidMount() {
    this.fetchArticles();
  }

  fetchArticles = async () => {
    this.setState({ isLoading: true });
    const responseArticles = await axios.get(`${process.env.BASE_URL}articles`);
    console.log(responseArticles);
    this.setState({
      allArticles: responseArticles.data.data.allArticles
    });
    this.setState({ isLoading: false });
  };

  render() {
    const { isLoading, allArticles } = this.state;
    const { theme } = this.props.theme;
    return (
      <div>
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
              <LoadingIndicator />{' '}
            </div>
          </div>
        ) : (
          <div className="articles-main">
            {allArticles.map(articleDetails => {
              return (
                <ArticleCards
                  theme={theme}
                  key={articleDetails.id}
                  {...articleDetails}
                />
              );
            })}
          </div>
        )}
      </div>
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
