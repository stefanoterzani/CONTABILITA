//optionalColumnSlice.js
//javascript
import { createSlice } from '@reduxjs/toolkit';
import { Dimensions } from 'react-native';
import optionalLayoutConfig from '../config/ConfigLayoutOptionale'

const initialState = {
  windowHeight: Dimensions.get('window').height,
  windowWidth: Dimensions.get('window').width,
  showColonnaSinistra: false,
  showColonnaDestra: false,
  tipoApp: 'tipoApp1',
  leftColumnStyles: {},
  centralColumnStyles: {},
  rightColumnStyles: {},
  showWarningMessage: false,
  headerHeight: 60, // Altezza iniziale dell'header 
  footerHeight: 50, // Altezza iniziale del footer
};

const optionalColumnSlice = createSlice({
  name: 'optionalColumn',
  initialState,
  reducers: {
    updateColumnDimensions: (state,action) => {
      const { width, height } = action.payload;
      state.windowHeight = height;
      state.windowWidth = width;

      // Chiudi automaticamente le colonne opzionali al variare delle dimensioni della finestra
      state.showColonnaSinistra = false;
      state.showColonnaDestra = false;
    },
    setTipoApp: (state, action) => {
      state.tipoApp = action.payload;
    },
    toggleLeftColumn: (state) => {
      state.showColonnaSinistra = !state.showColonnaSinistra;
    },
    toggleRightColumn: (state) => {
      state.showColonnaDestra = !state.showColonnaDestra;
    },
    showRightColumn: (state) => {
     
      state.showColonnaDestra = true;
    },
    hideRightColumn: (state) => {
      state.showColonnaDestra = false;
    },
    toggleWarningMessage: (state) => {
      state.showWarningMessage = !state.showWarningMessage;
    },
    updateColumnStyles: (state) => {
      const { windowWidth } = state;
      const layout = optionalLayoutConfig[state.tipoApp];
      
      if (windowWidth < 768) {
        state.leftColumnStyles = layout.small.leftColumnStyles;     
        state.rightColumnStyles = layout.small.rightColumnStyles; 
           
      } else if (windowWidth >= 768 && windowWidth <= 1024) {   
        state.rightColumnStyles = layout.medium.rightColumnStyles;      
      } 
    
      if (state.showWarningMessage) {
        state.rightColumnStyles = optionalLayoutConfig.warningMessage.rightColumnStyles;
      }
    }
  },
});

export const { 
    updateColumnDimensions,  
    setTipoApp, 
    toggleLeftColumn, 
    toggleRightColumn, 
    showRightColumn, 
    hideRightColumn, 
    toggleWarningMessage, 
    updateColumnStyles 
        } = optionalColumnSlice.actions;
export default optionalColumnSlice.reducer;

