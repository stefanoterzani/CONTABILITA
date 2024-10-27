import React, { useState } from 'react';
import { View, TextInput, Button, Text } from 'react-native';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../firebaseConfig';
import { useRouter } from 'expo-router';

export default function SignIn() {

 //const [email, setEmail] = useState('');
// const [password, setPassword] = useState('');
  const [password, setPassword] = useState('12345678');
  const [email, setEmail] = useState('stefanoterzani51@gmail.com');
  const [error, setError] = useState('');
  const router = useRouter();

  const handleSignIn = async () => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      router.replace('/'); // Reindirizza alla home dopo il login
    } catch (err) {
      setError(err.message);
    }
  };


  const handleSignUp=  () => {
    router.push('/SignUp')
    
  }
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>

    <View>
      <TextInput placeholder="Email" value={email} onChangeText={setEmail} />
      <TextInput placeholder="Password" value={password} secureTextEntry onChangeText={setPassword} />
      {error ? <Text>{error}</Text> : null}
      <Button title="Login" onPress={handleSignIn} />
    </View>

    <View style={{marginTop:30}}>
      <Text>Se non hai Azienda....Creala!!!! </Text>
          <Button title="Crea Nuova Azienda" onPress={handleSignUp} />
    </View>

    </View>
    





    );
}
/*
import React, { useState } from 'react';
import { View, Text, TextInput, Button } from 'react-native';
import { useRouter } from 'expo-router';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../firebaseConfig';
import { useAuth } from '../../Context/AuthContext'; // Per gestire lo stato dell'autenticazione

export default function SignIn() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();
  const { user } = useAuth();

  const handleSignIn = async () => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      router.replace('/home');  // Reindirizza alla home page
    } catch (err) {
      setError('Login fallito. Riprova.');
    }
  };

  return (
    <View style={{ padding: 16 }}>
      <Text style={{ fontSize: 24, marginBottom: 16 }}>Login</Text>
      {error ? <Text style={{ color: 'red' }}>{error}</Text> : null}
      <TextInput
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        style={{ marginBottom: 16, borderBottomWidth: 1, padding: 8 }}
      />
      <TextInput
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        style={{ marginBottom: 16, borderBottomWidth: 1, padding: 8 }}
      />
      <Button title="Sign In" onPress={handleSignIn} />
      <Button title="Sign Up" onPress={() => router.push('/(Auth)/SignUp')} />
    </View>
  );
}

*/
