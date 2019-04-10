import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import renderer from 'react-test-renderer';
import { Home, HomeProps } from '../../pages/home/Home';

const homeProps = {
  events: null,
  fetchEvents: jest.fn(),
  loading: false,
};

describe('PAGES: Home', () => {
  it('renders Loader', () => {
    const props: HomeProps = {
      ...homeProps,
      loading: true,
    };
    const tree = renderer
      .create(<Home {...props}/>)
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('renders Error', () => {
    const props: HomeProps = {
      ...homeProps,
      error: 'Test Error Message',
    };
    const tree = renderer
      .create(<Home {...props}/>)
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('renders as null', () => {
    const tree = renderer
      .create(<Home {...homeProps}/>)
      .toJSON();
    expect(tree).toEqual(null);
  });

  it('renders w/o exceptions', () => {
    const props: HomeProps = {
      ...homeProps,
      events: [{ name: 'Event name', url: '/event' }],
    };
    const tree = renderer
      .create(<BrowserRouter><Home {...props}/></BrowserRouter>)
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});
