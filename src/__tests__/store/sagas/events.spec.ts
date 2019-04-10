import sinon from 'sinon';
import ApiService from 'src/services/api.service';
import { fetchEvents, fetchEventByUrl } from 'src/store/sagas/events';
import { FETCH_EVENTS_SUCCESS, FETCH_EVENT_BY_URL, FETCH_EVENT_BY_URL_SUCCESS } from 'src/store/constants/events';
import { fakeEvent } from 'src/config/mocks';
import { call, put } from 'redux-saga/effects';

describe('SAGAS: events', () => {
    const sandbox = sinon.createSandbox()

    afterAll(() => {
      sandbox.restore()
    })

    describe('when fetchEvents triggered', () => {
        const events = [{id: 1}];
        const generator = fetchEvents();
        sinon.stub(ApiService, 'getEvents');

        it('should call getEvents API', () => {
            expect(generator.next().value)
                .toEqual(call(ApiService.getEvents));
        });
        it('should trigger fetch events success action', () => {
            expect(generator.next(events).value)
                .toEqual(put({ type: FETCH_EVENTS_SUCCESS, payload: { events } }));
        });
        it('should complete generator', () => {
            expect(generator.next().done).toBe(true);
        });
    });

    describe('when fetchEventByUrl triggered', () => {
        const url = 'http://some-url.net';
        const action = {type: FETCH_EVENT_BY_URL, payload: {url}};
        const event = fakeEvent();
        const generator = fetchEventByUrl(action);
        sinon.stub(ApiService, 'getEventByUrl');

        it('should call getEvents API', () => {
            expect(generator.next().value)
                .toEqual(call(ApiService.getEventByUrl, url));
        });
        it('should trigger fetch event by url success action', () => {
            expect(generator.next({data: event}).value)
                .toEqual(put({ type: FETCH_EVENT_BY_URL_SUCCESS, payload: { event } }));
        });
        it('should complete generator', () => {
            expect(generator.next().done).toBe(true);
        });
    });
});
