import { fakeTickets } from 'src/config/mocks';
import { checkoutEventTickets, fetchEventByUrl, fetchEvents, releaseEventTickets } from 'src/store/actions/events';
import {
  CHECKOUT_EVENT_TICKETS, FETCH_EVENT_BY_URL, FETCH_EVENTS, RELEASE_EVENT_TICKETS,
} from 'src/store/constants/events';

describe('ACTIONS: Events', () => {
  it('should create fetchEvents action', () => {
    const expectedAction = {
      type: FETCH_EVENTS,
    };
    expect(fetchEvents()).toEqual(expectedAction);
  });

  it('should create fetchEventByUrl action', () => {
    const url = 'Test Url';
    const expectedAction = {
      type: FETCH_EVENT_BY_URL,
      payload: { url },
    };
    expect(fetchEventByUrl(url)).toEqual(expectedAction);
  });

  it('should create checkoutEventTickets action', () => {
    const url = 'Test Url';
    const tickets = fakeTickets();
    const expectedAction = {
      type: CHECKOUT_EVENT_TICKETS,
      payload: { url, tickets },
    };
    expect(checkoutEventTickets(url, tickets)).toEqual(expectedAction);
  });

  it('should create releaseEventTickets action', () => {
    const url = 'Test Url';
    const tickets = fakeTickets();
    const expectedAction = {
      type: RELEASE_EVENT_TICKETS,
      payload: { url, tickets },
    };
    expect(releaseEventTickets(url, tickets)).toEqual(expectedAction);
  });
});
