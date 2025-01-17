//standardColumnSlice.js
//javascript
import { createSlice } from '@reduxjs/toolkit';
import { Dimensions } from 'react-native';
import standardLayoutConfig from '../config/ConfigLayoutStandard';

const initialState = {
  windowHeight: Dimensions.get('window').height,
  windowWidth: Dimensions.get('window').width,
  showColonnaSinistra: false,
  showColonnaDestra: false,
  rightColumnStyles: {},
  headerHeight: 60, // Altezza iniziale dell'header 
  footerHeight: 50, // Altezza iniziale del footer
  tipoApp: 'tipoApp1',
  leftColumnStyles: {},
  centralColumnStyles: {}, 
  rightColumnStyles: {},
  centralColumnLeft: 0, // Aggiungi queste variabili iniziali 
  centralColumnWidth: '100%'
};

const standardColumnSlice = createSlice({
  name: 'standardColumn',
  initialState,
  reducers: {
     updateColumnDimensions: (state,action) => {
      const { width, height } =action.payload
      state.windowHeight = height;
      state.windowWidth = width;
 

    if (width < 768) { 
        state.showColonnaSinistra = false; 
        state.showColonnaDestra = false; 
    } 
    else if (width >= 768 && width <= 1024) { 
        state.showColonnaSinistra = true; 
        state.showColonnaDestra = false; 
    } else { 
        state.showColonnaSinistra = true; 
        state.showColonnaDestra = true; 
    } 
},
    setHeaderHeight: (state, action) => { 
        state.headerHeight = action.payload; 
    },
    setFooterHeight: (state, action) => { 
        state.footerHeight = action.payload; 
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
    updateColumnStyles: (state) => {
      const { windowWidth, windowHeight } = state;
      const layout = standardLayoutConfig[state.tipoApp];
    
      if (windowWidth < 768) {
     
        state.leftColumnStyles = layout.small.leftColumnStyles;
        state.centralColumnStyles = layout.small.centralColumnStyles;
        state.rightColumnStyles = layout.small.rightColumnStyles;
        
      } else if (windowWidth >= 768 && windowWidth <= 1024) {
   
        state.leftColumnStyles = layout.medium.leftColumnStyles;
        state.centralColumnStyles = layout.medium.centralColumnStyles;
        state.rightColumnStyles = layout.medium.rightColumnStyles;
        
      } else {
     

        state.leftColumnStyles = layout.large.leftColumnStyles; 
        state.centralColumnStyles = layout.large.centralColumnStyles; 
        state.rightColumnStyles = layout.large.rightColumnStyles; 
        
      }

     
    }
  },
});

export const { 
     updateColumnDimensions,  
    setHeaderHeight, 
    setFooterHeight, 
    setTipoApp, 
    toggleLeftColumn, 
    toggleRightColumn, 
    updateColumnStyles } = standardColumnSlice.actions

export default standardColumnSlice.reducer;