import { initializeApp } from 'firebase/app';
//import { initializeAuth, getReactNativePersistence } from 'firebase/auth';
import { getAuth, browserLocalPersistence, initializeAuth } from 'firebase/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getStorage } from 'firebase/storage';
import { getFirestore } from 'firebase/firestore';
import { Platform } from 'react-native';
import { getReactNativePersistence } from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyAb-kTV5NjuHtRJeMOrEX59_BgTbJbVLCI",
  authDomain: "contabilita-1b83c.firebaseapp.com",
  projectId: "contabilita-1b83c",
  storageBucket: "contabilita-1b83c.appspot.com",
  messagingSenderId: "1044759993662",
  appId: "1:1044759993662:web:709ebfefe69a8edf0ca06f",
  measurementId: "G-5L2SPC2HY0"
};

const app = initializeApp(firebaseConfig);

let auth;
if (Platform.OS === 'web') {
  auth = getAuth(app);
  auth.setPersistence(browserLocalPersistence);
} else {
  auth = initializeAuth(app, { persistence: getReactNativePersistence(AsyncStorage) });
}


// Configura Firebase Auth con AsyncStorage
//const auth = initializeAuth(app, { persistence: getReactNativePersistence(ReactNativeAsyncStorage)});


  const storage = getStorage(app);
  const db = getFirestore(app)


  export  {auth,storage,db };

