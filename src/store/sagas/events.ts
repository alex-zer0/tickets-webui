import { Action } from 'redux';
import { call, put, takeEvery, takeLatest } from 'redux-saga/effects';
import ApiService from 'src/services/api.service';
import {
  FETCH_EVENT_BY_URL, FETCH_EVENT_BY_URL_SUCCESS,
  FETCH_EVENTS, FETCH_EVENTS_SUCCESS, CHECKOUT_EVENT_TICKETS, CHECKOUT_EVENT_TICKETS_SUCCESS,
  RELEASE_EVENT_TICKETS_SUCCESS, CONFIRM_EVENT_TICKETS_SUCCESS, RELEASE_EVENT_TICKETS, CONFIRM_EVENT_TICKETS,
} from '../constants/events';
import { TicketFormEventTicket, UserInfo } from '../reducers/events';

interface FetchEventByUrlAction extends Action {
  payload: {
    url: string
  }
}
interface EventTicketsAction extends Action {
  payload: {
    url: string
    tickets: TicketFormEventTicket[]
  }
}
interface ConfirmEventTicketsAction extends Action {
  payload: {
    url: string
    tickets: TicketFormEventTicket[]
    user: UserInfo
  }
}

export function* fetchEvents() {
  const events = yield call(ApiService.getEvents);
  yield put({ type: FETCH_EVENTS_SUCCESS, payload: { events } });
}

export function* fetchEventByUrl(action: FetchEventByUrlAction) {
  const { url } = action.payload;
  const res = yield call(ApiService.getEventByUrl, url);
  yield put({ type: FETCH_EVENT_BY_URL_SUCCESS, payload: { event: res ? res.data : null } });
}

export function* checkoutEventTickets(action: EventTicketsAction) {
  const { url, tickets } = action.payload;
  const data = yield call(ApiService.checkoutTickets, url, tickets);
  if (data.success) {
    yield put({ type: CHECKOUT_EVENT_TICKETS_SUCCESS, payload: { tickets }});
  }
}

export function* releaseEventTickets(action: EventTicketsAction) {
  const { url, tickets } = action.payload;
  const data = yield call(ApiService.releaseTickets, url, tickets);
  if (data.success) {
    yield put({ type: RELEASE_EVENT_TICKETS_SUCCESS});
  }
}

export function* confirmEventTickets(action: ConfirmEventTicketsAction) {
  const { url, tickets, user } = action.payload;
  const data = yield call(ApiService.confirmTickets, url, tickets, user);
  if (data.success) {
    yield put({ type: CONFIRM_EVENT_TICKETS_SUCCESS, payload: { referenceId: data.referenceId }});
  }
}

export default function* eventsSaga() {
  yield takeLatest(FETCH_EVENTS, fetchEvents);
  yield takeEvery(FETCH_EVENT_BY_URL, fetchEventByUrl);
  yield takeEvery(CHECKOUT_EVENT_TICKETS, checkoutEventTickets);
  yield takeEvery(RELEASE_EVENT_TICKETS, releaseEventTickets);
  yield takeEvery(CONFIRM_EVENT_TICKETS, confirmEventTickets);
}
