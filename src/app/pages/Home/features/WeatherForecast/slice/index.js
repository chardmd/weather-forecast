import { createSlice } from '../../../../../../utils/toolkit';
import {
  useInjectReducer,
  useInjectSaga,
} from '../../../../../../utils/redux-injectors';
import { weatherForecastSaga } from './saga';
import { citySearchActions } from '../../CitySearch/slice/index';

export const initialState = {
  locationName: 'Sydney',
  current: null,
  forecastday: [],
  loading: false,
  error: null,
};

const slice = createSlice({
  name: 'weatherForecast',
  initialState,
  reducers: {
    changeLocationName(state, action) {
      state.locationName = action.payload;
    },
    loadForecasts(state) {
      state.loading = true;
      state.error = null;
      state.forecastday = [];
    },
    forecastsLoaded(state, action) {
      const forecasts = action.payload;
      const { current, forecastday } = forecasts;
      state.forecastday = forecastday;
      state.current = current;
      state.loading = false;
    },
    forecastError(state, action) {
      state.error = action.payload;
      state.loading = false;
    },
  },
  //this is how we communicate to CitySearch component
  extraReducers: builder => {
    builder
      .addCase(citySearchActions.locationsLoaded, (state, action) => {
        if (action.payload?.length > 0) {
          state.locationName = action.payload[0].name;
        } else {
          state.locationName = '';
          state.current = {};
          state.forecastday = [];
          state.locationName = '';
          state.loading = false;
        }
      })
      .addCase(citySearchActions.locationError, state => {
        state.current = {};
        state.forecastday = [];
        state.locationName = '';
        state.loading = false;
      });
  },
});

export const { actions: weatherForecastActions, reducer } = slice;

export const { changeLocationName } = weatherForecastActions;

export const useWeatherForecastSlice = () => {
  useInjectReducer({ key: slice.name, reducer: slice.reducer });
  useInjectSaga({ key: slice.name, saga: weatherForecastSaga });
  return { actions: weatherForecastActions };
};
