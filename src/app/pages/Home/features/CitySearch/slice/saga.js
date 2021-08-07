import { call, put, select, takeLatest, delay } from 'redux-saga/effects';
import { selectCity } from './selectors';
import { citySearchActions as actions } from '.';
import { APIErrorType } from './types';
import { request } from '../../../../../../utils/request';
import { getBaseEndpoint } from '../../../../../../utils/endpoint';

/**
 * City locations request/response handler
 */
export function* getLocations() {
  yield delay(500);
  // Select city from store
  const city = yield select(selectCity);
  if (city.length === 0) {
    yield put(actions.locationError(APIErrorType.EMPTY_FIELD));
    return;
  }
  const requestURL = `${getBaseEndpoint('search')}&q=${city}`;
  try {
    // call our util/request. We can also use axios to substitute
    let locations = yield call(request, requestURL);
    if (locations?.length > 0) {
      //only include the locations that contains the keyword
      locations = locations.filter(({ name }) =>
        name.toLowerCase().includes(city.toLowerCase()),
      );
      //we limit the resultset to 3
      locations = locations.slice(0, 3);
      yield put(actions.locationsLoaded(locations));
    } else {
      yield put(actions.locationError(APIErrorType.NO_RESULT_FOUND));
    }
  } catch (err) {
    if (err.response?.status === 401) {
      yield put(actions.locationError(APIErrorType.API_KEY_INVALID));
    } else if (err.response?.status === 403) {
      yield put(actions.locationError(APIErrorType.RATE_LIMIT));
    } else {
      yield put(actions.locationError(APIErrorType.RESPONSE_ERROR));
    }
  }
}

/**
 * Root saga manages watcher lifecycle
 */
export function* citySearchSaga() {
  yield takeLatest(actions.loadLocations.type, getLocations);
}
