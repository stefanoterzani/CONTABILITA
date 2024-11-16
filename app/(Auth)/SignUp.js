import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

const SignUp = () => {
  return (
    <View>
      <Text>SignUp</Text>
    </View>
  )
}

export default SignUp

const styles = StyleSheet.create({})

/*

import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet, Text } from 'react-native';
import { auth, db } from '../../firebaseConfig'
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';

const SignUp = () => {
  const [azienda,setAzienda]=useState('')
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [nome, setNome] = useState('');
  const [cognome, setCognome] = useState('');
  const [dataNascita, setDataNascita] = useState('');
  const [telefono, setTelefono] = useState('');





const handleSignUp = async () => {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;
    
    // Crea documento azienda con dati pubblici e privati
    await setDoc(doc(db, 'aziende', user.uid), {
      datiPubblici: {
        nome: azienda,
        // aggiungi altri dati pubblici
      },
      datiPrivati: {
        indirizzo: 'Via Roma 1',
        partitaIVA: '1234567890',
        // aggiungi altri dati privati
      }
    });

    // Crea ruolo amministratore
    await setDoc(doc(db, 'aziende', user.uid, 'ruoli', user.uid), {
      ruolo: 'amministratore',
      permessi: ['leggi', 'scrivi'],
      nome,
      cognome,
      dataNascita,
      telefono
    });

    console.log('Registrazione avvenuta con successo e dati memorizzati!');
  } catch (error) {
    console.error('Errore durante la registrazione:', error);
  }
};




return (
  <View style={styles.container}>
    <Text>Registrazione Azienda</Text>
    <TextInput placeholder="Nome Azienda" value={azienda} onChangeText={setAzienda} style={styles.input} />
    <TextInput placeholder="Email Accesso (Amministratore)" value={email} onChangeText={setEmail} style={styles.input} />
    <TextInput placeholder="Password" value={password} onChangeText={setPassword}  style={styles.input} />
    <Text>Dati Amministratore</Text>
    <TextInput placeholder="Nome" value={nome} onChangeText={setNome} style={styles.input} />
    <TextInput placeholder="Cognome" value={cognome} onChangeText={setCognome} style={styles.input} />
    <TextInput placeholder="Data di Nascita" value={dataNascita} onChangeText={setDataNascita} style={styles.input} />
    <TextInput placeholder="Telefono" value={telefono} onChangeText={setTelefono} style={styles.input} />
    <Button title="Sign Up" onPress={handleSignUp} />
  </View>
);
};

const styles = StyleSheet.create({
container: {
  flex: 1,
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

export default SignUp;
*/

/*
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
*/
