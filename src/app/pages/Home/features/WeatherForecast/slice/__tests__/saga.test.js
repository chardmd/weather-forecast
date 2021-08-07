import { put, takeLatest } from 'redux-saga/effects';
import * as slice from '..';

import { weatherForecastSaga, getForecast } from '../saga';
import { APIErrorType } from '../types';

describe('getForecast Saga', () => {
  let locationName;
  let forecastResult;
  let getForecastsIterator;

  // We have to test twice, once for a successful load and once for an unsuccessful one
  // so we do all the stuff that happens beforehand automatically in the beforeEach
  beforeEach(() => {
    getForecastsIterator = getForecast();
    const delayDescriptor = getForecastsIterator.next().value;
    expect(delayDescriptor).toMatchSnapshot();

    const selectDescriptor = getForecastsIterator.next().value;
    expect(selectDescriptor).toMatchSnapshot();
  });

  it('should return error if locationName is empty', () => {
    locationName = '';
    const putDescriptor = getForecastsIterator.next(locationName).value;
    expect(putDescriptor).toEqual(
      put(slice.weatherForecastActions.forecastError(APIErrorType.EMPTY_FIELD)),
    );

    const iteration = getForecastsIterator.next();
    expect(iteration.done).toBe(true);
  });

  it('should dispatch the forecastsLoaded action if it requests the data successfully', () => {
    locationName = 'test';
    forecastResult = {
      forecast: {
        current: {},
        forecastday: [{ name: 'test' }],
      },
    };
    const {
      forecast: { current, forecastday = [] },
    } = forecastResult;

    const requestDescriptor = getForecastsIterator.next(locationName).value;
    expect(requestDescriptor).toMatchSnapshot();

    const putDescriptor = getForecastsIterator.next(forecastResult).value;
    expect(putDescriptor).toEqual(
      put(
        slice.weatherForecastActions.forecastsLoaded({ current, forecastday }),
      ),
    );
  });

  it('should dispatch the city not found error', () => {
    locationName = 'test';

    const requestDescriptor = getForecastsIterator.next(locationName).value;
    expect(requestDescriptor).toMatchSnapshot();

    const putDescriptor = getForecastsIterator.throw({
      response: { status: 401 },
    }).value;
    expect(putDescriptor).toEqual(
      put(
        slice.weatherForecastActions.forecastError(
          APIErrorType.API_KEY_INVALID,
        ),
      ),
    );
  });
  it('should dispatch the city has no forecastResult error', () => {
    locationName = 'test';
    forecastResult = {
      forecast: {
        forecastday: [],
      },
    };

    const requestDescriptor = getForecastsIterator.next(locationName).value;
    expect(requestDescriptor).toMatchSnapshot();

    const putDescriptor = getForecastsIterator.next(forecastResult).value;
    expect(putDescriptor).toEqual(
      put(
        slice.weatherForecastActions.forecastError(
          APIErrorType.NO_RESULT_FOUND,
        ),
      ),
    );
  });
  it('should dispatch rate limit error', () => {
    locationName = 'test';

    const requestDescriptor = getForecastsIterator.next(locationName).value;
    expect(requestDescriptor).toMatchSnapshot();

    const putDescriptor = getForecastsIterator.throw({
      response: { status: 403 },
    }).value;
    expect(putDescriptor).toEqual(
      put(slice.weatherForecastActions.forecastError(APIErrorType.RATE_LIMIT)),
    );
  });

  it('should dispatch the response error', () => {
    locationName = 'test';

    const requestDescriptor = getForecastsIterator.next(locationName).value;
    expect(requestDescriptor).toMatchSnapshot();

    const putDescriptor = getForecastsIterator.throw(
      new Error('some error'),
    ).value;
    expect(putDescriptor).toEqual(
      put(
        slice.weatherForecastActions.forecastError(APIErrorType.RESPONSE_ERROR),
      ),
    );
  });
});

describe('weatherForecastSaga Saga', () => {
  const weatherForecastIterator = weatherForecastSaga();
  it('should start task to watch for loadForecasts action', () => {
    const takeLatestDescriptor = weatherForecastIterator.next().value;
    expect(takeLatestDescriptor).toEqual(
      takeLatest(slice.weatherForecastActions.loadForecasts.type, getForecast),
    );
  });
});
