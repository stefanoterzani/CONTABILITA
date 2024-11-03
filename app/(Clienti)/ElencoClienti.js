import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

const ElencoClienti = () => {
  return (
    <View>
      <Text>ElencoClienti</Text>
    </View>
  )
}

export default ElencoClienti

const styles = StyleSheet.create({})

/*

import React, { useState, useEffect, useContext } from 'react';
import { View, Text, FlatList, StyleSheet, ActivityIndicator, TouchableOpacity, SafeAreaView } from 'react-native';
import { collection, getDocs } from 'firebase/firestore';
import { useRouter } from 'expo-router';
import { db } from '../../firebaseConfig';
import { AuthContext } from '../../Context/AuthContext';

const Elenco = () => {
  const { datiAzienda } = useContext(AuthContext);
  const aziendaId = datiAzienda.id;
  const [clienti, setClienti] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const fetchClienti = async () => {
      const clientiRef = collection(db, 'aziende', aziendaId, 'Clienti');
      const clientiSnap = await getDocs(clientiRef);
      const clientiList = clientiSnap.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setClienti(clientiList);
      setIsLoading(false);
    };

    fetchClienti();
  }, [aziendaId]);

  const renderItem = ({ item }) => (
    <TouchableOpacity  onPress={() => router.push(`/(ProveClienti)/dettagliCliente?clienteId=${item.id}`)}>
      <View style={styles.item}>
        <Text style={styles.title}>{item.ragioneSociale}</Text>
        <Text>{item.id}</Text>
        <Text>{item.partitaIva}</Text>
        <Text>{item.email}</Text>
      </View>
    </TouchableOpacity>
  );

  if (isLoading) {
    return <ActivityIndicator size="large" color="#0000ff" style={{ flex: 1, justifyContent: 'center' }} />;
  }

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={clienti}
        renderItem={renderItem}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.list}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  list: {
    paddingBottom: 16,
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

export default Elenco;

*/