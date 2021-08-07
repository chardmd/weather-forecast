//Combine all reducers and export it.
import { combineReducers } from '@reduxjs/toolkit';

//Merges the main reducer with the router state and dynamically injected reducers
export const createReducer = (injectedReducers = {}) => {
  if (Object.keys(injectedReducers).length === 0) {
    return state => state;
  } else {
    return combineReducers({
      ...injectedReducers,
    });
  }
};
