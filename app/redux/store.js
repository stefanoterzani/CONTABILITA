import { configureStore } from '@reduxjs/toolkit';
import columnDimensionsReducer from './slice/columnDimensionSlice';


const store = configureStore({
  reducer: {
    columnDimensions: columnDimensionsReducer,
 
  },
});

export default store;
