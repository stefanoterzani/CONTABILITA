import { SplashScreen, Stack } from "expo-router";
import { WindowDimensionsProvider } from './context/WindowDimensionsContext'
import { useFonts } from 'expo-font'

export default function RootLayout() {

  const [fontsLoaded, error] = useFonts({
 
    "Roboto-Bold":require('../assets/fonts/Roboto-Bold.ttf'),
    "Roboto-Medium" :require('../assets/fonts/Roboto-Medium.ttf'),
    "Roboto-Regular" :require('../assets/fonts/Roboto-Regular.ttf'),
    "Roboto-Black" :require('../assets/fonts/Roboto-Black.ttf'),
   
   
  });
  
    return (
        <WindowDimensionsProvider>
          <Stack>
            <Stack.Screen name="index" options={{headerShown:false}}/>
            <Stack.Screen name="(HOME)" options={{headerShown:false}}/>  
          </Stack>
        </WindowDimensionsProvider>
    )
}
