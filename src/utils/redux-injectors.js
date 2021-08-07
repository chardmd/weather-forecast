import {
  useInjectReducer as useReducer,
  useInjectSaga as useSaga,
} from 'redux-injectors';

export const useInjectReducer = params => {
  return useReducer(params);
};

export const useInjectSaga = params => {
  return useSaga(params);
};
