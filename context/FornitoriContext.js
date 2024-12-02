import React, { createContext, useState, useContext } from 'react';
import { addFornitore, getFornitori, getFornitore, updateFornitore } from '../servizi/FunzioniFornitori';

const FornitoriContext = createContext();

export const useFornitori = () => useContext(FornitoriContext);

export const FornitoriProvider = ({ children }) => {
  const [Fornitori, setFornitori] = useState([]);
  const [FornitoreDettagli, setFornitoreDettagli] = useState(null);
 
  const fetchFornitori = async (aziendaId,sortField='nome') => {
    try {
      const FornitoriData = await getFornitori(aziendaId);
      const FornitoriEssenziali = FornitoriData.map(Fornitore => ({
        id: Fornitore.id,
        nome: Fornitore.nome,
        partitaIva: Fornitore.partitaIva,
      }));
       // Verifica che il campo di ordinamento esista
       if (!FornitoriEssenziali.every(Fornitore => Fornitore.hasOwnProperty(sortField))) {
        console.warn(`Il campo di ordinamento "${sortField}" non esiste. Verrà usato "nome" come default.`);
        sortField = 'nome';
      }
       // Ordinamento alfabetico per 'nome'
       const sortedFornitori = FornitoriEssenziali.sort((a, b) => {
        if (!a[sortField]) return 1;
        if (!b[sortField]) return -1;
        return a[sortField].localeCompare(b[sortField]);
        });

      setFornitori(sortedFornitori);
    } catch (error) {
      console.error('Errore nel recupero dei Fornitori:', error);
    }
  };



  const fetchFornitoreDettagli = async (idFornitore) => {
    try {
      const dettagli = await getFornitoreDettagli(idFornitore);
      setFornitoreDettagli(dettagli);
    } catch (error) {
      console.error('Errore nel recupero dei dettagli del Fornitore:', error);
    }
  };

  const addNewFornitore = async (aziendaId, FornitoreData) => {
    try {
      await addFornitore(aziendaId, FornitoreData);
      fetchFornitori(aziendaId);
    } catch (error) {
      console.error('Errore nell\'aggiunta del Fornitore:', error);
    }
  };



  return (
    <FornitoriContext.Provider value={{ Fornitori, fetchFornitori, addNewFornitore, getFornitore, updateFornitore }}>
      {children}
    </FornitoriContext.Provider>
  );
};