import * as selectors from '../selectors';
import { APIErrorType } from '../types';
import { initialState } from '..';

describe('WeatherForecast selectors', () => {
  let state = {};

  beforeEach(() => {
    state = {};
  });

  it('should select the initial state', () => {
    expect(selectors.selectLocationName(state)).toEqual(
      initialState.locationName,
    );
  });

  it('should select locationName', () => {
    const locationName = 'test';
    state = {
      weatherForecast: { ...initialState, locationName: locationName },
    };
    expect(selectors.selectLocationName(state)).toEqual(locationName);
  });

  it('should select locationName', () => {
    const forecast = { name: 'test' };
    state = {
      weatherForecast: { ...initialState, forecastday: [forecast] },
    };
    expect(selectors.selectForecasts(state)).toEqual([forecast]);
  });

  it('should select error', () => {
    const error = APIErrorType.API_KEY_INVALID;
    state = {
      weatherForecast: { ...initialState, error: error },
    };
    expect(selectors.selectError(state)).toEqual(error);
  });

  it('should select loading', () => {
    const loading = true;
    state = {
      weatherForecast: { ...initialState, loading: loading },
    };
    expect(selectors.selectLoading(state)).toEqual(loading);
  });
});
