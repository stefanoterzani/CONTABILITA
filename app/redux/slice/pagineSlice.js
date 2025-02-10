import { createSlice } from '@reduxjs/toolkit';

const initialState = [];

const pagineSlice = createSlice({
  name: 'pagine',
  initialState,
  reducers: {
    aggiungiPagina: (state, action) => {
      const { schemaName, pageNumber } = action.payload;
      state.push({ schemaName, pageNumber: `Pagina ${pageNumber}` });
    //  state.push(`Pagina ${state.length + 1}`);
    },
    eliminaPagina: (state, action) => {
      return state.filter((_, index) => index !== action.payload - 1);
    },
  },
});

export const { aggiungiPagina, eliminaPagina } = pagineSlice.actions;

export default pagineSlice.reducer;