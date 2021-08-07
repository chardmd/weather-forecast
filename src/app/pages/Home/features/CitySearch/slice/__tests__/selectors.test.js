import * as selectors from '../selectors';
import { APIErrorType } from '../types';
import { initialState } from '..';

describe('CitySearch selectors', () => {
  let state = {};

  beforeEach(() => {
    state = {};
  });

  it('should select the initial state', () => {
    expect(selectors.selectCity(state)).toEqual(initialState.city);
  });

  it('should select city', () => {
    const city = 'test';
    state = {
      citySearch: { ...initialState, city: city },
    };
    expect(selectors.selectCity(state)).toEqual(city);
  });

  it('should select city', () => {
    const location = { name: 'test' };
    state = {
      citySearch: { ...initialState, locations: [location] },
    };
    expect(selectors.selectLocations(state)).toEqual([location]);
  });

  it('should select error', () => {
    const error = APIErrorType.API_KEY_INVALID;
    state = {
      citySearch: { ...initialState, error: error },
    };
    expect(selectors.selectError(state)).toEqual(error);
  });

  it('should select loading', () => {
    const loading = true;
    state = {
      citySearch: { ...initialState, loading: loading },
    };
    expect(selectors.selectLoading(state)).toEqual(loading);
  });
});
