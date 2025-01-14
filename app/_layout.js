import React, { useEffect } from 'react';
import ReduxProvider from './redux/ReduxProvider';
import { Stack } from 'expo-router';
import { useDispatch } from 'react-redux'; 
//import { updateColumnDimensions } from './redux/slice/columnDimensionSlice';
import WindowResizeHandler from './componenti/MonitoraggioDimensioni';
const Layout = () => {

  return (
    <ReduxProvider>
        <WindowResizeHandler /> {/*componente che monitora le dimensioni della finestra
                                  è essenziale che venga chiamato dopo che il provider 
                                  sia montato e reso disponibile*/}
      <Stack>
      <Stack.Screen name="index" options={{headerShown:false}}/>
      <Stack.Screen name="(HOME)" options={{headerShown:false}}/> 
      </Stack>
      </ReduxProvider>
  );
};

export default Layout;

/* <ReduxProvider>  </ReduxProvider>*/