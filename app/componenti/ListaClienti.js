import React , {useState,useEffect,useCallback} from 'react';
import { View, Text, FlatList, StyleSheet ,TouchableOpacity} from 'react-native';
import {leggeDatiCache} from '../utilità/FunzioniCache'; 
import { useFocusEffect } from '@react-navigation/native'; 
import DataManager from '../utilità/DataManager/DataManager';
import { useSelector } from 'react-redux';

const ClientiList = ({ onSelectCliente }) => {
  //console.log('SONO LISTA CLIENTI',clientiData)
  const [clientiData, setClientiData] = useState([]);
  const aggiornaCache = useSelector((state) => state.colonnaDestra.aggiornaCache);

  const caricaDatiClienti = async () => {
    const datiCache = await DataManager.loadData('clientiData');
    if (datiCache) {
      setClientiData(datiCache);
    }
  };

  useFocusEffect(
    useCallback(() => {
      caricaDatiClienti();
    }, [aggiornaCache])
  );
    
   
 


  
  return (
    <View style={{flex:1,height:200}}>
    <FlatList
      data={clientiData}
      keyExtractor={(item, index) => index.toString()}
      renderItem={({ item }) => (
        <TouchableOpacity
        onPress={() => onSelectCliente(item)}
          style={styles.itemContainer}>
          <Text>{item[0].nome} {item[0].partitaIva}</Text>
          
        </TouchableOpacity>
      )}
      style={styles.list}
    />
    </View>
  );
};

const styles = StyleSheet.create({
  itemContainer: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  list: {
   // flex: 1, // Assicurarsi che la FlatList occupi lo spazio disponibile
  },
});

export default ClientiList;

/*
<Text>{item[0].partitaIva}</Text>
*/