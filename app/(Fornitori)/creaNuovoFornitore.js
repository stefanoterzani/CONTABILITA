import React, { useState, useRef, useEffect ,useContext} from 'react';
import { useForm, FormProvider } from 'react-hook-form';
import { View, Button, StyleSheet, ScrollView, Text, Platform ,Alert} from 'react-native';
import { useRouter} from 'expo-router';

// import Applicazione context
import { AuthContext } from '../../context/AuthContext';
import { addFornitore, getFornitori,updateFornitore } from '../../servizi/FunzioniFornitori';

import {schemaFornitore } from '../../schemi/schemiFornitori';
import { filtraDatiSchema,  renderCampi, impostaValoriCampiNonVisibili  } from '../../schemi/FunzioniSchemi'; // Importa le funzio
import { useFornitori } from '../../context/FornitoriContext'; // Importa il contesto

const CreaNuovoFornitore = () => {
  const { control, handleSubmit, setValue, formState: { errors } } = useForm();
  const {dataUser} = useContext(AuthContext);
  const scrollViewRef = useRef(null);
  const { fetchFornitori } = useFornitori(); // Usa il contesto
  const router = useRouter();
  const methods = useForm();
  
  useEffect(() => {
      // Imposta i valori dei campi non visibili
    impostaValoriCampiNonVisibili(schemaFornitore, setValue);
    }, [setValue]);



  const onSubmit = async (data) => {
    try {
      const dataOdierna = new Date().toISOString();
      data.dataCreazione = dataOdierna;
      data.dataAggiornamento = dataOdierna;
      data.idCreatore = dataUser.idUser;

    const datiFiltrati= filtraDatiSchema(schemaFornitore, data);
    const Fornitori = await getFornitori(dataUser.idAzienda);
    if (Fornitori.length === 0) {
      // La collezione non esiste, aggiungi il primo Fornitore
      console.log('DATAUSER', dataUser.idAzienda);
      docRef = await addFornitore(dataUser.idAzienda, datiFiltrati);
    } else {
      // La collezione esiste, aggiungi il Fornitore
      docRef = await addFornitore(dataUser.idAzienda, datiFiltrati);
    }

    if (docRef && docRef.id) {
      // Aggiungi l'idFornitore al documento appena creato
      await updateFornitore(dataUser.idAzienda, docRef.id, { idFornitore: docRef.id });
    } else {
      throw new Error('Errore durante la creazione del Fornitore: docRef è undefined');
    }

   fetchFornitori(dataUser.idAzienda);

   
  //  await aggiornaFornitore(Fornitore.idFornitore, datiFiltrati);
 //   const updatedFornitore = await getFornitore(Fornitore.idFornitore);
 //   setDatiFornitore(updatedFornitore); // Aggiorna il contesto
   
    router.back();
  } catch (error) {
    console.error('Errore durante l\'aggiunta del Fornitore:', error);
    Alert.alert('Errore', 'Si è verificato un errore durante l\'aggiunta del Fornitore. Riprova.');
  }
  };



const renderCampiNormali = () => {
  const filteredFields = Object.entries(schemaFornitore).filter(([name]) => name !== 'sedeLegale');
  return renderCampi('Anagrafica', filteredFields, schemaFornitore, control, errors, styles);
};

  return (
    <FormProvider {...methods}>
    <View style={Platform.OS === 'web' ? styles.webContainer : styles.mobileContainer}>
      <ScrollView contentContainerStyle={ styles.scrollContainer} ref={scrollViewRef}>
        {renderCampiNormali()}
        {renderCampi('Sede Legale', Object.entries(schemaFornitore.sedeLegale), schemaFornitore, control, errors, styles, 'sedeLegale')}       
      </ScrollView>

      <View style={Platform.OS === 'web' ? styles.webButtonContainer : styles.mobileButtonContainer} >
       
        <View style={{marginTop:10}}>
          <Button  title="Invia" onPress={handleSubmit(onSubmit)} />
        </View>
      </View>
    </View>
    </FormProvider>
  );
};

const styles = StyleSheet.create({
  mobileContainer: {
    flex: 1,
    marginTop: 70,
  },
  webContainer: {
    flex: 1,
    width:'70%',
    borderColor:'red',
    borderWidth:2,
    marginHorizontal:'auto',
    backgroundColor:'white',
  },
  scrollContainer: {
    padding: 20,
    alignItems: 'center',
  },
  sectionContainer: {
    marginBottom: 10,
    width: '100%',
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  subtitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  subFieldContainer: {
    marginBottom: 20,
    paddingLeft: 10,
    borderLeftWidth: 1,
    borderLeftColor: '#ccc',
    width: '100%',
  },
  row: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 0,
  //  justifyContent: 'space-between', // Aggiungi questa linea per distribuire uniformemente i campi
  },
  webButtonContainer: {
    flexDirection: 'row',
    padding: 20,
    borderTopWidth: 1,
    borderTopColor: '#ccc',
    backgroundColor: '#fff',
    width: '100%',
    justifyContent:'space-between',
   
  },
  mobileButtonContainer: {
    flexDirection: 'column',
    padding: 20,
    borderTopWidth: 1,
    borderTopColor: '#ccc',
    backgroundColor: '#fff',
    width: '100%',
   
   
  },
});

export default CreaNuovoFornitore;