import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  currentTime: new Date().toLocaleTimeString(),
  currentTime: new Date().toLocaleTimeString('it-IT'),
  currentDate: new Date().toLocaleDateString('it-IT'),
  currentDay: new Date().toLocaleDateString('it-IT', { weekday: 'long' }),
};

const timeSlice = createSlice({
  name: 'time',
  initialState,
  reducers: {
    
    updateTime: (state) => {
      const now = new Date();
      state.currentTime = now.toLocaleTimeString('it-IT');
      state.currentDate = now.toLocaleDateString('it-IT');
      state.currentDay = now.toLocaleDateString('it-IT', { weekday: 'long' });
    },
  },
});

export const { updateTime } = timeSlice.actions;

export default timeSlice.reducer; 