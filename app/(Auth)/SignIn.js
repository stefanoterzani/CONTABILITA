import React, { useState, useContext } from 'react';
import { View, Text, TextInput, Button, StyleSheet,Pressable } from 'react-native';
import { AuthContext } from '../../Context/AuthContext';
import { useRouter } from 'expo-router';
import FontAwesome from '@expo/vector-icons/FontAwesome';

export default function Login() {
  const [email, setEmail] = useState('');
  const [telefono, setTelefono] = useState(''); // Usato solo per il primo accesso
  const [password, setPassword] = useState('');
  const { loginUser, loading } = useContext(AuthContext);
  const router = useRouter();
  

  const handleLogin = async () => {
    if (!email || !password) {
      alert('Per favore, compila tutti i campi');
      return;
    }
    await loginUser(email, password, telefono);
    router.replace('/home'); // Reindirizza alla schermata Home dopo l'accesso
  };

  

  if (loading) {
    return (
      <View style={styles.container}>
        <Text>Caricamento...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
   
    <Pressable style={{alignItems:'flex-start', marginTop:20, marginLeft:20}}
    onPress={()=> router.replace('/')}>
        <FontAwesome name="home" size={30} color="black" />
    </Pressable>
        <View style={styles.loginContainer}>
      <Text>Login</Text>
      <TextInput
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        style={styles.input}
      />
      <TextInput
        placeholder="Telefono (solo per primo accesso)"
        value={telefono}
        onChangeText={setTelefono}
        style={styles.input}
      />
      <TextInput
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        style={styles.input}
      />
      <Button title="Login" onPress={handleLogin} />
    </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
   
  },
  loginContainer:{
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  input: {
    width: '100%',
    padding: 10,
    marginVertical: 5,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
  },
});
