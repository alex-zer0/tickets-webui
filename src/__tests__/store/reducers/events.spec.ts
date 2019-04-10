import { fakeEvent, fakeTickets } from 'src/config/mocks';
import {
  CHECKOUT_EVENT_TICKETS, FETCH_EVENT_BY_URL, FETCH_EVENT_BY_URL_SUCCESS,
  FETCH_EVENTS, FETCH_EVENTS_SUCCESS, RELEASE_EVENT_TICKETS, WS_EVENT_TICKETS,
} from 'src/store/constants/events';
import eventsReducer, { initialState } from 'src/store/reducers/events';

describe('REDUCERS: eventsReducer', () => {
  it('should return the initial state', () => {
    expect(eventsReducer(undefined, {type: ''})).toEqual(initialState);
  });

  it('should handle FETCH_EVENTS', () => {
    const action = {
      type: FETCH_EVENTS,
    };
    const expectedState = {
      ...initialState,
      events: null,
      loading: true,
    };
    expect(eventsReducer(undefined, action)).toEqual(expectedState);
  });

  it('should handle FETCH_EVENTS_SUCCESS', () => {
    const events = [{name: 'Test', id: 1, available: null}];
    const action = {
      type: FETCH_EVENTS_SUCCESS,
      payload: { events },
    };
    const expectedState = {
      ...initialState,
      loading: false,
      events,
    };
    expect(eventsReducer(undefined, action)).toEqual(expectedState);
  });

  it('should handle FETCH_EVENT_BY_URL', () => {
    const url = '/cocktail';
    const action = {
      type: FETCH_EVENT_BY_URL,
      payload: { url },
    };
    const expectedState = {
      ...initialState,
      activeEvent: null,
      eventLoading: true,
    };
    expect(eventsReducer(undefined, action)).toEqual(expectedState);
  });

  it('should handle FETCH_EVENT_BY_URL_SUCCESS', () => {
    const event = fakeEvent();
    const action = {
      type: FETCH_EVENT_BY_URL_SUCCESS,
      payload: { event },
    };
    const expectedState = {
      ...initialState,
      activeEvent: event,
      eventLoading: false,
    };
    expect(eventsReducer(undefined, action)).toEqual(expectedState);
  });

  it('should handle CHECKOUT_EVENT_TICKETS', () => {
    const tickets = fakeTickets();
    const action = {
      type: CHECKOUT_EVENT_TICKETS,
      payload: { tickets },
    };
    expect(eventsReducer(undefined, action)).toEqual(initialState);
  });

  it('should handle RELEASE_EVENT_TICKETS', () => {
    const action = {
      type: RELEASE_EVENT_TICKETS,
    };
    const expectedState = {
      ...initialState,
      checkoutTickets: null,
    };
    expect(eventsReducer(undefined, action)).toEqual(expectedState);
  });

  it('should handle WS_EVENT_TICKETS', () => {
    const action = {
      type: WS_EVENT_TICKETS,
      payload: {
        tickets: [{ id: 1, name: 'VIP', amount: 2 }],
      },
    };
    const state = {
      ...initialState,
      activeEvent: {
        ...fakeEvent(),
        tickets: fakeTickets(),
      },
    };
    const expectedState = { ...state };
    expectedState.activeEvent.tickets[0].available = 2;
    expect(eventsReducer(state, action)).toEqual(expectedState);
  });
});
