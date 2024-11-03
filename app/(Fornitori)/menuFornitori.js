import { SafeAreaView, StyleSheet, Text, TouchableOpacity, View, FlatList, ActivityIndicator } from 'react-native';
import React, { useState, useEffect, useContext,useCallback } from 'react';
import { useRouter ,useFocusEffect} from 'expo-router';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../../firebaseConfig';
import { AuthContext } from '../../Context/AuthContext';

const MenuFornitori = () => {
  const { datiAzienda } = useContext(AuthContext);
  const aziendaId = datiAzienda.id;
  const [fornitori, setFornitori] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  const fetchFornitori = useCallback(async () => {
    const fornitoriRef = collection(db, 'aziende', aziendaId, 'Fornitori');
    const fornitoriSnap = await getDocs(fornitoriRef);
    const fornitoriList = fornitoriSnap.docs.map(doc => ({ id: doc.id, ...doc.data() }));
   
   // Ordina l'array fornitoriList in ordine alfabetico per ragioneSociale
   fornitoriList.sort((a, b) => a.ragioneSociale.localeCompare(b.ragioneSociale));
    setFornitori(fornitoriList);
    setIsLoading(false);
  }, [aziendaId]);

  useFocusEffect(
    useCallback(() => {
      fetchFornitori();
    }, [fetchFornitori])
  );

  const renderItem = ({ item }) => (
    <TouchableOpacity onPress={() => router.push(`dettagliFornitore?fornitoreId=${item.id}`)}>
      <View style={styles.item}>
        <Text style={styles.title}>{item.ragioneSociale}</Text>
        <Text>{item.partitaIva}</Text>
        <Text>{item.email}</Text>
        <Text>Data Creazione: {item.dataCreazione ? item.dataCreazione.toDate().toLocaleString() : 'N/A'}</Text>
        <Text>Data Aggiornamento: {item.dataAggiornamento ? item.dataAggiornamento.toDate().toLocaleString() : 'N/A'}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.menu}>
        <TouchableOpacity style={styles.button} onPress={() => router.push('anagraficaFornitore')}>
          <Text style={styles.buttonText}>Crea nuovo Fornitore</Text>
        </TouchableOpacity>
      </View>
      {isLoading ? (
        <ActivityIndicator size="large" color="#0000ff" style={{ flex: 1, justifyContent: 'center' }} />
      ) : (
        <FlatList
          data={fornitori}
          renderItem={renderItem}
          keyExtractor={item => item.id}
          contentContainerStyle={styles.list}
        />
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    alignItems: 'center',
  },
  menu: {
    marginTop: 20,
    width: '90%',
    borderColor: 'red',
    borderWidth: 2,
    backgroundColor: 'lightOrange',
    alignItems: 'center',
    paddingVertical: 30,
  },
  button: {
    alignItems: 'center',
    paddingVertical:0,
  },
  buttonText: {
    fontSize: 20,
  },
  list: {
    paddingBottom: 16,
    width: '100%',
  },
  item: {
    backgroundColor: '#f9c2ff',
    padding: 20,
    marginVertical: 8,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
  },
});

export default MenuFornitori;