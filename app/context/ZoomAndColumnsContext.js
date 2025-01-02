import React, { createContext, useState, useEffect } from 'react';
import { StyleSheet, View, Text, Dimensions } from 'react-native';
import { PinchGestureHandler, GestureHandlerRootView } from 'react-native-gesture-handler';
import Animated, { useAnimatedGestureHandler, useAnimatedStyle, useSharedValue, withSpring, runOnJS } from 'react-native-reanimated';

const ZoomAndColumnsContext = createContext();

const ZoomAndColumnsProvider = ({ children }) => {
  const scale = useSharedValue(1);
  const focalX = useSharedValue(0);
  const focalY = useSharedValue(0);
  const leftColumnWidth = useSharedValue(0);
  const centralColumnWidth = useSharedValue(0);
  const rightColumnWidth = useSharedValue(0);
  const leftColumnLeft = useSharedValue(0);
  const centralColumnLeft = useSharedValue(0);
  const rightColumnLeft = useSharedValue(0);

  const [isLeftColumnVisible, setIsLeftColumnVisible] = useState(false);
  const [isRightColumnVisible, setIsRightColumnVisible] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [windowHeight, setWindowHeight] = useState(Dimensions.get('window').height);
  const [windowWidth, setWindowWidth] = useState(Dimensions.get('window').width);

  useEffect(() => {
    const updateLayout = () => {
      const { width, height } = Dimensions.get('window');
      setWindowHeight(height);
      setWindowWidth(width);
      if (width < 768) {
        setIsMobile(true);
        setIsLeftColumnVisible(false);
        setIsRightColumnVisible(false);
        leftColumnWidth.value = 0;
        rightColumnWidth.value = 0;
        centralColumnWidth.value = width;
      } else {
        setIsMobile(false);
        updateColumnProperties(width);
      }
    };

    const updateColumnProperties = (width) => {
      if (width >= 768 && width <= 1024) {
        leftColumnWidth.value = width * 0.2;
        centralColumnWidth.value = isRightColumnVisible ? width * 0.6 : width * 0.8;
        rightColumnWidth.value = isRightColumnVisible ? width * 0.2 : 0;
        leftColumnLeft.value = 0;
        centralColumnLeft.value = width * 0.2;
        rightColumnLeft.value = isRightColumnVisible ? width * 0.8 : width;
      } else {
        leftColumnWidth.value = width * 0.2;
        centralColumnWidth.value = width * 0.6;
        rightColumnWidth.value = width * 0.2;
        leftColumnLeft.value = 0;
        centralColumnLeft.value = width * 0.2;
        rightColumnLeft.value = width * 0.8;
      }
    };

    const subscription = Dimensions.addEventListener('change', updateLayout);
    updateLayout(); // Inizializza lo stato alla prima renderizzazione

    return () => {
      subscription?.remove();
    };
  }, [isRightColumnVisible]);

  const pinchHandler = useAnimatedGestureHandler({
    onActive: (event) => {
      scale.value = event.scale;
      focalX.value = event.focalX;
      focalY.value = event.focalY;
    },
    onEnd: () => {
      scale.value = withSpring(1);
    },
  });

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [
      { scale: scale.value },
      { translateX: focalX.value - (1 - scale.value) * focalX.value },
      { translateY: focalY.value - (1 - scale.value) * focalY.value },
    ],
  }));

  const leftColumnAnimatedStyle = useAnimatedStyle(() => ({
    width: `${leftColumnWidth.value}px`,
    left: `${leftColumnLeft.value}px`,
    top: 0,
    bottom: 0,
    display: isMobile ? 'none' : 'flex',
    position: 'absolute',
  }));

  const centralColumnAnimatedStyle = useAnimatedStyle(() => ({
    width: `${centralColumnWidth.value}px`,
    left: `${centralColumnLeft.value}px`,
    top: 0,
    bottom: 0,
    padding: 10, // Padding solo sulla colonna centrale
    position: 'absolute',
  }));

  const rightColumnAnimatedStyle = useAnimatedStyle(() => ({
    width: `${rightColumnWidth.value}px`,
    left: `${rightColumnLeft.value}px`,
    top: 0,
    bottom: 0,
    display: isMobile ? 'none' : 'flex',
    position: 'absolute',
  }));

  const toggleLeftColumn = () => {
    if (!isMobile) {
      setIsLeftColumnVisible(!isLeftColumnVisible);
    }
  };

  const toggleRightColumn = () => {
    if (!isMobile) {
      setIsRightColumnVisible(!isRightColumnVisible);
    }
  };

  return (
    <ZoomAndColumnsContext.Provider value={{
      pinchHandler,
      animatedStyle,
      toggleLeftColumn,
      toggleRightColumn,
      windowHeight,
      windowWidth,
      leftColumnWidth: leftColumnWidth.value,
      centralColumnWidth: centralColumnWidth.value,
      rightColumnWidth: rightColumnWidth.value,
      leftColumnLeft: leftColumnLeft.value,
      centralColumnLeft: centralColumnLeft.value,
      rightColumnLeft: rightColumnLeft.value,
    }}>
      <GestureHandlerRootView style={{ flex: 1 }}>
        <PinchGestureHandler onGestureEvent={pinchHandler}>
          <Animated.View style={[styles.container, animatedStyle]}>
            <Animated.View style={[styles.column, leftColumnAnimatedStyle]}>
              <Text>Colonna Sinistra (Menu)</Text>
            </Animated.View>
            <Animated.View style={[styles.centralColumn, centralColumnAnimatedStyle]}>
              {children}
            </Animated.View>
            <Animated.View style={[styles.column, rightColumnAnimatedStyle]}>
              <Text>Colonna Destra (Utility/Menu di Scelta)</Text>
            </Animated.View>
          </Animated.View>
        </PinchGestureHandler>
      </GestureHandlerRootView>
    </ZoomAndColumnsContext.Provider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: 'relative',
  },
  column: {
    borderWidth: 1,
    borderColor: 'gray',
  },
  centralColumn: {
    borderWidth: 1,
    borderColor: 'gray',
    padding: 10,
  },
});

export { ZoomAndColumnsProvider, ZoomAndColumnsContext };

export default ZoomAndColumnsProvider;

