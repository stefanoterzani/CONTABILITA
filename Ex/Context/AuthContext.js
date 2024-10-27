import React, { createContext, useContext, useEffect, useState } from 'react';
import { auth ,db} from '../firebaseConfig'; // Assicurati di avere il percorso corretto
import {  onAuthStateChanged, signOut } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';
const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true); // Stato di caricamento
  const [loadingOut, setLoadingOut] = useState(true); // Stato di caricamento
  const [datiPubblici, setDatiPubblici] = useState(null);
  const [datiPrivati, setDatiPrivati] = useState(null);

  const [azienda, setAzienda]=useState(null)
  const [ruolo,setRuolo]=useState(null)

  useEffect(() => {
    const unsubscribe = onAuthStateChanged (auth, async(user) => {
      
        // Gestisci l'iscrizione in modo asincrono
      setCurrentUser(user);
      if (user) {
        try {
           //  Recupero Dati Azienda
          const aziendaDocRef = doc(db, 'aziende', user.uid);        
          const aziendaDoc = await getDoc(aziendaDocRef);
        
          if (aziendaDoc.exists) {
         //   console.log('PROVIDER',aziendaDoc)
              setDatiPrivati(aziendaDoc.data().datiPrivati) || {}
              setDatiPubblici(aziendaDoc.data().datiPubblici) || {}
          } else {
              console.log('Nessun documento trovato!');
          }   
          
        

        // Recupera il ruolo dell'utente autenticato
          const ruoloDocRef = doc(db, 'aziende', user.uid, 'ruoli', user.uid);
          const ruoloDoc = await getDoc(ruoloDocRef);
          if (ruoloDoc.exists()) {
            setRuolo(ruoloDoc.data().ruolo);
          } else {
           console.log('Nessun documento di ruolo trovato!');
          }
  
        } catch (error) {
            console.error('Errore nel recupero dei dati', error)
        }
      }

        // Imposta loading a false dopo l'autenticazione    
      setLoading(false); 
    
    })
    return () => unsubscribe();
  }, []);

useEffect(()=>{
  if (datiPrivati){
    console.log('DATI PRIVATI',datiPrivati)
  }
  

//  setAzienda(datiPubblici.nome)

},[datiPrivati])

useEffect(()=>{
if (datiPubblici){
  console.log('DATI PUBBLICI',datiPubblici)
  setAzienda(datiPubblici.nome)
}
 
//  setAzienda(datiPubblici.nome)

},[datiPubblici])


 


  return (
    <AuthContext.Provider value={{ currentUser, azienda, ruolo, loading,loadingOut, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
/*

import React, { createContext, useContext, useState, useEffect } from 'react';
import { auth, db } from '../firebaseConfig'; // Assicurati che il percorso sia corretto
import { doc, getDoc } from 'firebase/firestore';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [nomeAzienda, setnomeAzienda] = useState(null);
  const [ruolo,setRuolo]=useState(null)
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (currentUser) => {
      setUser(currentUser);

      if (currentUser) {
        const userDoc = await getDoc(doc(db, 'aziende', currentUser.uid));
        if (userDoc.exists()) {
            setnomeAzienda(userDoc.data().nomeAzienda);
            setRuolo(userDoc.data().ruolo)
        } else {
          console.error("No such document!");
        }
      }

      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const logout = async () => {
    await auth.signOut();
    setUser(null);
    setnomeAzienda(null);
    setRuolo(null)
  };

  return (
    <AuthContext.Provider value={{ user, nomeAzienda, ruolo, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom Hook per utilizzare il contesto
export const useAuth = () => {
  return useContext(AuthContext);
};
*/
