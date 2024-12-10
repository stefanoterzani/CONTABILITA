import { SplashScreen, Stack } from "expo-router";
import { useFonts } from 'expo-font'
import { useEffect } from "react";
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import * as NavigationBar from 'expo-navigation-bar';


import { AuthProvider } from '../context/AuthContext'// Importa il contesto
import { AziendaProvider } from '../context/AziendaContext'; // Assicurati che il percorso sia corretto
import { ClientiProvider } from '../context/ClientiContext';
import { FornitoriProvider } from '../context/FornitoriContext';
import { OrdiniClientiProvider } from '../context/OrdiniClientiContext';

export default function RootLayout() {
  const [fontsLoaded, error] = useFonts({
   // "Poppins-Black": require("../assets/fonts/Poppins-Black.ttf"),
   // "Poppins-Bold": require("../assets/fonts/Poppins-Bold.ttf"),
  //  "Poppins-ExtraBold": require("../assets/fonts/Poppins-ExtraBold.ttf"),
  //  "Poppins-ExtraLight": require("../assets/fonts/Poppins-ExtraLight.ttf"),
 //   "Poppins-Light": require("../assets/fonts/Poppins-Light.ttf"),
 //   "Poppins-Medium": require("../assets/fonts/Poppins-Medium.ttf"),
  //  "Poppins-Regular": require("../assets/fonts/Poppins-Regular.ttf"),
   // "Poppins-SemiBold": require("../assets/fonts/Poppins-SemiBold.ttf"),
  //  "Poppins-Thin": require("../assets/fonts/Poppins-Thin.ttf"),
    "Roboto-Bold":require('../assets/fonts/Roboto-Bold.ttf'),
    "Roboto-Medium" :require('../assets/fonts/Roboto-Medium.ttf'),
    "Roboto-Regular" :require('../assets/fonts/Roboto-Regular.ttf'),
    "Roboto-Black" :require('../assets/fonts/Roboto-Black.ttf'),
   
   
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
    <GestureHandlerRootView style={{ flex:1}}>
   <AuthProvider> 
   <AziendaProvider>
   <ClientiProvider>
   <FornitoriProvider>
   <OrdiniClientiProvider> 
    <Stack>
      <Stack.Screen name="index" options={{headerShown:false}}/>
      <Stack.Screen name="home" options={{ headerShown:false}}/>
      <Stack.Screen name="(Auth)" options={{headerShown:false}}/>
      <Stack.Screen name="(Azienda)" options={{headerShown:false}}/>
      <Stack.Screen name="(Accessi)" options={{headerShown:false}}/>
      <Stack.Screen name="(Clienti)" options={{headerShown:false}}/>
      <Stack.Screen name="(Fornitori)" options={{headerShown:false}}/>
      <Stack.Screen name="(OrdiniClienti)" options={{headerShown:false}}/>
      <Stack.Screen name="(Fatture)" options={{headerShown:false}}/>
   
     
    </Stack>
    </OrdiniClientiProvider>
    </FornitoriProvider>
    </ClientiProvider>
    </AziendaProvider>
    </AuthProvider>
    </GestureHandlerRootView>
  );
}


{/*
   <OrdiniClientiProvider></OrdiniClientiProvider> */}