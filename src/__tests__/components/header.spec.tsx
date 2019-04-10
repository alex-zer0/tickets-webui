import React from 'react';
import renderer from 'react-test-renderer';
import Header, { HeaderProps } from '../../components/header/Header';

describe('COMPONENTS: Header', () => {
  it('renders w/o exceptions', () => {
    const props: HeaderProps = {
      title: 'Event name',
      imageUrl: 'http://banner-image-url',
    };

    const tree = renderer
      .create(<Header {...props}/>)
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});
