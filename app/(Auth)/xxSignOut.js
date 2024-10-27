// app/(Auth)/SignOut.js
// app/(Auth)/SignOut.js
// app/(Auth)/SignOut.js

import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

const SignOut = () => {
  return (
    <View>
      <Text>SignOut</Text>
    </View>
  )
}

export default SignOut

const styles = StyleSheet.create({})
/*
import React from 'react';
import { View, Text, Button } from 'react-native';
import { useAuth } from '../../Context/AuthContext';
import { useRouter } from 'expo-router';

export default function SignOut() {
  const { logout } = useAuth();
  const router = useRouter();

  const handleLogout = async () => {
    try {
      await logout();
      router.replace('/(Auth)/SignIn'); // Reindirizza all'accesso dopo il logout
    } catch (error) {
      console.error("Logout failed", error);
    }
  };

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Sei sicuro di voler effettuare il logout?</Text>
      <Button title="Logout" onPress={handleLogout} />
    </View>
  );
}

*/