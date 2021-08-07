import * as slice from '..';
import { APIErrorType } from '../types';

describe('WeatherForecast slice', () => {
  let state;

  beforeEach(() => {
    state = slice.initialState;
  });

  it('should return the initial state', () => {
    expect(slice.reducer(undefined, { type: '' })).toEqual(state);
  });

  it('should handle changeLocationName', () => {
    const text = 'test';
    expect(
      slice.reducer(
        state,
        slice.weatherForecastActions.changeLocationName(text),
      ),
    ).toEqual({
      ...slice.initialState,
      locationName: text,
    });
  });

  it('should handle loadForecasts', () => {
    expect(
      slice.reducer(state, slice.weatherForecastActions.loadForecasts()),
    ).toEqual({
      ...slice.initialState,
      loading: true,
      forecastday: [],
      error: null,
    });
  });

  it('should handle forecastsLoaded', () => {
    const forecasts = {
      forecastday: [{ name: 'test' }],
      current: {},
    };
    expect(
      slice.reducer(
        state,
        slice.weatherForecastActions.forecastsLoaded(forecasts),
      ),
    ).toEqual({
      ...slice.initialState,
      loading: false,
      current: forecasts.current,
      forecastday: forecasts.forecastday,
    });
  });

  it('should handle forecastError', () => {
    const forecastError = APIErrorType.API_KEY_INVALID;
    expect(
      slice.reducer(
        state,
        slice.weatherForecastActions.forecastError(forecastError),
      ),
    ).toEqual({
      ...slice.initialState,
      error: forecastError,
    });
  });
});
