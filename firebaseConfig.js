import { initializeApp } from 'firebase/app';
import { initializeAuth, getReactNativePersistence } from 'firebase/auth';
import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';
import { getStorage } from 'firebase/storage';
import { getFirestore } from 'firebase/firestore';

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

// Configura Firebase Auth con AsyncStorage
const auth = initializeAuth(app, { persistence: getReactNativePersistence(ReactNativeAsyncStorage)});


  const storage = getStorage(app);
  const db = getFirestore(app)


  export  {auth,storage,db };

/*

import { initializeApp } from 'firebase/app';
import { getAuth} from 'firebase/auth';
import { getStorage } from 'firebase/storage';
import { getFirestore } from 'firebase/firestore';

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
 
  const auth = getAuth(app);
  const storage = getStorage(app);
  const db = getFirestore(app)


  export  {auth,storage,db };

  */