import { createSlice } from '../../../../../../utils/toolkit';
import {
  useInjectReducer,
  useInjectSaga,
} from '../../../../../../utils/redux-injectors';
import { citySearchSaga } from './saga';

export const initialState = {
  city: 'Sydney',
  locations: [],
  loading: false,
  error: null,
  selected: null,
};

const slice = createSlice({
  name: 'citySearch',
  initialState,
  reducers: {
    changeCity(state, action) {
      state.city = action.payload;
    },
    loadLocations(state) {
      state.loading = true;
      state.error = null;
      state.locations = [];
    },
    locationsLoaded(state, action) {
      const locations = action.payload;
      state.locations = locations;
      state.loading = false;
    },
    locationError(state, action) {
      state.error = action.payload;
      state.loading = false;
    },
    loadWeather(state, action) {
      state.selected = action.payload;
    },
  },
});

export const { actions: citySearchActions, reducer } = slice;

export const useCitySearchSlice = () => {
  useInjectReducer({ key: slice.name, reducer: slice.reducer });
  useInjectSaga({ key: slice.name, saga: citySearchSaga });
  return { actions: citySearchActions };
};
