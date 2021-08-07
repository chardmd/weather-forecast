import { call, put, select, takeLatest, delay } from 'redux-saga/effects';
import { selectLocationName } from './selectors';
import { weatherForecastActions as actions } from '.';
import { APIErrorType } from './types';
import { request } from '../../../../../../utils/request';
import { getBaseEndpoint } from '../../../../../../utils/endpoint';

/**
 * Weather forecast request/response handler
 */
export function* getForecast() {
  yield delay(500);
  // Select locationName from store
  const locationName = yield select(selectLocationName);
  if (locationName.length === 0) {
    yield put(actions.forecastError(APIErrorType.EMPTY_FIELD));
    return;
  }
  const FORECAST_DAYS = 3;
  const requestURL = `${getBaseEndpoint(
    'forecast',
  )}&q=${locationName}&days=${FORECAST_DAYS}`;
  try {
    const {
      current = {},
      forecast: { forecastday = [] },
    } = yield call(request, requestURL);

    if (forecastday?.length > 0) {
      yield put(actions.forecastsLoaded({ current, forecastday }));
    } else {
      yield put(actions.forecastError(APIErrorType.NO_RESULT_FOUND));
    }
  } catch (err) {
    if (err.response?.status === 401) {
      yield put(actions.forecastError(APIErrorType.API_KEY_INVALID));
    } else if (err.response?.status === 403) {
      yield put(actions.forecastError(APIErrorType.RATE_LIMIT));
    } else {
      yield put(actions.forecastError(APIErrorType.RESPONSE_ERROR));
    }
  }
}

/**
 * Root saga manages watcher lifecycle
 */
export function* weatherForecastSaga() {
  yield takeLatest(actions.loadForecasts.type, getForecast);
}
