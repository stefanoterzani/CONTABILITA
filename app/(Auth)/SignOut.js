// app/(Auth)/SignOut.js
import React, { useEffect } from 'react';
import { View, Text, Button } from 'react-native';
import { useAuth } from '../../Context/AuthContext';
import { useRouter } from 'expo-router';

export default function SignOut() {
  const { signOut } = useAuth();
  const router = useRouter();

  useEffect(() => {
    const doSignOut = async () => {
      await signOut();
      router.replace('/(Auth)/SignIn');
    };
    doSignOut();
  }, []);

  return (
    <View>
      <Text>Logging out...</Text>
    </View>
  );
}


