



import { configureStore } from '@reduxjs/toolkit';

import standardColumnReducer from './slice/SliceColonnaStandard';
import optionalColumnReducer from './slice/SliceColonnaOpzionale';
import variabiliCondiviseReducer from './slice/VariabiliCondivise'
import pagineReducer from '../redux/slice/pagineSlice';
import timeReducer from './slice/timeSlice';
import colonnaDestraReducer from './slice/colonnaDestraSlice';

const store = configureStore({
  reducer: {
    standardColumn: standardColumnReducer,
    optionalColumn: optionalColumnReducer,
    variabiliCondivise: variabiliCondiviseReducer,
    pagine: pagineReducer,
    time: timeReducer,
    colonnaDestra: colonnaDestraReducer,
  },
});

export default store;
