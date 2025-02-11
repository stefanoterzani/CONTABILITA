import { createSlice } from '@reduxjs/toolkit';

const initialState = [];

const pagineSlice = createSlice({
  name: 'pagine',
  initialState,
  reducers: {
    aggiungiPaginaRedux: (state, action) => {
      const { schemaName, pageNumber } = action.payload;
      state.push({ schemaName, pageNumber: `Pagina ${pageNumber}` });
    //  state.push(`Pagina ${state.length + 1}`);
    },
    eliminaPaginaRedux: (state, action) => {
      return state.filter((_, index) => index !== action.payload - 1);
    },
  },
});

export const { aggiungiPaginaRedux, eliminaPaginaRedux } = pagineSlice.actions;

export default pagineSlice.reducer;