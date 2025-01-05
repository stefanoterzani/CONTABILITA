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
  const [colonnaSnVisibile,setColonnaSnVisibile] = useState(false);
  const [colonnaDxVisibile,setColonnaDxVisibile] = useState(false);
  const [isMobile, setIsMobile] = useState(null);
  const [bordoDxColonnaDx,setbordoDxColonnaDx] = useState(0);
  const [bordoSnColonnaDx,setbordoSnColonnaDx] = useState(0);
  const [bordoDxColonnaSn,setbordoDxColonnaSn] = useState(0);
  const [bordoSnColonnaSn,setbordoSnColonnaSn] = useState(0);
  const [bordoDxColonnaCn,setbordoDxColonnaCn] = useState(0);
  const [bordoSnColonnaCn,setbordoSnColonnaCn] = useState(0);
  const [bordoSopraSotto,setBordoSopraSotto] = useState(0);
  const updateColumnDimensions = () => {
    const { width, height } = Dimensions.get('window');
    setWindowHeight(height);
    setWindowWidth(width);
    setHeaderHeight(height*0.07);
    setFooterHeight(height*0.05);
    setBordoSopraSotto(10)

    if (width < 768) {
        setIsMobile(true);
        setLeftColumnLeft(0);
        setLeftColumnWidth(0);
      
        setCentralColumnLeft(0);
        setCentralColumnWidth(width);
        
        setRightColumnLeft(0);
        setRightColumnWidth(0);

        setColonnaSnVisibile(true)
        setColonnaDxVisibile(false)

        setbordoDxColonnaDx(0);
        setbordoSnColonnaDx(0);
        setbordoDxColonnaSn(0);
        setbordoSnColonnaSn(0);
        setbordoDxColonnaCn(4);
        setbordoSnColonnaCn(4);
  
    } else if (width >= 768 && width <= 1024) {
        setIsMobile(false);
        setLeftColumnLeft(0);
        setLeftColumnWidth(width * 0.2);
      
        setCentralColumnLeft(width * 0.2);
        setCentralColumnWidth(width * 0.8);
        
        setRightColumnLeft(0);
        setRightColumnWidth(0);

        setColonnaSnVisibile(true)
        setColonnaDxVisibile(false)

        setbordoDxColonnaDx(0);
        setbordoSnColonnaDx(0);
        setbordoDxColonnaSn(0);
        setbordoSnColonnaSn(10);
        setbordoDxColonnaCn(10);
        setbordoSnColonnaCn(10);
    } else {
        setIsMobile(false);
        setLeftColumnLeft(0);
        setLeftColumnWidth(width * 0.15);
      
        setCentralColumnLeft(width * 0.15);
        setCentralColumnWidth(width * 0.65,);
        
        setRightColumnLeft(width * 0.8);
        setRightColumnWidth(width * 0.2);

        setColonnaSnVisibile(true)
        setColonnaDxVisibile(true)

        setbordoDxColonnaDx(10);
        setbordoSnColonnaDx(0);
        setbordoDxColonnaSn(0);
        setbordoSnColonnaSn(10);
        setbordoDxColonnaCn(10);
        setbordoSnColonnaCn(10);
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
    <ColumnDimensionsContext.Provider value={{ 
        windowHeight, windowWidth,
        headerHeight, footerHeight,
        leftColumnWidth, centralColumnWidth, rightColumnWidth, 
        leftColumnLeft, centralColumnLeft, rightColumnLeft ,
        bordoSopraSotto,
        bordoSnColonnaSn,bordoDxColonnaSn,
        bordoSnColonnaDx,bordoDxColonnaDx,
        bordoDxColonnaCn,bordoSnColonnaCn,
        colonnaSnVisibile,colonnaDxVisibile,
        isMobile,
        setLeftColumnWidth,setRightColumnWidth
        }}>
      {children}
    </ColumnDimensionsContext.Provider>
  );
};

export { ColumnDimensionsProvider, ColumnDimensionsContext };
export default ColumnDimensionsProvider;

