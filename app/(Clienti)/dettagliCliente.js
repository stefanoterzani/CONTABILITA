import React, { useState,useCallback, useEffect, useContext } from 'react';
import { View, Text, StyleSheet, ActivityIndicator, SafeAreaView ,TouchableOpacity} from 'react-native';
import { doc, getDoc } from 'firebase/firestore';
import { useRouter , useLocalSearchParams,useFocusEffect } from 'expo-router';
import { db } from '../../firebaseConfig';
import { AuthContext } from '../../Context/AuthContext';
//import { useLocalSearchParams } from 'expo-router'

const dettagli = () => {
 
    const router = useRouter();
  
  const {clienteId}=useLocalSearchParams('clienteId')
 //   console.log('DETTAGLI=',clienteId)
 
  const { datiAzienda } = useContext(AuthContext);
  const aziendaId = datiAzienda.id;
  const [clienteData, setClienteData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const fetchClienteData = useCallback(async () => {
    if (clienteId) {
      const clienteRef = doc(db, 'aziende', aziendaId, 'Clienti', clienteId);
      const clienteSnap = await getDoc(clienteRef);
      if (clienteSnap.exists()) {
        setClienteData(clienteSnap.data());
      }
    }
    setIsLoading(false);
  }, [clienteId, aziendaId]);

  useFocusEffect(
    useCallback(() => {
      fetchClienteData();
    }, [fetchClienteData])
  );


  if (isLoading) {
    return <ActivityIndicator size="large" color="#0000ff" style={{ flex: 1, justifyContent: 'center' }} />;
  }

  if (!clienteData) {
    return (
      <SafeAreaView style={styles.container}>
        <Text>Cliente non trovato</Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>{clienteData.ragioneSociale}</Text>
      <Text>Partita IVA: {clienteData.partitaIva}</Text>
      <Text>Email: {clienteData.email}</Text>
      <Text>PEC: {clienteData.pec}</Text>
      <Text>Sede Legale:</Text>
      <Text>Indirizzo: {clienteData.sedeLegale.indirizzo}</Text>
      <Text>Città: {clienteData.sedeLegale.citta}</Text>
      <Text>Provincia: {clienteData.sedeLegale.provincia}</Text>
      <Text>CAP: {clienteData.sedeLegale.cap}</Text>
      <Text>Nazione: {clienteData.sedeLegale.nazione}</Text>
      <Text>Telefono: {clienteData.sedeLegale.telefono}</Text>
     
      {clienteData.sediAmministrative && clienteData.sediAmministrative.length > 0 && (
        <>
          <Text style={styles.subtitle}>Sedi Amministrative:</Text>
          {clienteData.sediAmministrative.map((sede, index) => (
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
      {clienteData.logistiche && clienteData.logistiche.length > 0 && (
        <>
          <Text style={styles.subtitle}>Sedi Logistiche:</Text>
          {clienteData.logistiche.map((sede, index) => (
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
      {clienteData.riferimenti && clienteData.riferimenti.length > 0 && (
        <>
          <Text style={styles.subtitle}>Riferimenti:</Text>
          {clienteData.riferimenti.map((riferimento, index) => (
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
   
      <TouchableOpacity style={styles.button} onPress={() => router.push(`anagraficaCliente?clienteId=${clienteId}`)}>
        <Text style={styles.buttonText}>Modifica Cliente</Text>
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