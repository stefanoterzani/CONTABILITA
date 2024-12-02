// utils/cacheManager.js
import { Platform } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const isWeb = Platform.OS === 'web';

const cacheManager = {
  setItem: async (key, value) => {
    const stringValue = JSON.stringify(value);
    if (isWeb) {
      localStorage.setItem(key, stringValue);
    } else {
      await AsyncStorage.setItem(key, stringValue);
    }
  },

  getItem: async (key) => {
    if (isWeb) {
      const item = localStorage.getItem(key);
      return item ? JSON.parse(item) : null;
    } else {
      const item = await AsyncStorage.getItem(key);
      return item ? JSON.parse(item) : null;
    }
  },

  removeItem: async (key) => {
    if (isWeb) {
      localStorage.removeItem(key);
    } else {
      await AsyncStorage.removeItem(key);
    }
  },
};

export default cacheManager;