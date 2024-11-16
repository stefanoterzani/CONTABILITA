

import { db } from '../../firebaseConfig';
import { collection, addDoc, updateDoc, doc, getDoc ,setDoc,getDocs, deleteField,serverTimestamp} from 'firebase/firestore';
import { schemaAzienda } from '../Azienda/schemiAzienda';


const registraAccessoUtente = async (aziendaId, userId, appName) => {
  try {
    const aziendaDocRef = doc(db, 'aziende', aziendaId);
    const aziendaDocSnap = await getDoc(aziendaDocRef);

    // Verifica se il documento azienda esiste
    if (!aziendaDocSnap.exists()) {
      // Crea il documento azienda se non esiste
      await setDoc(aziendaDocRef, { createdAt: serverTimestamp() });
      console.log('Documento azienda creato con ID: ', aziendaId);
    }

    // Aggiungi un documento alla sottocollezione `accessiUtenti`
    const accessiUtentiRef = collection(db, 'aziende', aziendaId, 'accessiUtenti');
    await addDoc(accessiUtentiRef, {
      userId: userId,
      appName: appName,
      timestamp: serverTimestamp()
    });
    console.log('Accesso utente registrato con ID: ', userId);
  } catch (e) {
    console.error('Errore registrando l\'accesso utente: ', e);
  }
};


 const getAzienda = async (id) => {
  try {
    const docRef = doc(db, 'aziende', id);
    const docSnap = await getDoc(docRef);
    
    if (docSnap.exists()) {
      
      return docSnap.data();
    } else {
      console.log('Nessun documento trovato!');
      return null;
    }
  } catch (e) {
    console.error('Errore ottenendo i dati dell\'azienda: ', e);
  }
};



const creaAziendaVuota = async (adminId) => {
  console.log('Creazione azienda vuota ', adminId);
  try {
    const azienda = {};

    // Inizializza i campi dell'azienda basati sullo schema con valori vuoti
    Object.keys(schemaAzienda).forEach((key) => {
      if (key === 'sedeLegale') {
        azienda[key] = {};
        Object.keys(schemaAzienda[key]).forEach((subKey) => {
          azienda[key][subKey] = '';
        });
      } else {
        azienda[key] = '';
      }
    });

    // Aggiungi l'ID dell'amministratore
    azienda.adminId = adminId;
    azienda.aziendaId = adminId;
    // Crea un documento con ID uguale a adminId
    const docRef = doc(db, 'aziende', adminId);
    await setDoc(docRef, azienda);
    console.log('Azienda creata con ID: ', adminId);
  } catch (e) {
    console.error('Errore creando l\'azienda: ', e);
  }
}

const aggiornaAzienda = async (id, nuoviDati) => {
  try {
    const docRef = doc(db, 'aziende', id);
    const aziendaEsistente = await getAzienda(id);
    if (aziendaEsistente) {
     // console.log('Dati esistenti:', aziendaEsistente); // Log dei dati esistenti
    //  console.log('Nuovi dati:', nuoviDati); // Log dei nuovi dati
      // Identifica i campi da rimuovere
      const campiDaRimuovere = Object.keys(aziendaEsistente).filter(key => !(key in nuoviDati));
   //   console.log('Campi da rimuovere:', campiDaRimuovere); // Log dei campi da rimuovere
      const datiAggiornati = { ...aziendaEsistente, ...nuoviDati };

      // Rimuovi i campi eliminati
      campiDaRimuovere.forEach(key => {
    //    console.log(`Rimuovendo campo: ${key}`); // Log del campo che viene rimosso
        datiAggiornati[key] = deleteField();
      });

      // Gestisci i campi nidificati (sedeLegale)
      if (aziendaEsistente.sedeLegale) {
        const campiSedeLegaleDaRimuovere = Object.keys(aziendaEsistente.sedeLegale).filter(key => !(key in (nuoviDati.sedeLegale || {})));
     //   console.log('Campi sedeLegale da rimuovere:', campiSedeLegaleDaRimuovere); // Log dei campi sedeLegale da rimuovere
        campiSedeLegaleDaRimuovere.forEach(key => {
      //    console.log(`Rimuovendo campo sedeLegale: ${key}`); // Log del campo sedeLegale che viene rimosso
          datiAggiornati[`sedeLegale.${key}`] = deleteField();
        });
      }

      await updateDoc(docRef, datiAggiornati);
      console.log('Azienda aggiornata con ID: ', id);
    } else {
      console.log('L\'azienda non esiste');
    }
  } catch (e) {
    console.error('Errore aggiornando l\'azienda: ', e);
  }
};


export { registraAccessoUtente, aggiornaAzienda, creaAziendaVuota,getAzienda };