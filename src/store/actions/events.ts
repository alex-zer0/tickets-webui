import {
  CHECKOUT_EVENT_TICKETS, FETCH_EVENT_BY_URL, FETCH_EVENTS,
  RELEASE_EVENT_TICKETS, RESET_EVENT_CONFIRM_REFERENCE_ID, CONFIRM_EVENT_TICKETS,
} from '../constants/events';
import { TicketFormEventTicket, UserInfo } from '../reducers/events';

export const fetchEvents = () => ({
  type: FETCH_EVENTS,
});

export const fetchEventByUrl = (url: string) => ({
  type: FETCH_EVENT_BY_URL,
  payload: { url },
});

export const checkoutEventTickets = (url: string, tickets: TicketFormEventTicket[]) => ({
  type: CHECKOUT_EVENT_TICKETS,
  payload: { url, tickets },
});

export const confirmEventTickets = (url: string, tickets: TicketFormEventTicket[], user: UserInfo) => ({
  type: CONFIRM_EVENT_TICKETS,
  payload: { url, tickets, user },
});

export const releaseEventTickets = (url: string, tickets: TicketFormEventTicket[]) => ({
  type: RELEASE_EVENT_TICKETS,
  payload: { url, tickets },
});

export const resetConfirmReferenceId = () => ({
  type: RESET_EVENT_CONFIRM_REFERENCE_ID
})
