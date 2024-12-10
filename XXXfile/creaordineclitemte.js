import React, { useState, useRef, useEffect, useContext } from 'react';
import { useForm, FormProvider } from 'react-hook-form';
import { View, Button, StyleSheet, ScrollView, Text, Platform, Alert } from 'react-native';
import { useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';

import HeaderBasso from '../../components/HeaderBasso'; // importa l'header
import { AuthContext } from '../../context/AuthContext'; // Importa il contesto
import { schemaOrdineCliente, schemaRigaOrdineCliente } from '../../schemi/schemiOrdini'; // Importa lo schema
import { filtraDatiSchema, renderCampi, impostaValoriCampiNonVisibili } from '../../schemi/FunzioniSchemi'; // Importa le funzioni
import { useClienti } from '../../context/ClientiContext'; // Importa il contesto
import { getFooterIcons } from '../../config/footerIconsConfig';
import menuConfig from '../../config/menuConfig.json';
import Footer from '../../components/Footer';
import { firestore } from '../../firebaseConfig'; // Importa Firestore

const CreaOrdineCliente = () => {
  const { control, handleSubmit, setValue, formState: { errors } } = useForm();
  const router = useRouter();
  const methods = useForm();
  const unreadMessages = 3; // Numero di messaggi non letti
  const footerIcons = getFooterIcons('InserimentoOrdinCliente', router, unreadMessages);

  useEffect(() => {
    // Imposta i valori dei campi non visibili
    impostaValoriCampiNonVisibili(schemaOrdineCliente, setValue);
  }, [setValue]);

  const onSubmit = async (data) => {
    try {
      const dataOdierna = new Date().toISOString();
      data.dataCreazione = dataOdierna;
      data.dataAggiornamento = dataOdierna;
      data.idCreatore = dataUser.idUser;
      await firestore.collection('ordiniClienti').add(data);
      Alert.alert('Successo', 'Ordine cliente aggiunto con successo!');
      router.push('/menuOrdiniClienti');
    } catch (error) {
      console.error('Errore durante l\'aggiunta dell\'ordine cliente:', error);
      Alert.alert('Errore', 'Si è verificato un errore durante l\'aggiunta dell\'ordine cliente. Riprova.');
    }
  };

  const renderCampiNormali = () => {
    const filteredFields = Object.entries(schemaOrdineCliente).filter(([name]) => name !== 'sedeLegale');
    return filteredFields.map(([name, field]) => {
      if (name === 'nomeCliente') {
        return (
          <CampoPersonalizzato
            key={name}
            control={control}
            name={name}
            data={clienti}
            title="Seleziona Cliente"
          />
        );
      }
      return renderCampi('', [[name, field]], schemaOrdineCliente, control, errors, styles);
    });
  };

  const renderCampiRighe = () => {
    const filteredFields = Object.entries(schemaRigaOrdineCliente).filter(([name]) => name !== 'sedeLegale');
    return renderCampi('', filteredFields, schemaRigaOrdineCliente, control, errors, styles);
  };

  return (
    <FormProvider {...methods}>
      <View style={Platform.OS === 'web' ? styles.webContainer : styles.mobileContainer}>
        <HeaderBasso
          screenName="Nuovo Ordine"
          icon="home"
          onIconPress={() => router.push('/home')}
        />
        <ScrollView contentContainerStyle={styles.scrollContainer} ref={scrollViewRef}>
          <View style={styles.campiOrdineContainer}>
            {renderCampiNormali()}
          </View>
          <View style={styles.intestazioneRigheOrdine}>
            <Text style={{ fontSize: 20, fontWeight: 'bold' }}>Righe ordine</Text>
          </View>
          <View style={styles.campiOrdineConteinerRighe}>
            {renderCampiRighe()}
          </View>
          <Button title="Invia" onPress={handleSubmit(onSubmit)} />
        </ScrollView>
      </View>
    </FormProvider>
  );
};

export default CreaOrdineCliente;

const styles = StyleSheet.create({
  mobileContainer: {
    flex: 1,
    marginTop: 0,
  },
  webContainer: {
    flex: 1,
    width: '70%',
    borderColor: 'red',
    borderWidth: 2,
    marginHorizontal: 'auto',
    backgroundColor: 'white',
  },
  scrollContainer: {
    padding: 20,
  },
  input: {
    borderColor: 'gray',
    borderWidth: 1,
    width: '90%',
    height: 40,
    fontSize: 16,
    fontFamily: 'Roboto-Regular',
    paddingHorizontal: 10,
    marginBottom: 10,
  },
});           