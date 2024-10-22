


import React, { useState } from 'react';
import { View, TextInput, Button, Text } from 'react-native';
import { auth, db } from '../../firebaseConfig'; // Modulo Firebase
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';

const SignUp = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [companyName, setCompanyName] = useState('');
  const [error, setError] = useState(null);

  const handleSignUp = async () => {
    try {
      // Crea l'utente con email e password
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // Creazione del documento azienda in Firestore con l'ID dell'amministratore
      await setDoc(doc(db, 'aziende', user.uid), {
        nomeAzienda: companyName, // Nome dell'azienda
        amministratore: {
          email: user.email, // Email dell'amministratore
          uid: user.uid, // UID dell'amministratore
        },
        ruolo: 'amministratore', // Impostazione del ruolo
        dataCreazione: new Date(),
      });

      console.log('Azienda creata con successo!');
      router.replace('/home');

    } catch (error) {
      console.error('Errore durante la registrazione: ', error);
      setError('Registrazione fallita: ' + error.message);
    }
  };

  return (
    <View>
      <TextInput
        placeholder="Nome Azienda"
        value={companyName}
        onChangeText={setCompanyName}
      />
      <TextInput
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
      />
      <TextInput
        placeholder="Password"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />
      <Button title="Sign Up" onPress={handleSignUp} />
      {error && <Text>{error}</Text>}
    </View>
  );
};

export default SignUp;
