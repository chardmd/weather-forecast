import { createSelector } from '@reduxjs/toolkit';

import { initialState } from '.';

// First select the relevant part from the state
const selectDomain = state => state.weatherForecast || initialState;

export const selectLocationName = createSelector(
  [selectDomain],
  weatherForecastState => weatherForecastState.locationName,
);

export const selectLoading = createSelector(
  [selectDomain],
  weatherForecastState => weatherForecastState.loading,
);

export const selectError = createSelector(
  [selectDomain],
  weatherForecastState => weatherForecastState.error,
);

export const selectForecasts = createSelector(
  [selectDomain],
  weatherForecastState => weatherForecastState.forecastday,
);

export const selectCurrent = createSelector(
  [selectDomain],
  weatherForecastState => weatherForecastState.current,
);
