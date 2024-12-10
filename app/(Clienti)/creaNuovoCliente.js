//import InputField from '../../components/inputField'; // Assicurati che il percorso sia corretto

import React, { useState, useRef, useEffect ,useContext} from 'react';
import { useForm, FormProvider } from 'react-hook-form';
import { View, Button, StyleSheet, ScrollView, Text, Platform ,Alert} from 'react-native';
import { useRouter} from 'expo-router';

// import Applicazione context
import { AuthContext } from '../../context/AuthContext';
import { addCliente, getClienti,updateCliente } from '../../servizi/FunzioniClienti';
import Header from '../../components/Header';
import {schemaCliente } from '../../schemi/schemiClienti';
import { filtraDatiSchema,  renderCampi, impostaValoriCampiNonVisibili  } from '../../schemi/FunzioniSchemi'; // Importa le funzio
import { useClienti } from '../../context/ClientiContext'; // Importa il contesto

const CreaNuovoCliente = () => {
  const { control, handleSubmit, setValue, formState: { errors } } = useForm();
  const {dataUser} = useContext(AuthContext);
  const scrollViewRef = useRef(null);
  const { fetchClienti } = useClienti(); // Usa il contesto
  const router = useRouter();

  const methods = useForm();

  /*****************************non serve da sistemare ******************* */
 const [inputStile,setInputeStile]=useState({height: 30});
/*********************************************************************** */

const handleIconPress = () => {
  // Naviga alla schermata principale
  router.push('/menuClienti'); // Assicurati che la route '/home' esista
  console.log('Ho premuto l\'icona Home sul header di Menu Clienti');
};


  useEffect(() => {
      // Imposta i valori dei campi non visibili
    impostaValoriCampiNonVisibili(schemaCliente, setValue);
    }, [setValue]);



  const onSubmit = async (data) => {
    try {
      const dataOdierna = new Date().toISOString();
      data.dataCreazione = dataOdierna;
      data.dataAggiornamento = dataOdierna;
      data.idCreatore = dataUser.idUser;

    const datiFiltrati= filtraDatiSchema(schemaCliente, data);
    const clienti = await getClienti(dataUser.idAzienda);
    
    
    if (clienti.length === 0) {
      // La collezione non esiste, aggiungi il primo cliente
      console.log('DATAUSER', dataUser.idAzienda);
      docRef = await addCliente(dataUser.idAzienda, datiFiltrati);
    } else {
      // La collezione esiste, aggiungi il cliente
      docRef = await addCliente(dataUser.idAzienda, datiFiltrati);
    }

    if (docRef && docRef.id) {
      // Aggiungi l'idCliente al documento appena creato
      await updateCliente(dataUser.idAzienda, docRef.id, { idCliente: docRef.id });
    } else {
      throw new Error('Errore durante la creazione del cliente: docRef è undefined');
    }

   fetchClienti(dataUser.idAzienda);

   
  //  await aggiornaCliente(cliente.idCliente, datiFiltrati);
 //   const updatedCliente = await getCliente(cliente.idCliente);
 //   setDatiCliente(updatedCliente); // Aggiorna il contesto
   
    router.back();
  } catch (error) {
    console.error('Errore durante l\'aggiunta del cliente:', error);
    Alert.alert('Errore', 'Si è verificato un errore durante l\'aggiunta del cliente. Riprova.');
  }
  };



const renderCampiNormali = () => {
  const filteredFields = Object.entries(schemaCliente).filter(([name]) => name !== 'sedeLegale');
 // console.log(JSON.stringify(filteredFields, null, 2))
  return renderCampi(
    'Anagrafica', 
    filteredFields, 
    schemaCliente, 
    control, 
    errors, 
    styles,
 
    );
};

  return (
    
    <FormProvider {...methods}>
    <View style={Platform.OS === 'web' ? styles.webContainer : styles.mobileContainer}>
    <Header 
            screenName="Nuovo Cliente" // Nome della schermata
            icon="home" // Nome dell'icona da visualizzare (es. 'add', 'menu', ecc.)
            onIconPress={handleIconPress} // Funzione da eseguire quando l'icona viene premuta
          />
      <ScrollView contentContainerStyle={ styles.scrollContainer} ref={scrollViewRef}>
     
        {renderCampiNormali()}
       
        {renderCampi('Sede Legale', Object.entries(schemaCliente.sedeLegale), schemaCliente, control, errors,styles, 'sedeLegale',inputStile)}       
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
    marginTop:0,
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
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  subtitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  subFieldContainer: {
    marginBottom: 50,
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

export default CreaNuovoCliente;