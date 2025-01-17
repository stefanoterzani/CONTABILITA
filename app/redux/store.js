import { configureStore } from '@reduxjs/toolkit';
//import columnDimensionsReducer from './slice/columnDimensionSlice';
import formsReducer from '../redux/slice/formSlice';
import standardColumnReducer from './slice/SliceColonnaStandard';
import optionalColumnReducer from './slice/SliceColonnaOpzionale';
const store = configureStore({
  reducer: {
    standardColumn: standardColumnReducer,
    optionalColumn: optionalColumnReducer,
    forms: formsReducer,
  },
});

export default store;
