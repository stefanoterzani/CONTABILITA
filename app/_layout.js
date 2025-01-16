import React, { useEffect } from 'react';
import ReduxProvider from './redux/ReduxProvider';
import { Stack } from 'expo-router';
import { useDispatch } from 'react-redux'; 
//import { updateColumnDimensions } from './redux/slice/columnDimensionSlice';
import WindowResizeHandler from './componenti/MonitoraggioDimensioni';
import { useFonts } from 'expo-font'

const Layout = () => {
  const [fontsLoaded, error] = useFonts({
 
    "Roboto-Bold":require('../assets/fonts/Roboto-Bold.ttf'),
    "Roboto-Medium" :require('../assets/fonts/Roboto-Medium.ttf'),
    "Roboto-Regular" :require('../assets/fonts/Roboto-Regular.ttf'),
    "Roboto-Black" :require('../assets/fonts/Roboto-Black.ttf'),
   
   
  });
  
  return (
    <ReduxProvider>
        <WindowResizeHandler />
      <Stack>
      <Stack.Screen name="index" options={{headerShown:false}}/>
      <Stack.Screen name="(HOME)" options={{headerShown:false}}/> 
      <Stack.Screen name="(CLIENTI)" options={{headerShown:false}}/> 
      </Stack>
      </ReduxProvider>
  );
};

export default Layout;

/* <ReduxProvider>  </ReduxProvider>*/