import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useAuth } from '../Context/AuthContext'; // Assicurati che il percorso sia corretto
import { useRouter } from 'expo-router';

export default function Index() {
  const router = useRouter();
/************************PARTE AGGIUNTA PER NON FARE LOGIN *************
const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);


  useEffect(() => {
    if (isMounted) {
      router.push('/(CreazioneArchivi)/HomeGenerazione');
      return
    }
  }, [isMounted, router]);

***********************PARTE AGGIUNTA PER NON FARE LOGIN *************/

  const { currentUser, azienda, ruolo, loading, logout } = useAuth(); // Aggiungi loading

  useEffect(() => {
    if (!loading) { // Controlla se il caricamento è completo
      if (!currentUser) {
        router.replace('/(Auth)/SignIn'); // Reindirizza a SignIn se non autenticato
      } else {
     //   console.log(azienda)
        router.replace('/home'); // Reindirizza a home se autenticato
      }
    }
  }, [currentUser, loading]); // Esegui l'effetto quando currentUser o loading cambiano

  if (loading) {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text>Caricamento...</Text> 
      </View>
    );
  }


/*

const renderData = (data) => {
  return data ? Object.entries(data).map(([key, value]) => (
    <Text key={key}>{key}: {value.toString()}</Text>
  )) : <Text>Non ci sono dati disponibili</Text>;
};
*/
return null; // Non mostra nulla se non c'è bisogno di un caricamento



}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center', // Centra verticalmente il contenuto del container
    alignItems: 'center', // Centra orizzontalmente il contenuto del container
  },
});


/*
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
  */
