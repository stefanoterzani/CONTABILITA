import React, { createContext, useState, useEffect, useContext } from 'react';
import { getOrdiniClienti, addOrdineCliente, updateOrdineCliente } from '../servizi/FunzioniOrdiniClienti';
import { db } from '../firebaseConfig';

const OrdiniClientiContext = createContext();

export const useOrdiniClienti = () => {
  return useContext(OrdiniClientiContext);
};

export const OrdiniClientiProvider = ({ children }) => {
  const [ordiniClienti, setOrdiniClienti] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchOrdiniClienti = async () => {
    try {
      const ordini = await getOrdiniClienti();
      setOrdiniClienti(ordini);
      setLoading(false);
    } catch (error) {
      console.error('Errore durante il recupero degli ordini clienti:', error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrdiniClienti();
  }, []);

  const addOrdineClienteContext = async (ordine) => {
    try {
      const docRef = await addOrdineCliente(ordine);
      setOrdiniClienti([...ordiniClienti, { id: docRef.id, ...ordine }]);
    } catch (error) {
      console.error('Errore durante l\'aggiunta dell\'ordine cliente:', error);
    }
  };

  const updateOrdineClienteContext = async (ordineId, ordine) => {
    try {
      await updateOrdineCliente(ordineId, ordine);
      setOrdiniClienti(ordiniClienti.map(o => (o.id === ordineId ? { id: ordineId, ...ordine } : o)));
    } catch (error) {
      console.error('Errore durante l\'aggiornamento dell\'ordine cliente:', error);
    }
  };

  return (
    <OrdiniClientiContext.Provider value={{ ordiniClienti, loading, fetchOrdiniClienti, addOrdineCliente: addOrdineClienteContext, updateOrdineCliente: updateOrdineClienteContext }}>
      {children}
    </OrdiniClientiContext.Provider>
  );
};