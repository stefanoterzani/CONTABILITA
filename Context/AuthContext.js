
import React, { createContext, useContext, useState, useEffect } from 'react';
import { auth, db } from '../firebaseConfig'; // Assicurati che il percorso sia corretto
import { doc, getDoc } from 'firebase/firestore';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [companyName, setCompanyName] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (currentUser) => {
      setUser(currentUser);

      if (currentUser) {
        const userDoc = await getDoc(doc(db, 'aziende', currentUser.uid));
        if (userDoc.exists()) {
          setCompanyName(userDoc.data().nomeAzienda);
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
    setCompanyName(null);
  };

  return (
    <AuthContext.Provider value={{ user, companyName, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );r
};

// Custom Hook per utilizzare il contesto
export const useAuth = () => {
  return useContext(AuthContext);
};

/*

import React, { createContext, useContext, useEffect, useState } from 'react';
import { auth, db } from '../firebaseConfig'; // Assicurati di importare i tuoi moduli Firebase
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [azienda, setAzienda] = useState(null);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
            setUser(currentUser);
            if (currentUser) {
                // Ottieni l'ID dell'azienda dall'utente loggato
                const userRef = doc(db, 'aziende', currentUser.uid); // Assumendo che l'ID dell'azienda sia lo stesso dell'ID utente
                const userDoc = await getDoc(userRef);
                if (userDoc.exists()) {
                    setAzienda({ id: userDoc.id, ...userDoc.data() });
                } else {
                    console.error('No such document!');
                }
            } else {
                // Resetta i dati dell'azienda quando l'utente esce
                setAzienda(null);
            }
        });

        return () => unsubscribe();
    }, []);

    const logout = async () => {
        try {
            await signOut(auth); // Esegui il logout
            setUser(null); // Resetta lo stato dell'utente
            setAzienda(null); // Resetta lo stato dell'azienda
        } catch (error) {
            console.error('Error during logout: ', error);
        }
    };

    return (
        <AuthContext.Provider value={{ user, azienda, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    return useContext(AuthContext);
};


import React, { createContext, useContext, useEffect, useState } from 'react';
import { auth } from '../firebaseConfig'; // Assicurati di importare la tua configurazione Firebase
import { onAuthStateChanged } from 'firebase/auth';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
      setLoading(false); // Caricamento completato
    });

    return () => unsubscribe(); // Pulizia dell'abbonamento
  }, []);

  return (
    <AuthContext.Provider value={{ user, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
*/