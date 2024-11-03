import React, { useState, useContext } from 'react';
import {Platform,ScrollView, View, TextInput, Button, StyleSheet, Text } from 'react-native';
import { db } from '../../firebaseConfig';
import { doc, setDoc,collection } from 'firebase/firestore';
import { useAuth } from '../../Context/AuthContext';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { router } from 'expo-router';


const AggiungeCliente = () => {
  const { currentUser ,ruolo} = useAuth();

  const [form, setForm] = useState({
    nome: '',
    indirizzo: '',
    cap: '',
    città: '',
    partitaIva: '',
    codiceFiscale: '',
    email: '',
    saldoOrdini: 0,
    saldoFatture: 0,
  });

  const handleChange = (name, value) => {
    setForm((prevForm) => ({
      ...prevForm,
      [name]: value,
    }));
  };

  const handleAddClient = async () => {
    if (ruolo !== 'amministratore') {
      console.log('Accesso negato: solo l\'amministratore può aggiungere clienti');
      return;
    }
    if (currentUser) {
    try {
        const clientId = new Date().getTime().toString(); // Genera un ID unico per il cliente
        
               
       // await setDoc(doc(collection(db, 'aziende', currentUser.uid, 'archivi', 'CLIENTI'), clientId), {
        await setDoc(doc(db, 'aziende', currentUser.uid, 'CLIENTI', clientId), {
       
               
        datiPubblici: {
          nome: form.nome,
          indirizzo: form.indirizzo,
          cap: form.cap,
          città: form.città,
          partitaIva: form.partitaIva,
          codiceFiscale: form.codiceFiscale,
          email: form.email,
        },
        datiPrivati: {
          saldoOrdini: parseFloat(form.saldoOrdini),
          saldoFatture:  parseFloat(form.saldoFatture)
          
        },
      });
      console.log('Cliente aggiunto con successo!');
      router.back()
    } catch (error) {
      console.error('Errore durante l\'aggiunta del cliente:', error);
      router.back()
    }
  }
}

  return (
    
      <KeyboardAwareScrollView
        style={styles.container}
        contentContainerStyle={styles.container}
        enableOnAndroid={true}
        extraHeight={Platform.select({ android: 100 })}
      >
       
       <ScrollView contentContainerStyle={styles.scrollContainer}>
            
          <Text style={styles.headerText}>Aggiungi Cliente</Text>
         
        
          
          <TextInput placeholder="Nome" value={form.nome} onChangeText={(value) => handleChange('nome', value)} style={styles.input} />
          <TextInput placeholder="Indirizzo" value={form.indirizzo} onChangeText={(value) => handleChange('indirizzo', value)} style={styles.input} />
          <TextInput placeholder="CAP" value={form.cap} onChangeText={(value) => handleChange('cap', value)} style={styles.input} />
          <TextInput placeholder="Città" value={form.città} onChangeText={(value) => handleChange('città', value)} style={styles.input} />
          <TextInput placeholder="Partita IVA" value={form.partitaIva} onChangeText={(value) => handleChange('partitaIva', value)} style={styles.input} />
          <TextInput placeholder="Codice Fiscale" value={form.codiceFiscale} onChangeText={(value) => handleChange('codiceFiscale', value)} style={styles.input} />
          <TextInput placeholder="Email" value={form.email} onChangeText={(value) => handleChange('email', value)} style={styles.input} />
          <TextInput placeholder="Saldo Ordini" value={form.saldoOrdini} onChangeText={(value) => handleChange('saldoOrdini', value)} style={styles.input} />
          <TextInput placeholder="Saldo Fatture" value={form.saldoFatture} onChangeText={(value) => handleChange('saldoFatture', value)} style={styles.input} />
      
    
          <View style={styles.buttonContainer}>
            <Button title="Aggiungi Cliente" onPress={handleAddClient} style={styles.button} />
          </View>
         
   </ScrollView>
   </KeyboardAwareScrollView>
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
    width: '90%', // Estende i campi di input alla larghezza completa
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


export default AggiungeCliente
