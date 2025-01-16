import { configureStore } from '@reduxjs/toolkit';
import columnDimensionsReducer from './slice/columnDimensionSlice';
import formsReducer from '../redux/slice/formSlice';

const store = configureStore({
  reducer: {
    columnDimensions: columnDimensionsReducer,
    forms: formsReducer,
  },
});

export default store;
