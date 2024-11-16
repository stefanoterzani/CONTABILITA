import { db } from '../../firebaseConfig';
import { collection, getDocs, query, orderBy, doc, getDoc } from 'firebase/firestore';

// Funzione per recuperare gli accessi e sostituire gli ID utente con i nomi
export const getAccessiConNomi = async (aziendaId) => {
  try {
    const accessiUtentiRef = collection(db, 'aziende', aziendaId, 'accessiUtenti');
    const q = query(accessiUtentiRef, orderBy('timestamp', 'desc'));
    const querySnapshot = await getDocs(q);

    const accessi = [];
    for (const docSnap of querySnapshot.docs) {
      const accesso = docSnap.data();
      const userId = accesso.userId;

      // Recupera il nome dell'utente dalla raccolta membership
      const membershipDocRef = doc(db, 'membership', userId);
      const membershipDoc = await getDoc(membershipDocRef);
      if (membershipDoc.exists()) {
        const membershipData = membershipDoc.data();
        accesso.nome = membershipData.nome;
      } else {
        accesso.nome = 'Utente sconosciuto';
      }

      accessi.push(accesso);
    }

    return accessi;
  } catch (e) {
    console.error('Errore recuperando gli accessi con nomi: ', e);
    return [];
  }
};