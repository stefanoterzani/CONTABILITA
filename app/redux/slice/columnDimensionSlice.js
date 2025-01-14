import { createSlice } from '@reduxjs/toolkit';
import { Dimensions } from 'react-native';

const initialState = {
  windowHeight: Dimensions.get('window').height,
  windowWidth: Dimensions.get('window').width,
  leftColumnWidth: 0,
  centralColumnWidth: Dimensions.get('window').width,
  rightColumnWidth: 0,
  leftColumnLeft: 0,
  centralColumnLeft: 0,
  rightColumnLeft: 0,
  headerHeight: 0,
  footerHeight: 0,
  colonnaSnVisibile: false,
  colonnaDxVisibile: false,
  isMobile: null,
  bordoDxColonnaDx: 0,
  bordoSnColonnaDx: 0,
  bordoDxColonnaSn: 0,
  bordoSnColonnaSn: 0,
  bordoDxColonnaCn: 0,
  bordoSnColonnaCn: 0,
  bordoSopraSotto: 0,
};

const columnDimensionsSlice = createSlice({
  name: 'columnDimensions',
  initialState,
  reducers: {
    setWindowHeight: (state, action) => { state.windowHeight = action.payload; },
    setWindowWidth: (state, action) => { state.windowWidth = action.payload; },
    setLeftColumnWidth: (state, action) => { state.leftColumnWidth = action.payload; },
    setCentralColumnWidth: (state, action) => { state.centralColumnWidth = action.payload; },
    setRightColumnWidth: (state, action) => { state.rightColumnWidth = action.payload; },
    setLeftColumnLeft: (state, action) => { state.leftColumnLeft = action.payload; },
    setCentralColumnLeft: (state, action) => { state.centralColumnLeft = action.payload; },
    setRightColumnLeft: (state, action) => { state.rightColumnLeft = action.payload; },
    setHeaderHeight: (state, action) => { state.headerHeight = action.payload; },
    setFooterHeight: (state, action) => { state.footerHeight = action.payload; },
    setColonnaSnVisibile: (state, action) => { state.colonnaSnVisibile = action.payload; },
    setColonnaDxVisibile: (state, action) => { state.colonnaDxVisibile = action.payload; },
    setIsMobile: (state, action) => { state.isMobile = action.payload; },
    setBordoDxColonnaDx: (state, action) => { state.bordoDxColonnaDx = action.payload; },
    setBordoSnColonnaDx: (state, action) => { state.bordoSnColonnaDx = action.payload; },
    setBordoDxColonnaSn: (state, action) => { state.bordoDxColonnaSn = action.payload; },
    setBordoSnColonnaSn: (state, action) => { state.bordoSnColonnaSn = action.payload; },
    setBordoDxColonnaCn: (state, action) => { state.bordoDxColonnaCn = action.payload; },
    setBordoSnColonnaCn: (state, action) => { state.bordoSnColonnaCn = action.payload; },
    setBordoSopraSotto: (state, action) => { state.bordoSopraSotto = action.payload; },
   
   
    updateColumnDimensions: (state) => {
      const { width, height } = Dimensions.get('window');
      state.windowHeight = height;
      state.windowWidth = width;
      state.headerHeight = height * 0.07;
      state.footerHeight = height * 0.05;
      state.bordoSopraSotto = 10;

      if (width < 768) {
        state.isMobile = true;
        state.leftColumnLeft = 0;
        state.leftColumnWidth = 0;
        state.centralColumnLeft = 0;
        state.centralColumnWidth = width;
        state.rightColumnLeft = 0;
        state.rightColumnWidth = 0;
        state.colonnaSnVisibile = true;
        state.colonnaDxVisibile = false;
        state.bordoDxColonnaDx = 0;
        state.bordoSnColonnaDx = 0;
        state.bordoDxColonnaSn = 0;
        state.bordoSnColonnaSn = 0;
        state.bordoDxColonnaCn = 4;
        state.bordoSnColonnaCn = 4;
      } else if (width >= 768 && width <= 1024) {
        state.isMobile = false;
        state.leftColumnLeft = 0;
        state.leftColumnWidth = width * 0.2;
        state.centralColumnLeft = width * 0.2;
        state.centralColumnWidth = width * 0.8;
        state.rightColumnLeft = 0;
        state.rightColumnWidth = 0;
        state.colonnaSnVisibile = true;
        state.colonnaDxVisibile = false;
        state.bordoDxColonnaDx = 0;
        state.bordoSnColonnaDx = 0;
        state.bordoDxColonnaSn = 0;
        state.bordoSnColonnaSn = 10;
        state.bordoDxColonnaCn = 10;
        state.bordoSnColonnaCn = 10;
      } else {
        state.isMobile = false;
        state.leftColumnLeft = 0;
        state.leftColumnWidth = width * 0.15;
        state.centralColumnLeft = width * 0.15;
        state.centralColumnWidth = width * 0.65;
        state.rightColumnLeft = width * 0.8;
        state.rightColumnWidth = width * 0.2;
        state.colonnaSnVisibile = true;
        state.colonnaDxVisibile = true;
        state.bordoDxColonnaDx = 10;
        state.bordoSnColonnaDx = 0;
        state.bordoDxColonnaSn = 0;
        state.bordoSnColonnaSn = 10;
        state.bordoDxColonnaCn = 10;
        state.bordoSnColonnaCn = 10;
      }
    },
  },
});

export const {
  setWindowHeight,
  setWindowWidth,
  setLeftColumnWidth,
  setCentralColumnWidth,
  setRightColumnWidth,
  setLeftColumnLeft,
  setCentralColumnLeft,
  setRightColumnLeft,
  setHeaderHeight,
  setFooterHeight,
  setColonnaSnVisibile,
  setColonnaDxVisibile,
  setIsMobile,
  setBordoDxColonnaDx,
  setBordoSnColonnaDx,
  setBordoDxColonnaSn,
  setBordoSnColonnaSn,
  setBordoDxColonnaCn,
  setBordoSnColonnaCn,
  setBordoSopraSotto,
  updateColumnDimensions,
} = columnDimensionsSlice.actions;

export default columnDimensionsSlice.reducer

