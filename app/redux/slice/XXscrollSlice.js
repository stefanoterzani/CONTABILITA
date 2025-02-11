import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  scrolls: {
    1: { top: 0, altezza: 0, larghezza: 0, paginaCorrente: 1, numeroMaxPagine: 1 },
    2: { top: 0, altezza: 0, larghezza: 0, paginaCorrente: 1, numeroMaxPagine: 1 },
  },
  pagine: [],
};

const scrollSlice = createSlice({
  name: 'scroll',
  initialState,
  reducers: {
    aggiornaScroll: (state, action) => {
      const { id, proprieta, valore } = action.payload;
      state.scrolls[id][proprieta] = valore;
    },
    aggiornaTutteLeProprietaScroll: (state, action) => {
      const { id, nuoveProprieta } = action.payload;
      console.log('NUOVE PROPRIETA', nuoveProprieta,id);
      state.scrolls[id] = {
        ...state.scrolls[id],
        ...nuoveProprieta,
      };
      console.log('STATO AGGIORNATO', state.scrolls[id]);
    },
    impostaPaginaCorrente: (state, action) => {
      const { id, paginaCorrente } = action.payload;
      state.scrolls[id].paginaCorrente = paginaCorrente;
    },
    impostaNumeroMaxPagine: (state, action) => {
      const { id, numeroMaxPagine } = action.payload;
      state.scrolls[id].numeroMaxPagine = numeroMaxPagine;
    },
    aggiungiPaginaRedux: (state, action) => {
        const { schemaName, pageNumber } = action.payload;
        state.pagine.push({ schemaName, pageNumber: `Pagina ${pageNumber}` });
      },
      eliminaPaginaRedux: (state, action) => {
        const { schemaName, pageNumber } = action.payload;
        state.pagine = state.pagine.filter((pagina) => !(pagina.schemaName === schemaName && pagina.pageNumber === `Pagina ${pageNumber}`));
      },


  },
});

export const { aggiornaScroll, aggiornaTutteLeProprietaScroll, impostaPaginaCorrente, impostaNumeroMaxPagine ,aggiungiPaginaRedux, eliminaPaginaRedux } = scrollSlice.actions;

export default scrollSlice.reducer;