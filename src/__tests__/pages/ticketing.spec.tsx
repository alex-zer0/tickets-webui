import React from 'react';
import renderer from 'react-test-renderer';
import { fakeEvent } from '../../config/mocks';
import { Ticketing, TicketingProps } from '../../pages/ticketing/Ticketing';
import { BrowserRouter } from 'react-router-dom';

const ticketingProps: TicketingProps = {
  event: fakeEvent(),
  checkoutTickets: null,
  loading: false,
  match: { params: {} },
  checkoutEventTickets: jest.fn(),
  fetchEvent: jest.fn()
};

describe('PAGES: Ticketing', () => {
  it('renders Loader', () => {
    const props = {
      ...ticketingProps,
      loading: true,
    };
    const tree = renderer
      .create(<BrowserRouter><Ticketing {...props}/></BrowserRouter>)
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('renders w/o exceptions', () => {
    const tree = renderer
      .create(<BrowserRouter><Ticketing {...ticketingProps}/></BrowserRouter>)
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});
