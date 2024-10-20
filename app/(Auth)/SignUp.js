import React, { useState } from 'react';
import { View, TextInput, Button, Alert, StyleSheet } from 'react-native';
import { db, auth } from '../../firebaseConfig'
import { doc, setDoc } from 'firebase/firestore';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { collection, addDoc } from "firebase/firestore";

const SignUp = () => {

  
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [companyName, setCompanyName] = useState('');

  const handleRegister = async () => {
    try {
      // Creazione dell'account
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const userId = userCredential.user.uid;

      // Creazione delle collezioni per l'azienda
      await setDoc(doc(db, "aziende", userId), {
        nome: companyName,
        email: email
      });
// Esempio di aggiunta di un documento in una collezione
/*
await addDoc(collection(db, `aziende/${userId}/clienti`), {}); // Aggiunta di un documento "clienti" con ID auto-generato
await addDoc(collection(db, `aziende/${userId}/fornitori`), {}); // Aggiunta di un documento "fornitori" con ID auto-generato
await addDoc(collection(db, `aziende/${userId}/banche`), {}); // Aggiunta di un documento "banche" con ID auto-generato
await addDoc(collection(db, `aziende/${userId}/prodotti`), {}); // Aggiunta di un documento "prodotti" con ID auto-generato
await addDoc(collection(db, `aziende/${userId}/preventivi`), {}); // Aggiunta di un documento "preventivi" con ID auto-generato
await addDoc(collection(db, `aziende/${userId}/ordini/inviati`), {}); // Aggiunta di un documento "ordini inviati" con ID auto-generato
await addDoc(collection(db, `aziende/${userId}/ordini/ricevuti`), {}); // Aggiunta di un documento "ordini ricevuti" con ID auto-generato
await addDoc(collection(db, `aziende/${userId}/fatture/emesse`), {}); // Aggiunta di un documento "fatture emesse" con ID auto-generato
await addDoc(collection(db, `aziende/${userId}/fatture/ricevute`), {}); // Aggiunta di un documento "fatture ricevute" con ID auto-generato
await addDoc(collection(db, `aziende/${userId}/corrispondenza`), {}); // Aggiunta di un documento "corrispondenza" con ID auto-generato
  */    // Creazione delle sottocartelle
  console.log("Creazione clienti...");
    await setDoc(doc(db, `aziende/${userId}/clienti`, userId), {}); 

    console.log("Creazione fornitori...");
    await setDoc(doc(db, `aziende/${userId}/fornitori`, userId), {}); 

    console.log("Creazione banche...");
    await setDoc(doc(db, `aziende/${userId}/banche`, userId), {}); 

    console.log("Creazione prodotti...");
    await setDoc(doc(db, `aziende/${userId}/prodotti`, userId), {}); 

    console.log("Creazione preventivi...");
    await setDoc(doc(db, `aziende/${userId}/preventivi`, userId), {}); 
    console.log("Creazione corrispondenza...");
    await setDoc(doc(db, `aziende/${userId}/corrispondenza`, userId), {});
    // Creazione del documento per 'ordini'
    const ordiniDocRef = doc(db, `aziende/${userId}/ordini`, "documentoOrdini");
    await setDoc(ordiniDocRef, {});

    console.log("Creazione ordini/inviati...");
    await setDoc(doc(collection(db, `aziende/${userId}/ordini/documentoOrdini/inviati`), userId), {}); 

    console.log("Creazione ordini/ricevuti...");
    await setDoc(doc(collection(db, `aziende/${userId}/ordini/documentoOrdini/ricevuti`), userId), {}); 

    // Creazione del documento per 'fatture'
    const fattureDocRef = doc(db, `aziende/${userId}/fatture`, "documentoFatture");
    await setDoc(fattureDocRef, {});

    console.log("Creazione fatture/emesse...");
    await setDoc(doc(collection(db, `aziende/${userId}/fatture/documentoFatture/emesse`), userId), {}); 

    console.log("Creazione fatture/ricevute...");
    await setDoc(doc(collection(db, `aziende/${userId}/fatture/documentoFatture/ricevute`), userId), {}); 

    
    

     
      Alert.alert("Registrazione completata!", "L'account è stato creato con successo.");
    } catch (error) {
     console.log("Errore di registrazione", error.message);
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Nome Azienda"
        value={companyName}
        onChangeText={setCompanyName}
      />
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      <Button title="Registrati" 
      onPress={handleRegister} 

      />
    </View>
  );
 
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 16,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 12,
    paddingLeft: 8,
  },
});

export default SignUp