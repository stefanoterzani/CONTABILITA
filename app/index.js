import React, { useEffect, useContext } from 'react';
import { useRouter } from 'expo-router';
import { AuthContext } from '../Context/AuthContext';
import { View, Text, Button, StyleSheet } from 'react-native';

export default function Index() {
  const { currentUser, loading } = useContext(AuthContext);
  const router = useRouter();

  useEffect(() => {
    if (!loading && currentUser) {
      router.replace('/home'); // Se l'utente è autenticato, vai alla Home
    }
  }, [currentUser, loading, router]);

  if (loading) {
    return (
      <View style={styles.container}>
        <Text>Caricamento...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text>Benvenuto nella tua app!</Text>
      <Button title="Vai al Login" onPress={() => router.replace('/(Auth)/SignIn')} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
