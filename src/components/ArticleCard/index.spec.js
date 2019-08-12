import React from 'react';
import { shallow, configure } from 'enzyme';
import { BrowserRouter } from 'react-router-dom';
import Adapter from 'enzyme-adapter-react-16';
import ArticleCard from './index.jsx';

configure({ adapter: new Adapter() });

describe('<ArticleCard />', () => {
  const articleDetails = {
    image: '{"0":"../../src/assets/images/profileImage.jpg"}',
    light: false,
    articleTitle: 'Understanding React and redux',
    authorImage: '../../src/assets/images/react.png',
    author: { author: 'Damilola Adekoya' },
    email: 'damilola.adekoya@andela.com',
    readTime: '6 mins',
    theme: false
  };
  it('should render light theme ArticleCard', () => {
    shallow(
      <BrowserRouter>
        <ArticleCard {...articleDetails} />
      </BrowserRouter>
    );
  });

  it('should render dark theme ArticleCard', () => {
    shallow(
      <BrowserRouter>
        <ArticleCard {...articleDetails} />
      </BrowserRouter>
    );
  });
});
