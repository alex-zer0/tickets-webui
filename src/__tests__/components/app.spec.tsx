import { shallow } from 'enzyme';
import React from 'react';
import App from '../../components/App';

describe('COMPONENTS: App', () => {
  it('renders w/o crashing', async () => {
    const wrapper = await shallow(<App />);
    expect(wrapper.exists()).toBeTruthy();
  });
});
