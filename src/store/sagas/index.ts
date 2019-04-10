import { all, fork } from 'redux-saga/effects';
import eventsSaga from './events';
import wsEventsSaga from './ws-events';

export default function* rootSaga() {
  yield all([
    fork(eventsSaga),
    fork(wsEventsSaga),
  ]);
}
