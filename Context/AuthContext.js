import React, { createContext, useContext, useState, useEffect } from 'react';
import { auth, db } from '../firebaseConfig'; 
import {  query, where, doc, getDoc, getDocs, setDoc, deleteDoc, collection, addDoc  } from 'firebase/firestore';
import { onAuthStateChanged, signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut } from 'firebase/auth';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState('');
  const [dataUser,setDataUser]=useState('')
  const [loading, setLoading] = useState(true);
 // const [azienda, setAzienda] = useState({});
  const [isLoggingOut, setIsLoggingOut] = useState(false);

const [datiAzienda, setDatiAzienda]=useState({
  id:'',
  nome:'',
  partitaIva:'',
  indirizzo:'', 
  citta:'',
  cap:'',
  provincia:'',
 
 })

  useEffect(() => {
      setLoading(true)
//logoutUser();
     
      const unsubscribe = onAuthStateChanged(auth, async (user) => {     
      setCurrentUser(user);
   
      if (user) {   
          console.log('USER UID=',user.uid)
          //l app parte con user non null
          // trova con user.uid i dati del DataUser su membership       
          const membershipDocRef = doc(db, 'membership', user.uid);
          const membershipDoc = await getDoc(membershipDocRef);
         
          // se DataUser esiste
          if (membershipDoc.exists()) {
              const newDataUser=membershipDoc.data()
              setDataUser(newDataUser)  
              console.log('USER UID=',user.uid, 'DATA USER=',newDataUser)
              // trova i dati azienda con dataUser idAzienda           
              const aziendaDocRef = doc(db, 'aziende', newDataUser.idAzienda) 
              const aziendaDoc = await getDoc(aziendaDocRef);
              if (aziendaDoc.exists()) {
                 // setAzienda(aziendaDoc.data());
                  console.log('LUNGHEZZA=',Object.keys(aziendaDoc.data()).length)
                  if (Object.keys(aziendaDoc.data()).length > 0) {
                    AzDati=aziendaDoc.data()
                    console.log('SET AZIENDA =',AzDati)
                    setDatiAzienda({
                      id: AzDati?.idAzienda, 
                      nome: AzDati?.nome || '',
                      partitaIva: AzDati?.partitaIva || '',
                      indirizzo:AzDati?.anagrafica.sedeLegale.indirizzo || '',
                      citta: AzDati?.anagrafica.sedeLegale.citta || '',
                      cap:AzDati?.anagrafica.sedeLegale.cap || '',
                      provincia:AzDati?.anagrafica.sedeLegale.provincia || '',
                    })
                  } else {
                    setDatiAzienda({
                      id: '',  nome: '',partitaIva:'',indirizzo:'',citta:'',cap:'',provincia:''
                    })
                    
                }
                 
              } else {
                //se azienda non esiste currentUser=null
                console.log('ESCO 1')
                setCurrentUser(null)
              }
          } else {
            // DataUser in membership non esiste currentUser=null
            console.log('ESCO 2')
              setCurrentUser(null);
          }
      } else {
        // se app parte con user nullo imposta nullo currentUser
        console.log('ESCO 3')
       // setCurrentUser(null);
      }
    //  console.log('DATA USER=',dataUser, 'USER=',currentUser) 
      setLoading(false);
      console.log('ESCO 4')
    //  console.log('AZIENDA=', datiAzienda)
    });
   
    return () => unsubscribe();
  }, []);



// --------------------------ROUTINE LOGIN ---------------------------------//
  const loginUser = async (email, password, nome = null , telefono = null) => {
    setLoading(true);
    try {
      //---------------Controlla se esiste utente in membreship Provvisorio-------------------//
      //------------------------PRIMO ACCESSO ------------------------------------------------//
      const provisionalUsersCollectionRef = collection(db, 'membershipProvvisorio');
      const q = query(provisionalUsersCollectionRef, where('email', '==', email));
      const querySnapshot = await getDocs(q);  
      console.log('LOGIN=', email, password, nome, telefono)
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
              await signInWithEmailAndPassword(auth, email, password);
             
        }
    
    } catch (error) {
      console.error('Errore durante il login:', error);
    } finally {
      setLoading(false);
    }
  };

  const logoutUser = async () => {
    console.log('---------------------LOG OUT-------------------')
    setIsLoggingOut(true);
   
    try {
      await signOut(auth);
      setCurrentUser('');
    //  setDataUser('')
     // setAzienda({})
    
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


  /*
                  console.log(aziendaDoc.data())
                  console.log(aziendaDoc.data().idAzienda)
                  console.log(aziendaDoc.data().nome)
                  console.log(aziendaDoc.data().partitaIva)
                  console.log(aziendaDoc.data().Anagrafica.SedeLegale)
                  */



// console.log('CURRENT USER=',currentUser)
// console.log('DATA USER=',dataUser)
//console.log('AZIENDA=',azienda)

  return (
   
    <AuthContext.Provider value={{currentUser, dataUser, datiAzienda,loading, logoutUser, loginUser,creaUtenteTemporaneo}}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom Hook per utilizzare il contesto
export const useAuth = () => {
  return useContext(AuthContext);
};
