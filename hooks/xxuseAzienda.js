import { useContext } from 'react';
import { AziendaContext } from '../context/AziendaContext';

const useAzienda = () => {
  return useContext(AziendaContext);
};

export default useAzienda;