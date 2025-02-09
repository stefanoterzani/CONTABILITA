

const CacheManagerWeb = {

    // Funzione per caricare i dati dalla cache
    loadData: (key) => {
      try {
        const jsonValue = localStorage.getItem(key);
        return jsonValue != null ? JSON.parse(jsonValue) : null;
      } catch (e) {
        console.error('Errore', 'Impossibile caricare i dati dalla cache');
        return null;
      }
    },
  
    // Funzione per salvare i dati nella cache
    saveData: (key, data) => {
     // console.log('Salvataggio dati in cache su web ',key,data);
      try {
        const jsonValue = JSON.stringify(data);
        localStorage.setItem(key, jsonValue);
      } catch (e) {
        console.error('Errore', 'Impossibile salvare i dati nella cache');
      }
    },
  
    // Funzione per rimuovere i dati dalla cache
    removeData: (key) => {
      try {
        localStorage.removeItem(key);
      } catch (e) {
        console.error('Errore', 'Impossibile rimuovere i dati dalla cache');
      }
    },

    resetCache: () => {
      try {
        localStorage.clear();
        console.log('Cache resettata su web');
      } catch (e) {
        console.error('Errore', 'Impossibile resettare la cache');
      }
    },



  };
  
  export default CacheManagerWeb;