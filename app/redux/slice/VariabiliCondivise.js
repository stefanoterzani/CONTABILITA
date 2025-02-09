import { createSlice } from '@reduxjs/toolkit';

const initialState = {
 variabileFittizia: "Valore Iniziale",
};

const variabiliCondiviseSlice = createSlice({
    name: 'variabiliCondivise',
    initialState,
    reducers: {
        setVariabileFittizia: (state, action) => {
            state.variabileFittizia = action.payload;
      },
      
    },
  });
  
  export const { setVariabileFittizia } = variabiliCondiviseSlice.actions;
  
  export default variabiliCondiviseSlice.reducer;