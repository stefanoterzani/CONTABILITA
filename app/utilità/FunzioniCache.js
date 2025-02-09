import DataManager from '../utilità/DataManager/DataManager';

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
  
  export const aggiornaDatiCache = async (tipoDati, nuovoDato) => {
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