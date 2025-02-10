import DataManager from '../utilità/DataManager/DataManager';
import uuid from 'react-native-uuid'; // Importa uuid per generare ID unici

export const leggeDatiCache = async (tipoDati) => {
  try {
    let existingData = await DataManager.loadData(tipoDati) || [];
    // Assicurarsi che existingData sia un array
    if (!Array.isArray(existingData)) {
      existingData = [];
    }
    return existingData;
  } catch (error) {
    console.error('Errore durante la lettura dei dati dalla cache:', error);
    return [];
  }
};

export const salvaDatiCache = async (tipoDati, data) => {
    try {
      await DataManager.saveData(tipoDati, data);
      //console.log('Dati salvati nella cache:', data);
    } catch (error) {
      console.error('Errore durante il salvataggio dei dati nella cache:', error);
    }
  };
 
  const aggiornaDatiCache = async (tipoDati, nuovoDato) => {
    try {
      let existingData = await leggeDatiCache(tipoDati);
      // Assicurarsi che existingData sia un array
      if (!Array.isArray(existingData)) {
        existingData = [];
      }
      const updatedData = [...existingData, nuovoDato];
      await salvaDatiCache(tipoDati, updatedData);
      //console.log('Dati aggiornati nella cache:', updatedData);
      return updatedData;
    } catch (error) {
      console.error('Errore durante l\'aggiornamento dei dati nella cache:', error);
      return [];
    }
  };

  export const aggiungeRecordCache =  async (formMethods,campoId,archivio) => {
    const newId = uuid.v4();
    const formValues = formMethods.getValues();
    formValues[0].id = newId; 
    formMethods.setValue(campoId, newId); // Riempie il campo id esistente
    await aggiornaDatiCache(archivio, formValues);

  }

  export const aggiornaRecordCache = async (formMethods, idSelezione, nomeArchivio, indice,campoId) => {
      let existingData = DataManager.loadData(nomeArchivio) || [];
      if (!Array.isArray(existingData)) {
        existingData = [];
      }
    
      // Trova l'indice del cliente da modificare
      const clienteIndex = existingData.findIndex((archivio) => archivio[indice][campoId] === idSelezione);
      if (clienteIndex !== -1) {
        const formValues = formMethods.getValues();
        existingData[clienteIndex] = formValues;
        DataManager.saveData(nomeArchivio, existingData);
        return true; // Aggiornamento effettuato con successo
      }
      return false; // Aggiornamento non effettuato
  
      // const clienteIndex = existingData.findIndex((cliente) => cliente[0].id === id);  
    };

