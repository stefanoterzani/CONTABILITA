import { createSlice } from '@reduxjs/toolkit';

const initialState = {};

const formsSlice = createSlice({
  name: 'forms',
  initialState,
  reducers: {
    setFormData: (state, action) => {
      const { formNumber, data } = action.payload;
      state[formNumber] = { ...state[formNumber], ...data };
    },
    setFieldValue: (state, action) => {
      const { formNumber, name, value } = action.payload;
      if (!state[formNumber]) {
        state[formNumber] = {};
      }
      state[formNumber][name] = value;
    },
    resetFormData: (state, action) => {
      const { formNumber } = action.payload;
      state[formNumber] = {};
    },
  },
});

export const { setFormData, setFieldValue, resetFormData } = formsSlice.actions;
export default formsSlice.reducer;