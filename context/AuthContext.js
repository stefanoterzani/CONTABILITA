import React, { createContext, useContext, useState, useEffect } from 'react';
import { auth, db } from '../firebaseConfig'; 
import {  query, where, doc, getDoc, getDocs, setDoc, deleteDoc, collection, addDoc  } from 'firebase/firestore';
//import { onAuthStateChanged, signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut } from 'firebase/auth';
import { Platform } from 'react-native';
import { useRouter } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getReactNativePersistence } from 'firebase/auth';
import { onAuthStateChanged, signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut, browserLocalPersistence } from 'firebase/auth';
import { registraAccessoUtente} from '../servizi/FunzioniAzienda';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState('');
  const [dataUser,setDataUser]=useState('')
  const [loading, setLoading] = useState(true);
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const [aziendaId,setAziendaId]=useState(null)
  const router = useRouter();
  /*
  const [datiAzienda, setDatiAzienda]=useState({
  id:'',
  nome:'',
  partitaIva:'',
  indirizzo:'', 
  citta:'',
  cap:'',
  provincia:'',
 
 })
*/
useEffect(() => {
  //signOut(auth);
  const configurePersistence = async () => {
    if (Platform.OS === 'web') {
     await auth.setPersistence(browserLocalPersistence);
    } else {
     await auth.setPersistence(getReactNativePersistence(AsyncStorage));
    }
  };

  const fetchUserData = async (user) => {
    const membershipDocRef = doc(db, 'membership', user.uid);
    const membershipDoc = await getDoc(membershipDocRef);
    if (membershipDoc.exists()){
    //  console.log('FETCH DATA MEMBERSHIP ESISTE')
      const newDataUser = membershipDoc.data();
      setDataUser(newDataUser);
    //  console.log('FETCH DATA DataUser=',newDataUser)
      if (newDataUser && newDataUser.idAzienda) {
        const aziendaDoc = await getDoc(doc(db, 'aziende', newDataUser.idAzienda));
        if (aziendaDoc.exists()) {
    //      console.log('FETCH DATA AZIENDA ESISTE =',newDataUser.idAzienda)
          const aziendaData=aziendaDoc.data();
    //      console.log('FETCH DATA AZIENDA ESISTE LETTI DATI  =',aziendaData)
          setAziendaId(aziendaData.idAzienda)
          setLoading(false);

        } else {
          console.log('AZIENDA NON ESISTE')
          setAziendaId(null)
          setLoading(false);
          /*
          setDatiAzienda({
            id: '',  nome: '',partitaIva:'',indirizzo:'',citta:'',cap:'',provincia:''
          });
          */
        }
      
      } else {
        console.log('ESCO 1');
          setCurrentUser(null);
          setLoading(false);
      }


    } else {
      console.log('ESCO 2');
      setCurrentUser(null);
      setLoading(false);
    }
  }; 

  const unsubscribe = onAuthStateChanged(auth, async (user) => {
   
      if (user) {
        console.log('SONO in onAuthStateChanged user ESISTE:');
        setCurrentUser(user);
        setLoading(true);
        await fetchUserData(user);
       
    } else {
      console.log('NON ESISTE NESSUNA SESSIONE APERTA');
      setCurrentUser(null);
      setLoading(false);
    }
    setLoading(false);
  });

  configurePersistence();
  return () => unsubscribe();
},[])




// --------------------------ROUTINE LOGIN ---------------------------------//
  const loginUser = async (email, password, nome = null , telefono = null) => {
    setLoading(true);
    try {
      //---------------Controlla se esiste utente in membreship Provvisorio-------------------//
      //------------------------PRIMO ACCESSO ------------------------------------------------//
      const provisionalUsersCollectionRef = collection(db, 'membershipProvvisorio');
      const q = query(provisionalUsersCollectionRef, where('email', '==', email));
      const querySnapshot = await getDocs(q);  
   //   console.log('CONTEXT LOGIN=', email, password, nome, telefono)
      if (!querySnapshot.empty) {
      // ----------- trovata EMAIL utente in membership Provvisorio  -------------------------//
              const membershipDoc = querySnapshot.docs[0];
              const IdProvvisorio= membershipDoc.id 
              if (membershipDoc.data().telefono === telefono) {
                    // prende i dati dal provvisorio
                    const { idAzienda,  qualifica } = membershipDoc.data();
                    // crea un nuovo utente con email e password 
                    const credenziali = await createUserWithEmailAndPassword(auth, email, password);
                    const newUser = credenziali.user;
                    setCurrentUser(newUser)
                   // ------ memorizza dati del nuovo utente in membership -------------------------------------//
                   // idAzienda e qualifica sono i dati di Provvisorio-----------------//
                   // email e nome sono i dati del login ------------------------------//
                    await setDoc(doc(db, 'membership', newUser.uid), {
                      idUser: newUser.uid,
                      idAzienda,
                      email,
                      nome,
                      qualifica
                    });
                    // --------elimina utente dal provvisorio -------------------------------//
                    const docRef = doc(db, 'membershipProvvisorio', IdProvvisorio)
                    await deleteDoc(docRef);
              } else {
                //--- se trovato utente ma telefono diverso quindi utente NON VALIDO ????--------------------//
                throw new Error('Numero di telefono non corretto');
              }
      } else {
              // --- la query è vuota quindi è signin normale ------------------------
              console.log('LOGIN NORMALE')
              await signInWithEmailAndPassword(auth, email, password);
             
      }
    
    } catch  {
      
     // console.error('NON ESISTE NESSUN MEMBRO CON QUESTE CREDENZIALI:');
    
     setLoading(false);
     setCurrentUser(null)
     setLoading(false);
      }
     
    finally {
      setLoading(false);
    }
  };

  const logoutUser = async () => {
    console.log('---------------------LOG OUT-------------------')
    setIsLoggingOut(true);
   
    try {
      await signOut(auth);
      registraAccessoUtente(dataUser.idAzienda, dataUser.idUser, 'Logout');
      setCurrentUser(null);
      setDataUser(null)
     
    } catch (error) {
      console.error('Errore durante il logout:', error);
    } finally {
    //  console.log('LOGOUT LOADING=',loading,"---USER=", currentUser,'--DataUSER= ',dataUser, '--- AZIENDA=',azienda)
    setIsLoggingOut(false);
    }
  };






const creaUtenteTemporaneo = async (email,telefono, idAzienda, qualifica) => {
  setLoading(true);
  try {
      const oggi=new Date()
      const dataFutura= new Date(oggi)
      dataFutura.setDate(oggi.getDate()+30)
      const provisionalUsersCollectionRef = collection(db, 'membershipProvvisorio');
      await addDoc(provisionalUsersCollectionRef, {   
      email,
      telefono,
      idAzienda,
      qualifica,
      creato: oggi,
      expired:dataFutura
    });
    console.log("Utente provvisorio creato:");
  } catch (error) {
    console.error('Errore durante la creazione dell\'utente provvisorio:', error);
  } finally {
    setLoading(false);
  }
};

  return (
   
    <AuthContext.Provider value={{currentUser, dataUser, loading, aziendaId,logoutUser, loginUser,creaUtenteTemporaneo}}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom Hook per utilizzare il contesto
export const useAuth = () => {
  return useContext(AuthContext);
};
