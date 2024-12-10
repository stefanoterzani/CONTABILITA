import React, { useState, useRef, useEffect ,useContext} from 'react';
import { useForm, FormProvider } from 'react-hook-form';
import { View, Button, StyleSheet, ScrollView, Text, Platform } from 'react-native';
import { useRouter} from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';

import Header from '../../components/HeaderBasso'; // importa l'header
import { AuthContext } from '../../context/AuthContext'; // Importa il contesto
import {schemaOrdineCliente,schemaRigaOrdineCliente } from '../../schemi/schemiOrdini'; // Importa lo schema

import { filtraDatiSchema,  renderCampi, impostaValoriCampiNonVisibili  } from '../../schemi/FunzioniSchemi'; // Importa le funzio
import { useClienti } from '../../context/ClientiContext'; // Importa il contesto
import { getFooterIcons } from '../../config/footerIconsConfig'
import Footer from '../../components/Footer'
import comuni from '../../assets/dati/comuni.json';



const CreaOrdineCliente = () => {
  const { control, handleSubmit, setValue, formState: { errors } } = useForm();
 
  const router = useRouter();
  const methods = useForm();
  const { clienti } = useClienti(); // Assicurati di avere il contesto corretto
  const footerIcons = getFooterIcons('creaOrdineCliente', router, unreadMessages);
  const unreadMessages = 5; // Numero di messaggi non letti


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
    const filteredFields = Object.entries(schemaOrdineCliente);
    return renderCampi(
      '', 
      filteredFields, 
      schemaOrdineCliente, 
      control, 
      errors, 
      styles
    );
  };

  const renderCampiRighe = () => {
    const filteredFields = Object.entries(schemaRigaOrdineCliente);
    return renderCampi(
      '', 
      filteredFields, 
      schemaRigaOrdineCliente, 
      control, 
      errors, 
      styles
    );
  };

  return (
    <FormProvider {...methods}>    
      <SafeAreaView style={Platform.OS === 'web' ? styles.webContainer : styles.mobileContainer}>
  
          <Header 
              screenName=" Nuovo Ordine" // Nome della schermata
              icon="home" // Nome dell'icona da visualizzare (es. 'add', 'menu', ecc.)
              onIconPress={handleIconPress} // Funzione da eseguire quando l'icona viene premuta
          />
      
         {console.log('ORDINI CLIENTI')}
     
              <View  style={{width:'100%',height:'30%'}}>     
                {renderCampiNormali()}               
              </View>
          
              <Text style={{fontSize:18  ,fontFamily:'Roboto-Medium' ,  marginTop:10, marginBottom:5}}>RigheOrdine</Text>
              
              <View style={{width:'100%',height:'40%'}}>             
                  {renderCampiRighe()}                  
              </View>
                                                 


              <Footer icons={footerIcons} />     
             
        </SafeAreaView>
      </FormProvider>      

  );
};

const styles = StyleSheet.create({
 mobileContainer: {
    flex: 1,
    marginTop: 0,
    height: '100%',
    alignItems:'center'
  },
  webContainer: {
    flex: 1,
    width: '70%',
    borderColor: 'red',
    borderWidth: 2,
    marginHorizontal: 'auto',
    backgroundColor: 'white',
    height: '100%',
     alignItems:'center'
  },
  scrollContainer: {
    padding: 20,
  },
  campiOrdineContainer: {
    marginBottom: 20,
  },
  intestazioneRigheOrdine: {
    marginBottom: 10,
  },
  campiOrdineConteinerRighe: {
    marginBottom: 20,
  },
  row: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 0,
  },
});

export default CreaOrdineCliente;

  
//<Footer icons={footerIcons} />
// <View style={{marginLeft:10}}>