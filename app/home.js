import { View, Text, Button } from 'react-native';
import { useAuth } from '../Context/AuthContext';
import { useRouter } from 'expo-router';

export default function Home() {
  const { user, companyName, logout } = useAuth();
  const router = useRouter();

  const handleLogout = async () => {
    await logout(); // Logout dall'utente
    router.replace('/SignIn'); // Torna alla schermata di login
  };

  return (
    <View>
      <Text>Welcome, {user ? user.email : 'Guest'}</Text>
      {companyName && <Text>Company: {companyName}</Text>} 
      <Button title="Logout" onPress={handleLogout} />
    </View>
  );
}



/*
import React from 'react';
import { View, Text, Button } from 'react-native';
import { useAuth } from '../Context/AuthContext';  // Assicurati di avere il contesto di autenticazione
import { auth } from '../firebaseConfig'; // Assicurati di importare la tua configurazione Firebase
import { signOut } from 'firebase/auth';

const Home = () => {
  const { user } = useAuth();

  const handleSignOut = async () => {
    try {
      await signOut(auth);  // Effettua il logout
    } catch (error) {
      console.error('Errore durante il logout:', error);
    }
  };

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Benvenuto, {user?.email || 'Utente'}</Text>
      <Button title="Esci" onPress={handleSignOut} />
    </View>
  );
};

export default Home;
*/