import React, { useState,useCallback, useEffect, useContext } from 'react';
import { View, Text, StyleSheet, ActivityIndicator, SafeAreaView ,TouchableOpacity} from 'react-native';
import { doc, getDoc } from 'firebase/firestore';
import { useRouter , useLocalSearchParams,useFocusEffect } from 'expo-router';
import { db } from '../../firebaseConfig';
import { AuthContext } from '../../Context/AuthContext';
//import { useLocalSearchParams } from 'expo-router'

const dettagli = () => {
 
    const router = useRouter();
  
  const {fornitoreId}=useLocalSearchParams('fornitoreId')
 //   console.log('DETTAGLI=',fornitoreId)
 
  const { datiAzienda } = useContext(AuthContext);
  const aziendaId = datiAzienda.id;
  const [fornitoreData, setFornitoreData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const fetchFornitoreData = useCallback(async () => {
    if (fornitoreId) {
      const fornitoreRef = doc(db, 'aziende', aziendaId, 'Fornitori', fornitoreId);
      const fornitoreSnap = await getDoc(fornitoreRef);
      if (fornitoreSnap.exists()) {
        setFornitoreData(fornitoreSnap.data());
      }
    }
    setIsLoading(false);
  }, [fornitoreId, aziendaId]);

  useFocusEffect(
    useCallback(() => {
      fetchFornitoreData();
    }, [fetchFornitoreData])
  );


  if (isLoading) {
    return <ActivityIndicator size="large" color="#0000ff" style={{ flex: 1, justifyContent: 'center' }} />;
  }

  if (!fornitoreData) {
    return (
      <SafeAreaView style={styles.container}>
        <Text>Fornitore non trovato</Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>{fornitoreData.ragioneSociale}</Text>
      <Text>Partita IVA: {fornitoreData.partitaIva}</Text>
      <Text>Email: {fornitoreData.email}</Text>
      <Text>PEC: {fornitoreData.pec}</Text>
      <Text>Sede Legale:</Text>
      <Text>Indirizzo: {fornitoreData.sedeLegale.indirizzo}</Text>
      <Text>Città: {fornitoreData.sedeLegale.citta}</Text>
      <Text>Provincia: {fornitoreData.sedeLegale.provincia}</Text>
      <Text>CAP: {fornitoreData.sedeLegale.cap}</Text>
      <Text>Nazione: {fornitoreData.sedeLegale.nazione}</Text>
      <Text>Telefono: {fornitoreData.sedeLegale.telefono}</Text>
     
      {fornitoreData.sediAmministrative && fornitoreData.sediAmministrative.length > 0 && (
        <>
          <Text style={styles.subtitle}>Sedi Amministrative:</Text>
          {fornitoreData.sediAmministrative.map((sede, index) => (
            <View key={index} style={styles.sede}>
              <Text>Indirizzo: {sede.indirizzo}</Text>
              <Text>Città: {sede.citta}</Text>
              <Text>Provincia: {sede.provincia}</Text>
              <Text>CAP: {sede.cap}</Text>
              <Text>Nazione: {sede.nazione}</Text>
              <Text>Telefono: {sede.telefono}</Text>
            </View>
          ))}
        </>
      )}
      {fornitoreData.logistiche && fornitoreData.logistiche.length > 0 && (
        <>
          <Text style={styles.subtitle}>Sedi Logistiche:</Text>
          {fornitoreData.logistiche.map((sede, index) => (
            <View key={index} style={styles.sede}>
              <Text>Indirizzo: {sede.indirizzo}</Text>
              <Text>Città: {sede.citta}</Text>
              <Text>Provincia: {sede.provincia}</Text>
              <Text>CAP: {sede.cap}</Text>
              <Text>Nazione: {sede.nazione}</Text>
              <Text>Telefono: {sede.telefono}</Text>
            </View>
          ))}
        </>
      )}
      {fornitoreData.riferimenti && fornitoreData.riferimenti.length > 0 && (
        <>
          <Text style={styles.subtitle}>Riferimenti:</Text>
          {fornitoreData.riferimenti.map((riferimento, index) => (
            <View key={index} style={styles.riferimento}>
              <Text>Nome: {riferimento.nome}</Text>
              <Text>Cognome: {riferimento.cognome}</Text>
              <Text>Ruolo: {riferimento.ruolo}</Text>
              <Text>Email: {riferimento.email}</Text>
              <Text>Telefono: {riferimento.telefono}</Text>
            </View>
          ))}
        </>
      )}
   
      <TouchableOpacity style={styles.button} onPress={() => router.push(`anagraficaFornitore?fornitoreId=${fornitoreId}`)}>
        <Text style={styles.buttonText}>Modifica Fornitore</Text>
      </TouchableOpacity>
   </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  subtitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 16,
  },
  sede: {
    marginVertical: 8,
  },
  riferimento: {
    marginVertical: 8,
  },
  button: {
    backgroundColor: 'lightOrange',
    padding: 10,
    marginVertical: 16,
    alignItems: 'center',
  },
  buttonText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default dettagli;