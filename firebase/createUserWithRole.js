import { auth, db } from '../firebaseConfig';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';

export const createUserWithRole = async (email, password, ruolo, nomeAzienda) => {
  // Crea l'utente con Firebase Auth
  const userCredential = await createUserWithEmailAndPassword(auth, email, password);
  const userId = userCredential.user.uid;

  // Crea il documento dell'utente nella collezione dell'azienda con il ruolo
  await setDoc(doc(db, 'aziende', nomeAzienda, 'utenti', userId), {
    email,
    ruolo, // Ruolo dell'utente, es. 'Impiegato1'
    dataCreazione: new Date(),
  });

  return userId;
};