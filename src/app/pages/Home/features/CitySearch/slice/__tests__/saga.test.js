import { put, takeLatest } from 'redux-saga/effects';
import * as slice from '..';

import { citySearchSaga, getLocations } from '../saga';
import { APIErrorType } from '../types';

describe('getLocations Saga', () => {
  let city;
  let locations;
  let getLocationsIterator;

  // We have to test twice, once for a successful load and once for an unsuccessful one
  // so we do all the stuff that happens beforehand automatically in the beforeEach
  beforeEach(() => {
    getLocationsIterator = getLocations();
    const delayDescriptor = getLocationsIterator.next().value;
    expect(delayDescriptor).toMatchSnapshot();

    const selectDescriptor = getLocationsIterator.next().value;
    expect(selectDescriptor).toMatchSnapshot();
  });

  it('should return error if city is empty', () => {
    city = '';
    const putDescriptor = getLocationsIterator.next(city).value;
    expect(putDescriptor).toEqual(
      put(slice.citySearchActions.locationError(APIErrorType.EMPTY_FIELD)),
    );

    const iteration = getLocationsIterator.next();
    expect(iteration.done).toBe(true);
  });

  it('should dispatch the locationsLoaded action if it requests the data successfully', () => {
    city = 'test';
    locations = [
      {
        name: 'test',
      },
    ];

    const requestDescriptor = getLocationsIterator.next(city).value;
    expect(requestDescriptor).toMatchSnapshot();

    const putDescriptor = getLocationsIterator.next(locations).value;
    expect(putDescriptor).toEqual(
      put(slice.citySearchActions.locationsLoaded(locations)),
    );
  });

  it('should dispatch the city not found error', () => {
    city = 'test';

    const requestDescriptor = getLocationsIterator.next(city).value;
    expect(requestDescriptor).toMatchSnapshot();

    const putDescriptor = getLocationsIterator.throw({
      response: { status: 401 },
    }).value;
    expect(putDescriptor).toEqual(
      put(slice.citySearchActions.locationError(APIErrorType.API_KEY_INVALID)),
    );
  });
  it('should dispatch the city has no location error', () => {
    city = 'test';
    locations = [];

    const requestDescriptor = getLocationsIterator.next(city).value;
    expect(requestDescriptor).toMatchSnapshot();

    const putDescriptor = getLocationsIterator.next(locations).value;
    expect(putDescriptor).toEqual(
      put(slice.citySearchActions.locationError(APIErrorType.NO_RESULT_FOUND)),
    );
  });
  it('should dispatch rate limit error', () => {
    city = 'test';

    const requestDescriptor = getLocationsIterator.next(city).value;
    expect(requestDescriptor).toMatchSnapshot();

    const putDescriptor = getLocationsIterator.throw({
      response: { status: 403 },
    }).value;
    expect(putDescriptor).toEqual(
      put(slice.citySearchActions.locationError(APIErrorType.RATE_LIMIT)),
    );
  });

  it('should dispatch the response error', () => {
    city = 'test';

    const requestDescriptor = getLocationsIterator.next(city).value;
    expect(requestDescriptor).toMatchSnapshot();

    const putDescriptor = getLocationsIterator.throw(
      new Error('some error'),
    ).value;
    expect(putDescriptor).toEqual(
      put(slice.citySearchActions.locationError(APIErrorType.RESPONSE_ERROR)),
    );
  });
});

describe('citySearchSaga Saga', () => {
  const citySearchIterator = citySearchSaga();
  it('should start task to watch for loadLocations action', () => {
    const takeLatestDescriptor = citySearchIterator.next().value;
    expect(takeLatestDescriptor).toEqual(
      takeLatest(slice.citySearchActions.loadLocations.type, getLocations),
    );
  });
});
