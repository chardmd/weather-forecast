import { createSelector } from '@reduxjs/toolkit';

import { initialState } from '.';

// First select the relevant part from the state
const selectDomain = state => state.citySearch || initialState;

export const selectCity = createSelector(
  [selectDomain],
  citySearchState => citySearchState.city,
);

export const selectLoading = createSelector(
  [selectDomain],
  citySearchState => citySearchState.loading,
);

export const selectError = createSelector(
  [selectDomain],
  citySearchState => citySearchState.error,
);

export const selectLocations = createSelector(
  [selectDomain],
  citySearchState => citySearchState.locations,
);
