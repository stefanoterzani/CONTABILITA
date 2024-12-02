import { useContext } from 'react';
import { ClientiContext } from '../context/ClientiContext';

const useClienti = () => {
  return useContext(ClientiContext);
};

export default useClienti;