import React, { useState, useContext } from 'react';
import { View, Text, TextInput, Button, StyleSheet, ScrollView, KeyboardAvoidingView, Platform } from 'react-native';
import { useAuth } from '../../Context/AuthContext';
import { db, auth } from '../../firebaseConfig';
import { doc, setDoc } from 'firebase/firestore';
import { createUserWithEmailAndPassword } from 'firebase/auth';

const GeneraRuolo = () => {
  const { currentUser ,ruolo} = useAuth();
  const [form, setForm] = useState({
    nome: '',
    cognome: '',
    dataNascita: '',
    telefono: '',
    email: '',
    password: '',
    ruolo: 'Addetto Prodotti'
  });

  const handleChange = (name, value) => {
    setForm({ ...form, [name]: value });
  };

  const handleAddRole = async () => {
    if (currentUser && ruolo === 'amministratore') {
      try {
        // Crea un nuovo utente in Firebase Authentication
        const userCredential = await createUserWithEmailAndPassword(auth, form.email, form.password);
        const newUserId = userCredential.user.uid;

        // Crea ruolo con permessi specifici
        await setDoc(doc(db, 'aziende', currentUser.uid, 'ruoli', newUserId), {
          ruolo: form.ruolo,
          permessi: {
            leggi: ['CLIENTI', 'PRODOTTI', 'FORNITORI', 'ORDINI'],
            scrivi: ['PRODOTTI']
          },
          nome: form.nome,
          cognome: form.cognome,
          dataNascita: form.dataNascita,
          telefono: form.telefono,
          email: form.email
        });

        console.log('Ruolo aggiunto con successo!');
      } catch (error) {
        console.error('Errore durante l\'aggiunta del ruolo:', error);
      }
    } else {
      console.log('Solo l\'amministratore può creare nuovi ruoli.');
    }
  };

  return (
    <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <Text style={styles.headerText}>Aggiungi Ruolo</Text>
        <TextInput placeholder="Nome" value={form.nome} onChangeText={(value) => handleChange('nome', value)} style={styles.input} />
        <TextInput placeholder="Cognome" value={form.cognome} onChangeText={(value) => handleChange('cognome', value)} style={styles.input} />
        <TextInput placeholder="Data di Nascita" value={form.dataNascita} onChangeText={(value) => handleChange('dataNascita', value)} style={styles.input} />
        <TextInput placeholder="Telefono" value={form.telefono} onChangeText={(value) => handleChange('telefono', value)} style={styles.input} />
        <TextInput placeholder="Email" value={form.email} onChangeText={(value) => handleChange('email', value)} style={styles.input} />
        <TextInput placeholder="Password" value={form.password} onChangeText={(value) => handleChange('password', value)} secureTextEntry style={styles.input} />
        <Button title="Aggiungi Ruolo" onPress={handleAddRole} style={styles.button} />
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContainer: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  input: {
    width: '90%', // Estende i campi di input alla larghezza del container meno margine
    padding: 10,
    marginVertical: 5,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
  },
  buttonContainer: {
    width: '90%', // Estende il bottone alla larghezza del container meno margine
    marginTop: 20,
  },
  headerText: {
    fontSize: 24,
    marginBottom: 20,
  },
});

export default GeneraRuolo;
