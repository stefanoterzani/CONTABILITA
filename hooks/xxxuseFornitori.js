import { useContext } from 'react';
import { FornitoriContext } from '../context/ClientiContext';

const useFornitori = () => {
  return useContext(FornitoriContext);
};

export default useFornitori;