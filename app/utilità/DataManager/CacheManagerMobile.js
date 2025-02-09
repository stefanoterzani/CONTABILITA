import AsyncStorage from '@react-native-async-storage/async-storage';
import { Alert } from 'react-native';




const CacheManagerMobile = {

  // Funzione per caricare i dati dalla cache
  loadData: async (key) => {
    try {
      const jsonValue = await AsyncStorage.getItem(key);
      return jsonValue != null ? JSON.parse(jsonValue) : null;
    } catch (e) {
      Alert.alert('Errore', 'Impossibile caricare i dati dalla cache');
      return null;
    }
  },

  // Funzione per salvare i dati nella cache
  saveData: async (key, data) => {
   // console.log('Salvataggio dati in cache su mobile ',key,data);
    try {
      const jsonValue = JSON.stringify(data);
      await AsyncStorage.setItem(key, jsonValue);
    } catch (e) {
      Alert.alert('Errore', 'Impossibile salvare i dati nella cache');
    }
  },

  // Funzione per rimuovere i dati dalla cache
  removeData: async (key) => {
    try {
      await AsyncStorage.removeItem(key);
    } catch (e) {
      Alert.alert('Errore', 'Impossibile rimuovere i dati dalla cache');
    }
  },
  resetCache: async () => {
    try {
      await AsyncStorage.clear();
      console.log('Cache resettata su mobile');
    } catch (e) {
      console.error('Errore', 'Impossibile resettare la cache');
    }
  },




};

export default CacheManagerMobile;