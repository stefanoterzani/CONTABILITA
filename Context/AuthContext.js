import React, { createContext, useContext, useState, useEffect } from 'react';
import { auth, db } from '../firebaseConfig'; 
import { doc, getDoc, setDoc, deleteDoc } from 'firebase/firestore';
import { onAuthStateChanged, signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut } from 'firebase/auth';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const[dataUser,setDataUser]=useState(null)
  const [loading, setLoading] = useState(true);
  const [azienda, setAzienda] = useState({});

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        const membershipDocRef = doc(db, 'membership', user.uid);
        const membershipDoc = await getDoc(membershipDocRef);
        if (membershipDoc.exists()) {
          const userData = membershipDoc.data();
          
          setCurrentUser(user);
          setDataUser(userData)
       //   console.log(userData)
       //   console.log('USER',user)
          const aziendaDocRef = doc(db, 'aziende', userData.IdAzienda);
        //  console.log(aziendaDocRef)
          const aziendaDoc = await getDoc(aziendaDocRef);
       //   console.log(aziendaDoc)
          if (aziendaDoc.exists()) {
       //     console.log('AZIENDA',aziendaDoc.data())
            setAzienda(aziendaDoc.data());
          }
        } else {
          setCurrentUser(user);
        }
      } else {
        setCurrentUser(null);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const loginUser = async (email, password, telefono = null) => {
    setLoading(true);
    try {
      const membershipDocRef = doc(db, 'membershipProvvisorio', email);
      const membershipDoc = await getDoc(membershipDocRef);

      if (membershipDoc.exists()) {
        if (membershipDoc.data().telefono === telefono) {
          const { idAzienda, nomeAzienda, qualifica } = membershipDoc.data();
          const userCredential = await createUserWithEmailAndPassword(auth, email, password);
          const newUser = userCredential.user;

          await setDoc(doc(db, 'membership', newUser.uid), {
            idAzienda,
            nomeAzienda,
            idUtente: newUser.uid,
            email,
            telefono,
            qualifica
          });

          await deleteDoc(membershipDocRef);
        } else {
          throw new Error('Numero di telefono non corretto');
        }
      } else {
        await signInWithEmailAndPassword(auth, email, password);
      }
      setCurrentUser(auth.currentUser);
    } catch (error) {
      console.error('Errore durante il login:', error);
    } finally {
      setLoading(false);
    }
  };

  const logoutUser = async () => {
    setLoading(true);
    try {
      await signOut(auth);
      setCurrentUser(null);
    } catch (error) {
      console.error('Errore durante il logout:', error);
    } finally {
      setLoading(false);
    }
  };
 console.log('CURRENT USER=',currentUser)
 console.log('DATA USER=',dataUser)
 console.log('AZIENDA=',azienda)

  return (
   
    <AuthContext.Provider value={{ currentUser, dataUser,loading, logoutUser, loginUser, azienda }}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom Hook per utilizzare il contesto
export const useAuth = () => {
  return useContext(AuthContext);
};
