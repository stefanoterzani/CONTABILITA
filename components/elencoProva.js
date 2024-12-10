import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, TextInput, View, FlatList, TouchableOpacity, Keyboard, Platform } from 'react-native';
import { useRouter } from 'expo-router';
import comuni from '../assets/dati/comuni.json';
/*
let KeyboardAwareFlatList;
if (Platform.OS !== 'web') {
  KeyboardAwareFlatList = require('react-native-keyboard-aware-scroll-view').KeyboardAwareFlatList;
}
*/
const elencoProva = () => {
  const router = useRouter();
  const [query, setQuery] = useState('');
  const [filteredComuni, setFilteredComuni] = useState([]);
  const [selectedComune, setSelectedComune] = useState('');

  useEffect(() => {
    if (selectedComune) {
      setQuery(selectedComune.nome);
    }
  }, [selectedComune]);

  const handleSelectComune = (comune) => {
    console.log('HANDLE SELECTED', comune);
    setSelectedComune(comune);
    setQuery(comune.nome);
    setFilteredComuni([]); // Nasconde l'elenco quando un comune viene selezionato
  };

  const filterComuni = (text) => {
    setQuery(text);
    if (text) {
      const filtered = comuni.filter((comune) =>
        comune.nome.toLowerCase().startsWith(text.toLowerCase())
      );
      setFilteredComuni(filtered);
    } else {
      setFilteredComuni([]);
      setSelectedComune('');
    }
  };

  return (
    <View style={styles.container}>
       {/* Visualizza i risultati solo se ci sono risultati da mostrare */}
      {filteredComuni.length > 0 && (
       
          <FlatList
            data={filteredComuni}
            keyExtractor={(item) => item.nome}
            renderItem={({ item }) => (
              <TouchableOpacity
                style={styles.item}
                onPress={() => handleSelectComune(item)}
              >
                <Text style={{ color: 'black', fontSize: 15 }}>{item.nome.toUpperCase()}</Text>
              </TouchableOpacity>
            )}
            style={styles.autocompleteContainer}
          />
        )
      }
    </View>
  );
};

export default elencoProva;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    height: '100%',
  },
  autocompleteContainer: {
    marginTop: 5, // Regola la distanza dall'input
    maxHeight: 200, // Limita l'altezza massima dei risultati
    width: '90%', // Larghezza contenitore flat
  },
  item: {
    borderBottomWidth: 1,
    borderBottomColor: 'black',
    height: 40,
    justifyContent: 'center', // Giustificazione verticale item
  },
  input: {
    borderColor: 'gray',
    borderWidth: 1,
    width: '90%',
    fontSize: 16,
    fontFamily: 'Roboto-Medium',
  },
});