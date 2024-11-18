// context/clienti/ClientiContext.js
import React, { createContext, useState, useContext } from 'react';
import { addCliente, getClienti, getCliente, updateCliente } from './FunzioniClienti';

const ClientiContext = createContext();

export const useClienti = () => useContext(ClientiContext);

export const ClientiProvider = ({ children }) => {
  const [clienti, setClienti] = useState([]);

  const fetchClienti = async (aziendaId) => {
    const clientiData = await getClienti(aziendaId);
    setClienti(clientiData);
  };

  const addNewCliente = async (aziendaId, clienteData) => {
    await addCliente(aziendaId, clienteData);
    fetchClienti(aziendaId);
  };

  return (
    <ClientiContext.Provider value={{ clienti, fetchClienti, addNewCliente, getCliente, updateCliente }}>
      {children}
    </ClientiContext.Provider>
  );
};