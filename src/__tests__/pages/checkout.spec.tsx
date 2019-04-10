import React from 'react';
import renderer from 'react-test-renderer';
import { fakeEvent } from '../../config/mocks';
import { Checkout, CheckoutProps } from '../../pages/checkout/Checkout';

describe('PAGES: Checkout', () => {
  it('renders w/o exceptions', () => {
    const props: CheckoutProps = {
      event: fakeEvent(),
      tickets: [],
      confirmReferenceId: null,
      confirmEventTickets: jest.fn(),
      releaseEventTickets: jest.fn(),
      resetConfirmReferenceId: jest.fn()
    };

    const tree = renderer
      .create(<Checkout {...props}/>)
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});
