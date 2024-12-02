import { db } from '../firebaseConfig';
import { collection, addDoc, getDoc, getDocs, updateDoc, doc } from 'firebase/firestore';

// Funzione per aggiungere un nuovo Fornitore
export const addFornitore = async (aziendaId, FornitoreData) => {
  try {
    const docRef = await addDoc(collection(db, 'aziende', aziendaId, 'Fornitori'), FornitoreData);
    return docRef;
  } catch (error) {
    console.error('Errore durante l\'aggiunta del Fornitore:', error);
    throw error;
  }
};

// Funzione per ottenere i dati di un Fornitore
export const getFornitore = async (aziendaId, FornitoreId) => {
  const FornitoreRef = doc(db, 'aziende', aziendaId, 'Fornitori', FornitoreId);
  const FornitoreDoc = await getDoc(FornitoreRef);
  if (FornitoreDoc.exists()) {
    return FornitoreDoc.data();
  } else {
    console.log('No such document!');
    return null;
  }
};

// Funzione per ottenere tutti i Fornitori di un'azienda
export const getFornitori = async (aziendaId) => {
  const FornitoriRef = collection(db, 'aziende', aziendaId, 'Fornitori');
  const querySnapshot = await getDocs(FornitoriRef);
  const Fornitori = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  return Fornitori;
};

// Funzione per aggiornare i dati di un Fornitore
export const updateFornitore = async (aziendaId, FornitoreId, FornitoreData) => {
  try {
    console.log('Aggiornamento del Fornitore:', FornitoreId, FornitoreData);
    const docRef = doc(db, 'aziende', aziendaId, 'Fornitori', FornitoreId);
    await updateDoc(docRef, FornitoreData);
  } catch (error) {
    console.error('Errore durante l\'aggiornamento del Fornitore:', error);
    throw error;
  }
};