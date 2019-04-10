import Pusher from 'pusher-js';
import { eventChannel } from 'redux-saga';
import { call, put, take } from 'redux-saga/effects';
import config from '../../config';
import { WS_EVENT_TICKETS } from '../constants/events';

function createEventChannel(pusher: Pusher.Pusher) {
  return eventChannel((emitter) => {
    const channel = pusher.subscribe(config.pusherTicketsChannel);
    channel.bind(config.pusherTicketsEvent, (data: object | string) => {
      emitter(data);
    });
    return () => channel.unbind(config.pusherTicketsEvent, emitter);
  });
}

export default function* wsEventsSaga() {
  const pusher = new Pusher(config.pusherAppKey, {
    cluster: config.pusherCluster,
    encrypted: true,
  });
  const channel = yield call(createEventChannel, pusher);
  try {
    while (true) {
    const data = yield take(channel);
    yield put({type: WS_EVENT_TICKETS, payload: data });
    }
  } finally {
    // tslint:disable-next-line
		console.error('WS Terminated!');
  }
}
