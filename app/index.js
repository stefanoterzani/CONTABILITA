
import { useEffect } from 'react';
import { useRouter } from 'expo-router';
import { useAuth } from '../Context/AuthContext';


import { View, Text, ActivityIndicator } from 'react-native';



export default function Index() {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    // Naviga solo se il caricamento è completo
    if (!loading) {
      if (user) {
        // Se l'utente è autenticato, vai alla Home
        router.replace('/home');
      } else {
        // Se non è autenticato, vai a SignIn
        router.replace('/(Auth)/SignIn');
      }
    }
  }, [user, loading]); // Aggiungi 'user' e 'loading' come dipendenze

  // Mostra un caricamento o un messaggio fino a quando non è pronto
  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color="#0000ff" /> 
        <Text>Loading...</Text> 
      </View>
    );
  }

  return null; // Non mostra nulla se non c'è bisogno di un caricamento
}
/*
import { router } from "expo-router";
import { Text, View,Pressable, StyleSheet, } from "react-native";

export default function Index() {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Text>Edit app/index.tsx to edit this screen.</Text>
      <Pressable 
          onPress={()=>  router  .push('SignIn')}  
          style={{marginTop:20}}
      >
      <Text style={{fontSize:20, color:'blue', fontFamily:"Poppins-Bold"}}>Signin</Text>
    </Pressable>

    <Pressable 
          style={{marginTop:20}}
          onPress={()=>  router  .push('SignUp')}  
      >
      <Text style={{fontSize:20, color:'blue', fontFamily:"Poppins-Bold"}}>SignUp</Text>
    </Pressable>
   
   
    <Pressable 
          style={{marginTop:20}}
          onPress={()=>  router  .push('AuthProvider')}  
      >
      <Text style={{fontSize:20, color:'blue', fontFamily:"Poppins-Bold"}}>AuthProvider</Text>
    </Pressable>
    
    <Pressable 
          style={{marginTop:20}}
          onPress={()=>  router  .push('CreaCollezioniAzienda')}  
      >
      <Text style={{fontSize:20, color:'blue', fontFamily:"Poppins-Bold"}}>Crea Collezioni</Text>
    </Pressable>
   
   
    <Pressable 
          style={{marginTop:20}}
          onPress={()=>  router  .push('SignOut')}  
      >
      <Text style={{fontSize:20, color:'blue', fontFamily:"Poppins-Bold"}}>SignOut</Text>
    </Pressable>
    </View>
  );
}
*/