import React, { createContext, useState, useEffect } from 'react';
import { Dimensions } from 'react-native';

const WindowDimensionsContext = createContext();

export const WindowDimensionsProvider = ({ children }) => {
  const [windowDimensions, setWindowDimensions] = useState({
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  });

  useEffect(() => {
    const onChange = ({ window }) => {
      setWindowDimensions({
        width: window.width,
        height: window.height,
      });
    };

    const subscription = Dimensions.addEventListener('change', onChange);

    return () => {
      subscription?.remove();
    };
  }, []);

  return (
    <WindowDimensionsContext.Provider value={windowDimensions}>
      {children}
    </WindowDimensionsContext.Provider>
  );
};

export default WindowDimensionsContext;