

import React, { useState, useRef, useEffect ,useContext} from 'react';

import { useForm, FormProvider } from 'react-hook-form';
import { View, Button, StyleSheet, ScrollView, Text, Platform, Alert } from 'react-native';
import { schemaAzienda } from '../../schemi/schemiAzienda';
import { AuthContext } from '../../context/AuthContext';
import { useRouter } from 'expo-router';
import { useAzienda } from '../../context/AziendaContext'; // Importa il contesto direttamente
import { filtraDatiSchema, renderCampi, impostaValoriCampiNonVisibili } from '../../schemi/FunzioniSchemi'; // Importa la funzione renderCampi

const CreaModificaAzienda = () => {
  const { control, handleSubmit, setValue, getValues, formState: { errors } } = useForm();
  const {dataUser} = useContext(AuthContext);

  const {azienda,setAzienda, fetchAzienda,updateAzienda } = useAzienda(); // Usa il contesto
  const scrollViewRef = useRef(null);
//const [datiAzienda, setDatiAzienda] = useState([]);
const router = useRouter();

const methods = useForm();


useEffect(() => {
  // Imposta i valori dei campi non visibili
impostaValoriCampiNonVisibili(schemaAzienda, setValue);
}, [setValue]);

/*
useEffect(() => {
  console.log('Dati azienda nel contesto dopo aggiornamento:', azienda); // Aggiungi un console.log per verificare i dati dell'azienda nel contesto dopo l'aggiornamento
}, [azienda]);
*/
  useEffect(() => {
    if (dataUser.idAzienda) {

    //  console.log('Dati utente:', dataUser);
     // console.log('Dati azienda:', data);
      fetchAzienda(dataUser.idAzienda) 
     .then((dati) => {
    
     console.log('Dati azienda nel contesto DATI:',dati)
       /*
      setDatiAzienda(azienda);

      */
        if (dati) {
          Object.keys(dati).forEach((key) => {
            setValue(key, dati[key]);
          });
        }
      });
    }
  }, [dataUser.idAzienda]);

  const onSubmit = async (data) => {
    console.log('Dati inviati:', data); // Log dei dati inviati
try {
      const dataOdierna = new Date().toISOString();
      data.dataCreazione = dataOdierna;
      data.dataAggiornamento = dataOdierna;
  
    // Rimuovi i campi non più presenti nello schema
    const datiFiltrati= filtraDatiSchema(schemaAzienda, data);
    await updateAzienda(dataUser.idAzienda, datiFiltrati);
    const updatedAzienda = await fetchAzienda(dataUser.idAzienda);
    setAzienda(updatedAzienda); // Aggiorna il contesto
    router.back();
  
  } catch (error) {
    console.error('Errore durante l\'aggiunta del azienda:', error);
    Alert.alert('Errore', 'Si è verificato un errore durante l\'aggiunta del azienda. Riprova.');
  }
  };
  const renderCampiNormali = () => {
    const filteredFields = Object.entries(schemaAzienda).filter(([name]) => name !== 'sedeLegale');
    return renderCampi('Anagrafica', 
      filteredFields, 
      schemaAzienda, 
      control, 
      errors, 
      styles);
  };




  return (
    <FormProvider {...methods}>
    <View style={Platform.OS === 'web' ? styles.webContainer : styles.mobileContainer}>
      <ScrollView contentContainerStyle={ styles.scrollContainer} ref={scrollViewRef}>
        {renderCampiNormali()}
        {renderCampi('Sede Legale', Object.entries(schemaAzienda.sedeLegale), schemaAzienda, control, errors, styles, 'sedeLegale')}              
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

export default CreaModificaAzienda;