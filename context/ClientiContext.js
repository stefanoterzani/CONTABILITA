// context/clienti/ClientiContext.js
import React, { createContext, useState, useContext } from 'react';
import { addCliente, getClienti, getCliente, updateCliente } from '../servizi/FunzioniClienti';

const ClientiContext = createContext();

export const useClienti = () => useContext(ClientiContext);

export const ClientiProvider = ({ children }) => {
  const [clienti, setClienti] = useState([]);
  const [clienteDettagli, setClienteDettagli] = useState(null);
 
  const fetchClienti = async (aziendaId,sortField='nome') => {
    try {
      const clientiData = await getClienti(aziendaId);
      const clientiEssenziali = clientiData.map(cliente => ({
        id: cliente.id,
        nome: cliente.nome,
        partitaIva: cliente.partitaIva,
      }));
       // Verifica che il campo di ordinamento esista
       if (!clientiEssenziali.every(cliente => cliente.hasOwnProperty(sortField))) {
        console.warn(`Il campo di ordinamento "${sortField}" non esiste. Verrà usato "nome" come default.`);
        sortField = 'nome';
      }
       // Ordinamento alfabetico per 'nome'
       const sortedClienti = clientiEssenziali.sort((a, b) => {
        if (!a[sortField]) return 1;
        if (!b[sortField]) return -1;
        return a[sortField].localeCompare(b[sortField]);
        });

      setClienti(sortedClienti);
    } catch (error) {
      console.error('Errore nel recupero dei clienti:', error);
    }
  };



  const fetchClienteDettagli = async (idCliente) => {
    try {
      const dettagli = await getClienteDettagli(idCliente);
      setClienteDettagli(dettagli);
    } catch (error) {
      console.error('Errore nel recupero dei dettagli del cliente:', error);
    }
  };

  const addNewCliente = async (aziendaId, clienteData) => {
    try {
      await addCliente(aziendaId, clienteData);
      fetchClienti(aziendaId);
    } catch (error) {
      console.error('Errore nell\'aggiunta del cliente:', error);
    }
  };



  return (
    <ClientiContext.Provider value={{ clienti, fetchClienti, addNewCliente, getCliente, updateCliente }}>
      {children}
    </ClientiContext.Provider>
  );
};