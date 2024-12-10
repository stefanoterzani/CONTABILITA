import { useState, useEffect } from 'react';
import comuni from '../assets/dati/comuni.json'; // Importa i dati locali
import provincie from '../assets/dati/provincie.json'; // Importa i dati locali

const useSelector = (tipoElenco) => {
  const [query, setQuery] = useState('');
  const [filteredItems, setFilteredItems] = useState([]);
  const [selectedItem, setSelectedItem] = useState(null);
  const [items, setItems] = useState([]);

//console.log('TIPO ELENCO',tipoElenco)


  useEffect(() => {
    const loadItems = async () => {
      try {
        let data = [];

        switch (tipoElenco) {
          case 'comuni':    
            data = comuni
            break;
           
            case 'aliquote':    
            data = null
            break;

            case 'provincie':    
            data = provincie
            break;
            case 'comuniFirestore':
            // Caricamento da Firestore
            const comuniCollection = collection(firestore, 'comuni'); // Sostituisci con il nome della tua collezione
            const comuniSnapshot = await getDocs(comuniCollection);
            data = comuniSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
            break;

          case 'immaginiStorage':
            // Caricamento da Firebase Storage
            const storageRef = ref(storage, 'path/to/your/file.json'); // Sostituisci con il percorso del tuo file
            const url = await getDownloadURL(storageRef);
            const response = await fetch(url);
            data = await response.json();
            break;

          // Aggiungi altri casi per diversi tipi di elenco
          default:
            console.warn(`TipoElenco "${tipoElenco}" non riconosciuto. Nessun dato caricato.`);
            break;
        }

        setItems(data);
      } catch (error) {
        console.error(`Errore durante il caricamento dei dati per tipoElenco: ${tipoElenco}`, error);
        Alert.alert('Errore', `Impossibile caricare i dati per "${tipoElenco}".`);
      }
    };

    if (tipoElenco) {
      loadItems();
    }
  }, [tipoElenco]);

  const handleSelectItem = (item) => {
    console.log('HANDLE SELECTED', item);
    setSelectedItem(item);
    setQuery(item.nome);
    setFilteredItems([]); // Nasconde l'elenco quando un item viene selezionato
  };

  const filterItems = (text) => {
    setQuery(text);
    if (text) {
      const filtered = items.filter((item) =>
        item.nome.toLowerCase().startsWith(text.toLowerCase())
      );
      setFilteredItems(filtered);
    } else {
      setFilteredItems([]);
      setSelectedItem(null);
    }
  };

  return {
    query,
    filteredItems,
    selectedItem,
    handleSelectItem,
    filterItems,
  };
};

export default useSelector;