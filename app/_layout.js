import { SplashScreen, Stack } from "expo-router";
import { useFonts } from 'expo-font'
import { useEffect } from "react";
import * as NavigationBar from 'expo-navigation-bar';
import { AuthProvider } from '../Context/AuthContext'// Importa il contesto

export default function RootLayout() {
  const [fontsLoaded, error] = useFonts({
    "Poppins-Black": require("../assets/fonts/Poppins-Black.ttf"),
    "Poppins-Bold": require("../assets/fonts/Poppins-Bold.ttf"),
    "Poppins-ExtraBold": require("../assets/fonts/Poppins-ExtraBold.ttf"),
    "Poppins-ExtraLight": require("../assets/fonts/Poppins-ExtraLight.ttf"),
    "Poppins-Light": require("../assets/fonts/Poppins-Light.ttf"),
    "Poppins-Medium": require("../assets/fonts/Poppins-Medium.ttf"),
    "Poppins-Regular": require("../assets/fonts/Poppins-Regular.ttf"),
    "Poppins-SemiBold": require("../assets/fonts/Poppins-SemiBold.ttf"),
    "Poppins-Thin": require("../assets/fonts/Poppins-Thin.ttf"),
  });

  useEffect(() => {
    // Nascondi la barra di navigazione inferiore all'avvio dell'app
    NavigationBar.setVisibilityAsync('hidden');
    NavigationBar.setBehaviorAsync('overlay-swipe');
  }, []);


  useEffect(()=>{
    if (error) throw Error
    if (fontsLoaded) SplashScreen.hideAsync();
  } ,[fontsLoaded,error])

  if(!fontsLoaded) return null;
  if (!fontsLoaded && !error) return null;




  return (
   
    <AuthProvider> 
    <Stack>
      <Stack.Screen name="index" options={{ title: 'Index' }}/>
      <Stack.Screen name="(Auth)" options={{headerShown:false}}/>
      <Stack.Screen name="(SettingAzienda)" options={{headerShown:false}}/>
      <Stack.Screen name="(startAzienda)" options={{headerShown:false}}/>
      <Stack.Screen name="home" options={{ title: 'Home' }}/>
      <Stack.Screen name="(Clienti)" options={{headerShown:false}}/>
      <Stack.Screen name="(Fornitori)" options={{headerShown:false}}/>
      <Stack.Screen name="modelloFattura" options={{ title: 'Modello Fattura' }} />
    </Stack>
    </AuthProvider>
  );
}

     
      