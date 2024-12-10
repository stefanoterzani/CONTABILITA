
import { db } from '../firebaseConfig';
import { collection, addDoc, getDoc, getDocs, updateDoc, doc } from 'firebase/firestore';

// Funzione per aggiungere un nuovo ordine cliente
export const addOrdineCliente = async (ordine) => {
  try {
    const docRef = await addDoc(collection(db, 'ordiniClienti'), ordine);
    return docRef.id;
  } catch (error) {
    console.error('Errore durante l\'aggiunta dell\'ordine cliente:', error);
    throw error;
  }
};

// Funzione per ottenere tutti gli ordini clienti
export const getOrdiniClienti = async () => {
  try {
    const querySnapshot = await getDocs(collection(db, 'ordiniClienti'));
    const ordini = [];
    querySnapshot.forEach((doc) => {
      ordini.push({ id: doc.id, ...doc.data() });
    });
    return ordini;
  } catch (error) {
    console.error('Errore durante il recupero degli ordini clienti:', error);
    throw error;
  }
};

// Funzione per ottenere un ordine cliente specifico
export const getOrdineCliente = async (ordineId) => {
  try {
    const ordineRef = doc(db, 'ordiniClienti', ordineId);
    const ordineDoc = await getDoc(ordineRef);
    if (ordineDoc.exists()) {
      return { id: ordineDoc.id, ...ordineDoc.data() };
    } else {
      console.log('No such document!');
      return null;
    }
  } catch (error) {
    console.error('Errore durante il recupero dell\'ordine cliente:', error);
    throw error;
  }
};

// Funzione per aggiornare un ordine cliente esistente
export const updateOrdineCliente = async (ordineId, ordine) => {
  try {
    const ordineRef = doc(db, 'ordiniClienti', ordineId);
    await updateDoc(ordineRef, ordine);
    return ordineId;
  } catch (error) {
    console.error('Errore durante l\'aggiornamento dell\'ordine cliente:', error);
    throw error;
  }
};