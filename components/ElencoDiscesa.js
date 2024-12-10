import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, FlatList, TouchableOpacity, Keyboard, TouchableWithoutFeedback } from 'react-native';

const ElencoDiscesa = ({ data, title, onSelect }) => {
  const [query, setQuery] = useState('');
  const [filteredData, setFilteredData] = useState([]);
console.log('SONO ELENCO DISCESA')


  useEffect(() => {
    setFilteredData(data);
  }, [data]);

  const handleSelectItem = (item) => {
    console.log('HANDLE SELECTED', item);
    onSelect(item); // Chiama la funzione di callback passando l'elemento selezionato
    Keyboard.dismiss(); // Nasconde la tastiera
  };

  const filterData = (text) => {
    setQuery(text);
    if (text) {
      const filtered = data.filter((item) =>
        item.nome.toLowerCase().startsWith(text.toLowerCase())
      );
      setFilteredData(filtered);
    } else {
      setFilteredData(data);
    }
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.container}>
        <FlatList
          data={filteredData}
          keyExtractor={(item) => item.nome}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={styles.item}
              onPress={() => handleSelectItem(item)}
            >
              <Text style={{ color: 'black', fontSize: 15 }}>{item.nome.toUpperCase()}</Text>
            </TouchableOpacity>
          )}
          style={styles.autocompleteContainer}
        />
      </View>
    </TouchableWithoutFeedback>
  );
};

export default ElencoDiscesa;

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
});