// context/clienti/FunzioniClienti.js
import { db } from '../../firebaseConfig';
import { collection, addDoc, getDoc, getDocs, updateDoc, doc } from 'firebase/firestore';

// Funzione per aggiungere un nuovo cliente
export const addCliente = async (aziendaId, clienteData) => {
  const clientiRef = collection(db, 'aziende', aziendaId, 'clienti');
  await addDoc(clientiRef, clienteData);
};

// Funzione per ottenere i dati di un cliente
export const getCliente = async (aziendaId, clienteId) => {
  const clienteRef = doc(db, 'aziende', aziendaId, 'clienti', clienteId);
  const clienteDoc = await getDoc(clienteRef);
  if (clienteDoc.exists()) {
    return clienteDoc.data();
  } else {
    console.log('No such document!');
    return null;
  }
};

// Funzione per ottenere tutti i clienti di un'azienda
export const getClienti = async (aziendaId) => {
  const clientiRef = collection(db, 'aziende', aziendaId, 'clienti');
  const querySnapshot = await getDocs(clientiRef);
  const clienti = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  return clienti;
};

// Funzione per aggiornare i dati di un cliente
  export const updateCliente = async (aziendaId, clienteId, clienteData) => {
  const clienteRef = doc(db, 'aziende', aziendaId, 'clienti', clienteId);
  await updateDoc(clienteRef, clienteData);
};