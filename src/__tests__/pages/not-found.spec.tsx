import React from 'react';
import renderer from 'react-test-renderer';
import NotFound from '../../pages/NotFound';

describe('PAGES: NotFound', () => {
  it('renders w/o exceptions', () => {
    const tree = renderer.create(<NotFound />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
