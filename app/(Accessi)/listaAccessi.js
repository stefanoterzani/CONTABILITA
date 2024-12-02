import React, { useContext, useEffect, useState, useRef } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity } from 'react-native';
import { Octicons, MaterialIcons } from '@expo/vector-icons'; // Importa l'icona

import { AuthContext } from '../../context/AuthContext';
import { getAccessiConNomi } from '../../servizi/FunzioniAccessi'; // Importa la funzione getAccessiConNomi
//import LoadingSpinner from '../../components/LoadingSpinner'; // Importa il componente LoadingSpinner personalizzato


const listaAccessi = () => {
  const { dataUser } = useContext(AuthContext);
  const [accessi, setAccessi] = useState([]);
  const [loading, setLoading] = useState(true); // Stato di caricamento
  const [lastDoc, setLastDoc] = useState(null); // Ultimo documento caricato
  const flatListRef = useRef(null); // Riferimento alla FlatList
  const [hasMore, setHasMore] = useState(true); // Stato per tenere traccia se ci sono più accessi da caricare
  
  useEffect(() => {
    const fetchAccessi = async () => {
      if (dataUser.idAzienda) {
        const { accessi, lastDoc } = await getAccessiConNomi(dataUser.idAzienda, 10);
        setAccessi(accessi);
        setLastDoc(lastDoc);
        setLoading(false); // Imposta lo stato di caricamento a false
      }
    };

    fetchAccessi();
  }, [dataUser]);

  const loadMoreAccessi = async () => {
    if (dataUser.idAzienda && lastDoc) {
      const { accessi: newAccessi, lastDoc: newLastDoc } = await getAccessiConNomi(dataUser.idAzienda, 10, lastDoc);
      if (newAccessi.length === 0) {
        setHasMore(false); // Non ci sono più accessi da caricare
      } else {
        setAccessi((prevAccessi) => {
          const updatedAccessi = [...prevAccessi, ...newAccessi];
          setTimeout(() => {
            flatListRef.current.scrollToEnd({ animated: true });
          }, 100); // Aggiungi un piccolo ritardo per assicurarti che la FlatList sia aggiornata
          return updatedAccessi;
        });
        setLastDoc(newLastDoc);
      }
    }
  };

  const renderItem = ({ item }) => (
    <View style={styles.item}>
      <Text style={styles.title}>{item.nome}</Text>
      <View style={{ flexDirection: 'row' }}>
        <Text style={{ paddingRight: 10 }}>{item.appName}</Text>
        <Text>{new Date(item.timestamp.seconds * 1000).toLocaleString()}</Text>
      </View>
    </View>
  );

  if (loading) {
   // return <LoadingSpinner />;
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={accessi}
        renderItem={renderItem}
        keyExtractor={(item, index) => index.toString()}
        ref={flatListRef} // Assegna il riferimento alla FlatList
      />
      <TouchableOpacity style={styles.loadMoreButton} onPress={loadMoreAccessi} disabled={!hasMore}>
        {hasMore ? (
          <>
            <Octicons name="desktop-download" size={35} color="blue" />
            <Text style={styles.altri}>Carica altri</Text>
          </>
        ) : (
          <>
            <MaterialIcons name="done" size={35} color="green" />
            <Text style={styles.altri}>Tutti i dati caricati</Text>
          </>
        )}
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  item: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  animato: {
    width: 200,
    height: 200,
  },
  loadMoreButton: {
    padding: 10,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  altri: {
    marginLeft: 10,
    fontSize: 20,
    fontFamily: 'Poppins-SemiBold',
    fontWeight: 'bold',
    color: 'blue',
  },
});

export default listaAccessi;