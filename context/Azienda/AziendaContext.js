import React, { createContext, useState, useContext } from 'react';

const AziendaContext = createContext();

export const useAzienda = () => useContext(AziendaContext);

export const AziendaProvider = ({ children }) => {
  const [datiAzienda, setDatiAzienda] = useState(null);

  return (
    <AziendaContext.Provider value={{ datiAzienda, setDatiAzienda }}>
      {children}
    </AziendaContext.Provider>
  );
};