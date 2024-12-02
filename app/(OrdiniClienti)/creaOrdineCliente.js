import React, { useState, useRef, useEffect ,useContext} from 'react';
import { useForm, FormProvider } from 'react-hook-form';
import { View, Button, StyleSheet, ScrollView, Text, Platform ,Alert} from 'react-native';
import { useRouter} from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';

import Header from '../../components/Header'; // importa l'header
// import Applicazione context
import { AuthContext } from '../../context/AuthContext'; // Importa il contesto
import {schemaOrdineCliente,schemaRigaOrdineCliente } from '../../schemi/schemiOrdini'; // Importa lo schema

import { filtraDatiSchema,  renderCampi, impostaValoriCampiNonVisibili  } from '../../schemi/FunzioniSchemi'; // Importa le funzio
import { useClienti } from '../../context/ClientiContext'; // Importa il contesto






const CreaOrdineCliente = () => {
  const { control, handleSubmit, setValue, formState: { errors } } = useForm();
 
  const router = useRouter();
  const methods = useForm();
 
  const scrollViewRef = useRef(null);

  useEffect(() => {
    // Imposta i valori dei campi non visibili
  impostaValoriCampiNonVisibili(schemaOrdineCliente, setValue);
  }, [setValue]);




  const handleIconPress = () => {
    // Naviga alla schermata principale
    router.push('/home'); // Assicurati che la route '/home' esista
    console.log('Ho premuto l\'icona Home sul header di ordiniCliente');
  };

  const renderCampiNormali = () => {
    const filteredFields = Object.entries(schemaOrdineCliente).filter(([name]) => name !== 'sedeLegale');
    return renderCampi('', filteredFields, schemaOrdineCliente, control, errors, styles);
  };
  const renderCampiRighe = () => {
    const filteredFields = Object.entries(schemaRigaOrdineCliente).filter(([name]) => name !== 'sedeLegale');
    return renderCampi('', filteredFields, schemaRigaOrdineCliente, control, errors, styles);
  };

  return (
  <FormProvider {...methods}>
  <View  style={Platform.OS === 'web' ? styles.webContainer : styles.mobileContainer}> 
  
  
    
        <Header 
          screenName=" Nuovo Ordine" // Nome della schermata
          icon="home" // Nome dell'icona da visualizzare (es. 'add', 'menu', ecc.)
          onIconPress={handleIconPress} // Funzione da eseguire quando l'icona viene premuta
        />
         <ScrollView contentContainerStyle={ styles.scrollContainer} ref={scrollViewRef}>
            {renderCampiNormali()}       
        </ScrollView>

      
            <View style={{width:'100%',borderColor:'red',borderWidth:2,height:'50%'}}>
                <View style={{paddingHorizontal:10,width:'100%',borderColor:'blue',borderWidth:2,height:'75%'}}>
                  {renderCampiRighe()}   
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
    width:'100%',
    marginHorizontal:'auto',
     height:'100%',
     borderColor:'red',
     borderWidth:2,
  },
  webContainer: {
    flex: 1,
    width:'70%',
    borderColor:'red',
    borderWidth:2,
    marginHorizontal:'auto',
    backgroundColor:'white',
    height:'100%'
  },
  scrollContainer: {
    paddingLeft: 10,
   // alignItems: 'center',
    borderColor:'blue',
    borderWidth:2,
    height:'92%'
  },
  scrollContainerRiga: {
    paddingLeft: 10,
   // alignItems: 'center',
    borderColor:'blue',
    borderWidth:3,
    
  },
  sectionContainer: {
    marginBottom: 0,
    width: '100%',
  },
  title: {
   // fontSize: 16,
   // fontWeight: 'bold',
    marginBottom:0,
 
  },
  row: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 0,
  
  //  justifyContent: 'space-between', // Aggiungi questa linea per distribuire uniformemente i campi
  },
 
});

export default CreaOrdineCliente;