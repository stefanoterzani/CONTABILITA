import { db } from '../firebaseConfig';
import { collection, getDocs, query, orderBy, limit, startAfter, doc, getDoc } from 'firebase/firestore';

// Funzione per recuperare gli accessi e sostituire gli ID utente con i nomi
const getAccessiConNomi = async (aziendaId, limitCount = 10, lastDoc = null) => {
  try {
    const accessiUtentiRef = collection(db, 'aziende', aziendaId, 'accessiUtenti');
    let q;
    if (lastDoc) {
      q = query(accessiUtentiRef, orderBy('timestamp', 'desc'), startAfter(lastDoc), limit(limitCount));
    } else {
      q = query(accessiUtentiRef, orderBy('timestamp', 'desc'), limit(limitCount));
    }
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

      accessi.push({ ...accesso, id: docSnap.id });
    }

    return { accessi, lastDoc: querySnapshot.docs[querySnapshot.docs.length - 1] };
  } catch (e) {
    console.error('Errore recuperando gli accessi con nomi: ', e);
    return { accessi: [], lastDoc: null };
  }
};

export { getAccessiConNomi };