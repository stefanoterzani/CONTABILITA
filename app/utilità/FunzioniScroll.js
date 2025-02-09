export const inizializzaScroll = (numScrolls) => {
    const scrollObj = {};
    for (let i = 1; i <= numScrolls; i++) {
      scrollObj[i] = { top: 0, altezza: 0, larghezza: 0 };
    }
    return scrollObj;
  };
  


  // Funzione per aggiornare una proprietà specifica di un particolare scroll
  export const aggiornaScroll = (prevState, id, proprieta, valore) => ({
    ...prevState,
    [id]: {
      ...prevState[id],
      [proprieta]: valore
    }
  });


// Funzione per aggiornare tutte le proprietà di un particolare scroll
 export const aggiornaTutteLeProprietaScroll = (prevState, id, nuoveProprieta) => ({
    ...prevState,
    [id]: {
      ...prevState[id],
      top: nuoveProprieta.top,
      altezza: nuoveProprieta.altezza,
      larghezza: nuoveProprieta.larghezza
    }
  });



export default {inizializzaScroll, aggiornaScroll,aggiornaTutteLeProprietaScroll};