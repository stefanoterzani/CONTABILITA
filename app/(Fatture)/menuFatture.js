
import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, TextInput, View, FlatList, TouchableOpacity, Keyboard, Platform } from 'react-native';
import { useRouter } from 'expo-router';
import comuni from '../../assets/dati/comuni.json';
import provincie from '../../assets/dati/provincie.json';
/*
let KeyboardAwareFlatList;
if (Platform.OS !== 'web') {
  KeyboardAwareFlatList = require('react-native-keyboard-aware-scroll-view').KeyboardAwareFlatList;
}
*/
const MenuFatture = () => {
  const router = useRouter();
  const [query, setQuery] = useState('');
  const [oggettoFiltrato, setOggettoFiltrato] = useState([]);
  const [oggettoSelezionato, setOggettoSelezionato] = useState('');
 // const oggettoSelezione=comuni;

 
  const oggettoSelezione=provincie;
  const [campoSelezione,setCampoSelezione]=useState('nome');
  const [valorePlaceholder,setValorePlaceholder]=useState('Inserisci il nome della provincia');

  useEffect(() => {
    if (oggettoSelezionato) {
      setQuery(oggettoSelezionato[campoSelezione]);
    }
  }, [oggettoSelezionato]);

  const handleSelectComune = (oggetto) => {
    console.log('HANDLE SELECTED', oggetto);
    setOggettoSelezionato(oggetto);
    setQuery(oggetto[campoSelezione]);
    setOggettoFiltrato([]); // Nasconde l'elenco quando un comune viene selezionato
  };

  const filterComuni = (text) => {
    setQuery(text);
    if (text) {
      const filtered = oggettoSelezione.filter((oggetto) =>
        oggetto[campoSelezione].toLowerCase().startsWith(text.toLowerCase())
      );
      setOggettoFiltrato(filtered);
    } else {
      setOggettoFiltrato([]);
      setOggettoSelezionato('');
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder={valorePlaceholder}
        value={query}
        onChangeText={(text) => filterComuni(text)}
      />
      {/* Visualizza i risultati solo se ci sono risultati da mostrare */}
      {oggettoFiltrato.length > 0 && (
       
          <FlatList
            data={oggettoFiltrato}
            keyExtractor={(item) => item[campoSelezione]}
            renderItem={({ item }) => (
              <TouchableOpacity
                style={styles.item}
                onPress={() => handleSelectComune(item)}
              >
                <Text style={{ color: 'black', fontSize: 15 }}>{item[campoSelezione].toUpperCase()}</Text>
              </TouchableOpacity>
            )}
            style={styles.autocompleteContainer}
          />
        )
      }
    </View>
  );
};

export default MenuFatture;

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