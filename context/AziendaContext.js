// src/context/AziendaContext.js
// src/context/AziendaContext.js
import React, { createContext, useState, useContext } from 'react';
import { getAzienda, creaAzienda, aggiornaAzienda } from '../servizi/FunzioniAzienda';

const AziendaContext = createContext();
//const useAzienda = () => useContext(AziendaContext);

export const AziendaProvider = ({ children }) => {
  const [azienda, setAzienda] = useState(null);

  const fetchAzienda = async (id) => {
    try {
     
      const dati = await getAzienda(id);
      //console.log('fetchAzienda: Azienda recuperata', dati);
      setAzienda(dati);
      return dati;
      //console.log('Contesto aggiornato:', azienda);
    } catch (e) {
      console.error('Errore recuperando l\'azienda: ', e);
    }
  };

  const createAzienda = async (adminId, schemaAzienda) => {
    try {
      await creaAzienda(adminId, schemaAzienda);
      await fetchAzienda(adminId); // Aggiorna lo stato locale dopo la creazione
    } catch (e) {
      console.error('Errore creando l\'azienda: ', e);
    }
  };

  const updateAzienda = async (id, nuoviDati) => {
    try {
      await aggiornaAzienda(id, nuoviDati);
      await fetchAzienda(id); // Aggiorna lo stato locale dopo l'aggiornamento
    } catch (e) {
      console.error('Errore aggiornando l\'azienda: ', e);
    }
  };

  return (
 
    <AziendaContext.Provider value={{ azienda,setAzienda,fetchAzienda, createAzienda, updateAzienda }}>
      {children}
    </AziendaContext.Provider>
  );
};
export const useAzienda= () => {
  return useContext(AziendaContext);
};