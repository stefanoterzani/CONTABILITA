import React, { createContext, useState, useEffect } from 'react';
import { Dimensions } from 'react-native';

const ColumnDimensionsContext = createContext();

const ColumnDimensionsProvider = ({ children }) => {
  const [windowHeight, setWindowHeight] = useState(Dimensions.get('window').height);
  const [windowWidth, setWindowWidth] = useState(Dimensions.get('window').width);
  const [leftColumnWidth, setLeftColumnWidth] = useState(0);
  const [centralColumnWidth, setCentralColumnWidth] = useState(windowWidth);
  const [rightColumnWidth, setRightColumnWidth] = useState(0);
  const [leftColumnLeft, setLeftColumnLeft] = useState(0);
  const [centralColumnLeft, setCentralColumnLeft] = useState(0);
  const [rightColumnLeft, setRightColumnLeft] = useState(0);
  const [headerHeight, setHeaderHeight] = useState(0);
  const [footerHeight, setFooterHeight] = useState(0);
  
  const isMobile = windowWidth < 768;

  const updateColumnDimensions = () => {
    const { width, height } = Dimensions.get('window');
    setWindowHeight(height);
    setWindowWidth(width);
    setHeaderHeight(height*0.07);
    setFooterHeight(height*0.05);
    if (isMobile) {
        setLeftColumnLeft(0);
        setLeftColumnWidth(0);
      
        setCentralColumnLeft(0);
        setCentralColumnWidth(width);
        
        setRightColumnLeft(0);
        setRightColumnWidth(0);
       
    } else if (width >= 768 && width <= 1024) {
        setLeftColumnLeft(0);
        setLeftColumnWidth(width * 0.2);
      
        setCentralColumnLeft(width * 0.2);
        setCentralColumnWidth(width * 0.8);
        
        setRightColumnLeft(0);
        setRightColumnWidth(0);
    } else {
        setLeftColumnLeft(0);
        setLeftColumnWidth(width * 0.15);
      
        setCentralColumnLeft(width * 0.15);
        setCentralColumnWidth(width * 0.65,);
        
        setRightColumnLeft(width * 0.8);
        setRightColumnWidth(width * 0.2);
      
    }
   // console.log("Window dimensions updated:", { width, height });

  };

  useEffect(() => {
    updateColumnDimensions();
    const subscription = Dimensions.addEventListener('change', updateColumnDimensions);

    return () => {
      subscription.remove();
    };
  }, [windowWidth,windowHeight]);

  useEffect(() => { 
    console.log("Column dimensions:", 
        { windowHeight, windowWidth, 
          leftColumnWidth, leftColumnLeft,

          centralColumnWidth, centralColumnLeft,

          rightColumnWidth,  rightColumnLeft
          }); 
        }, [windowHeight, windowWidth, leftColumnWidth, centralColumnWidth, rightColumnWidth, leftColumnLeft, centralColumnLeft, rightColumnLeft]);



  return (
    <ColumnDimensionsContext.Provider value={{ isMobile,windowHeight, windowWidth,headerHeight, footerHeight,leftColumnWidth, centralColumnWidth, rightColumnWidth, leftColumnLeft, centralColumnLeft, rightColumnLeft }}>
      {children}
    </ColumnDimensionsContext.Provider>
  );
};

export { ColumnDimensionsProvider, ColumnDimensionsContext };
export default ColumnDimensionsProvider;

