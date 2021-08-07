import * as slice from '..';
import { APIErrorType } from '../types';

describe('CitySearch slice', () => {
  let state;

  beforeEach(() => {
    state = slice.initialState;
  });

  it('should return the initial state', () => {
    expect(slice.reducer(undefined, { type: '' })).toEqual(state);
  });

  it('should handle changeCity', () => {
    const text = 'test';
    expect(
      slice.reducer(state, slice.citySearchActions.changeCity(text)),
    ).toEqual({
      ...slice.initialState,
      city: text,
    });
  });

  it('should handle loadLocations', () => {
    expect(
      slice.reducer(state, slice.citySearchActions.loadLocations()),
    ).toEqual({
      ...slice.initialState,
      loading: true,
      locations: [],
      error: null,
    });
  });

  it('should handle locationsLoaded', () => {
    const locations = [{ name: 'test' }];
    expect(
      slice.reducer(state, slice.citySearchActions.locationsLoaded(locations)),
    ).toEqual({
      ...slice.initialState,
      loading: false,
      locations: locations,
    });
  });

  it('should handle locationError', () => {
    const locationError = APIErrorType.API_KEY_INVALID;
    expect(
      slice.reducer(
        state,
        slice.citySearchActions.locationError(locationError),
      ),
    ).toEqual({
      ...slice.initialState,
      error: locationError,
    });
  });
});
