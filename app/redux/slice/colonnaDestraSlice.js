import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  tipoContenuto: null,
  risposta: null,
};

const colonnaDestraSlice = createSlice({
  name: 'colonnaDestra',
  initialState,
  reducers: {
    setTipoContenuto: (state, action) => {
      state.tipoContenuto = action.payload;
    },
    resetTipoContenuto: (state) => {
      state.tipoContenuto = null;
    },
    setRisposta: (state, action) => {
      state.risposta = action.payload;
    },
    resetRisposta: (state) => {
      state.risposta = null;
    },
    setClientiData: (state, action) => {
        state.clientiData = action.payload;
    }, 
    aggiornaCache: (state) => {
      state.aggiornaCache = !state.aggiornaCache; // Toggle dello stato aggiornaCache
    },
  },
});

export const { setTipoContenuto, resetTipoContenuto, setRisposta, resetRisposta ,setClientiData,aggiornaCache} = colonnaDestraSlice.actions;
export default colonnaDestraSlice.reducer;