import { Action } from 'redux';
import {
  FETCH_EVENT_BY_URL, FETCH_EVENT_BY_URL_FAIL, FETCH_EVENT_BY_URL_SUCCESS,
  FETCH_EVENTS, FETCH_EVENTS_FAIL, FETCH_EVENTS_SUCCESS,
  WS_EVENT_TICKETS, CHECKOUT_EVENT_TICKETS_SUCCESS, RELEASE_EVENT_TICKETS_SUCCESS,
  CONFIRM_EVENT_TICKETS_SUCCESS, RESET_EVENT_CONFIRM_REFERENCE_ID,
} from '../constants/events';

export interface UserInfo {
  firstName: string
  lastName: string
  email: string
  phone: string
}

export interface EventInfo {
  name: string
  url: string
  bannerUrl: string
  date: string
  location: string
  description: string
  tickets: EventTicket[]
}

export interface EventShortInfo {
  name: string
  url: string
}

export interface EventTicket {
  id: number
  name: string
  available: number | null
}

export interface TicketFormEventTicket extends EventTicket {
  state?: string | null
  amount?: number | null
  isReleased?: boolean
  isCheckedOut?: boolean
}

export interface EventsState {
  loading: boolean
  events: EventShortInfo[] | null
  eventLoading: boolean
  activeEvent: EventInfo | null
  error: string | null
  checkoutTickets: EventTicket[] | null
  confirmReferenceId: number | null
}

export const initialState = {
  activeEvent: null,
  checkoutTickets: null,
  error: null,
  eventLoading: false,
  events: null,
  confirmReferenceId: null,
  loading: false,
};

// ToDo: typesafe
export interface EventsAction extends Action {
  payload?: any
}

export default function eventsReducer(state: EventsState = initialState, action: EventsAction): EventsState {
  switch (action.type) {
    case FETCH_EVENTS:
      return {
        ...state,
        events: null,
        loading: true,
      };
    case FETCH_EVENTS_SUCCESS:
      return {
        ...state,
        error: null,
        events: action.payload.events,
        loading: false,
      };
    case FETCH_EVENTS_FAIL:
      return {
        ...state,
        error: action.payload.error,
        events: null,
        loading: false,
      };
    case FETCH_EVENT_BY_URL:
      return {
        ...state,
        activeEvent: null,
        eventLoading: true,
      };
    case FETCH_EVENT_BY_URL_SUCCESS:
      return {
        ...state,
        activeEvent: action.payload.event,
        error: null,
        eventLoading: false,
      };
    case FETCH_EVENT_BY_URL_FAIL:
      return {
        ...state,
        activeEvent: null,
        error: action.payload.error,
        eventLoading: false,
      };
    case CHECKOUT_EVENT_TICKETS_SUCCESS:
      return {
        ...state,
        checkoutTickets: action.payload.tickets,
      };
    case RELEASE_EVENT_TICKETS_SUCCESS:
      return {
        ...state,
        checkoutTickets: null,
      };
    case CONFIRM_EVENT_TICKETS_SUCCESS:
      return {
        ...state,
        confirmReferenceId: action.payload.referenceId
      };
    case RESET_EVENT_CONFIRM_REFERENCE_ID:
      return {
        ...state,
        confirmReferenceId: null,
        checkoutTickets: null
      };
    case WS_EVENT_TICKETS:
      if (!state.activeEvent || state.activeEvent.url !== action.payload.eventUrl) {
        return { ...state };
      }
      return {
        ...state,
        activeEvent: {
          ...state.activeEvent,
          tickets: state.activeEvent.tickets
            .map((eventTicket) => {
              const ticket = action.payload.tickets
                .find((t: EventTicket) => t.id === eventTicket.id);
              return ticket || eventTicket;
            }),
        },
      };
    default:
      return { ...state };
  }
}
