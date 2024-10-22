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


/*  
import { Text, View ,Alert} from 'react-native'
import React, { useEffect, useState } from 'react';

import { router } from 'expo-router'
import { auth} from '../../firebaseConfig';
import {  signOut} from 'firebase/auth';

const SignOut = () => {
  const [data, setData] = useState([]);
  const [user, setUser] = useState(null);
  
useEffect(()=>{
  handleSignOut;
  Alert.alert('Sign Out Eseguito con successo');
  router.push('/'); // Reindirizza alla pagina di login
},[])

  const handleSignOut = () => {
    signOut(auth)
    .then(() => {
      setUser(null);
      console.log('User signed out');
   
    })
    .catch(error => {
      console.error('Sign out error:', error.message);
      Alert.alert('Sign Out Error', error.message); // Mostra un messaggio di errore
    });

  }
  
  
  
  return (
    <View>
      <Text>SignOut</Text>
    </View>
  )
}

export default SignOut

*/