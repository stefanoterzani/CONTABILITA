
import { Platform } from 'react-native';
//import { useSelector, useDispatch } from 'react-redux';
//import {  aggiungiPagina as aggiungiPaginaRedux } from '../redux/slice/pagineSlice';



export const filtraSchemaPerApplicazione = (schema, applicazione) => {
  return Object.keys(schema).reduce((acc, key) => {
      const field = schema[key];
      const layoutKey = field.layout?.[applicazione];

      if (layoutKey && layoutKey.visibile !== false) {
        acc[key] = { ...field, layout: layoutKey };
    }

      return acc;
  }, {});
};

export const raggruppaSchemaPerPagina = (schema) => {
  return Object.keys(schema).reduce((acc, key) => {
      const field = schema[key];
      const pagina = field.layout?.pagina;

      if (pagina !== undefined) {
          if (!acc[pagina]) {
              acc[pagina] = [];
          }
          acc[pagina].push({ key, ...field });
      }

      return acc;
  }, {});
}
    
    
export const raggruppaSchemaPerRiga = (schemaPerPagina) => {
    return Object.keys(schemaPerPagina).reduce((acc, pagina) => {
        const campi = schemaPerPagina[pagina];
        acc[pagina] = campi.reduce((accRiga, campo) => {
            const riga = campo.layout?.row;
  
            if (riga !== undefined) {
                if (!accRiga[riga]) {
                    accRiga[riga] = [];
                }
                accRiga[riga].push(campo);
            }
  
            return accRiga;
        }, {});
  
        return acc;
    }, {});
  };


  export const organizzaSchema = (schema) => {
    const applicazione = Platform.OS === 'web' ? 'web' : 'mobile';
    const schemaFiltrato = filtraSchemaPerApplicazione(schema, applicazione);
    const schemaPerPagina = raggruppaSchemaPerPagina(schemaFiltrato);
    const schemaOrganizzato = raggruppaSchemaPerRiga(schemaPerPagina);
     
    return schemaOrganizzato;
  };


  export const aggiungiPagina = (pagine, schemaOrganizzato) => {
    const newPageNumber = Object.keys(pagine).length + 1;
    const newPage = JSON.parse(JSON.stringify(schemaOrganizzato[1])); // Copia della struttura della prima pagina
  
    // Aggiorna gli attributi specifici della nuova pagina
    Object.keys(newPage).forEach((rowKey) => {
      newPage[rowKey].forEach((field) => {
      //  field.key = `${field.key}`;
        field.layout.pagina = newPageNumber;
      });
    });
  
    return { ...pagine, [newPageNumber]: newPage };
  };

  



  export const eliminaPagina = (pagine, pageNumber, schemaIniziale,setSchema) => {
   // console.log('schemaIniziale', schemaIniziale);
    const updatedPages = { ...pagine };
    delete updatedPages[pageNumber];

    // Crea un nuovo oggetto con le chiavi scalate
  const newPages = {};
  let newPageNumber = 1;
  Object.keys(updatedPages).sort().forEach((key) => {
    newPages[newPageNumber] = updatedPages[key];
    newPageNumber++;
  });
// Se newPages è vuoto, reimposta con lo schema iniziale
if (Object.keys(newPages).length === 0) {
  setSchema({ ...schemaIniziale }); // Aggiungi una pagina vuota con la struttura iniziale
} else {
  setSchema({ ...newPages });
}
 // console.log('eliminaPagina', newPages);
  return newPages;
    
  };

 // Funzione per organizzare lo schema in base a una pagina multipla
// Funzione per organizzare lo schema in base a una pagina multipla e registrare i campi
export const organizzaSchemaFormPaginaMultipla = (organizzato, schemaNumber, formMethods) => {
  
  let nuovoOrganizzato = [];
  Object.keys(organizzato).forEach(pagina => {
    Object.keys(organizzato[pagina]).forEach(riga => {
      organizzato[pagina][riga].forEach(field => {
        const fieldKey = `${schemaNumber}.${field.key}`;
        nuovoOrganizzato.push(fieldKey);
        formMethods.register(fieldKey);
        formMethods.setValue(fieldKey, ''); // Inizializza con valore vuoto
      });
    });
  });
  return nuovoOrganizzato;
};


  export const inizializzaSchemaFormPaginaMultipla = ( schemaNumber,schema, setSchema, formMethods) => {
    let organizzato = organizzaSchema(schema);
    setSchema(organizzato); // Imposta lo stato organizzato
  
    let nuovoOrganizzato = [];

    if (schemaNumber === 0) {
      const idFieldKey = '0.id';
      nuovoOrganizzato.push(idFieldKey);
      formMethods.register(idFieldKey);
      formMethods.setValue(idFieldKey, ''); // Inizializza con una stringa vuota
    }
    Object.keys(organizzato).forEach(pagina => {
      Object.keys(organizzato[pagina]).forEach(riga => {
        organizzato[pagina][riga].forEach(field => {
          const fieldKey = `${schemaNumber}.${field.key}`;
          nuovoOrganizzato.push(fieldKey);
          formMethods.register(fieldKey);
          formMethods.setValue(fieldKey, ''); // Inizializza con valore vuoto
        });
      });
    });
  
     // Aggiungi il campo id alla pagina 0 se schemaNumber è 0
  
    return nuovoOrganizzato;
  };

  export const inizializzaSchemaFormPagineSingole = (schema, schemaNumber, numeroPagina, setInizialeSchema, setPagineSchemaOrganizzato, formMethods) => {
    let organizzato = organizzaSchema(schema);
    setInizialeSchema(organizzato); // Imposta lo stato iniziale
    setPagineSchemaOrganizzato(organizzato); // Imposta lo stato delle pagine organizzate
  
    let nuovoOrganizzato = [];
    Object.keys(organizzato).forEach(pagina => {
      Object.keys(organizzato[pagina]).forEach(riga => {
        organizzato[pagina][riga].forEach(field => {
          const fieldKey = `${schemaNumber}.${numeroPagina}_${field.key}`;
          nuovoOrganizzato.push(fieldKey);
          formMethods.register(fieldKey);
          formMethods.setValue(fieldKey, ''); // Inizializza con valore vuoto
        });
      });
    });
  
    return nuovoOrganizzato;
  };

 export const valoreAssoluto= (valore,percentuale) => {
        const percentValue = parseFloat(percentuale) / 100
        return (parseFloat(valore) * percentValue)
        
  }

export const determinaNumeroPagine = (oggetto) => {
 // Determina il numero di pagine necessarie
 let numeroPagine = 1;
 Object.entries(oggetto).forEach(([key, value]) => {
   if (typeof value === 'object' && value !== null) {
     Object.keys(value).forEach((subKey) => {
       const keyParts = subKey.split('_');
       if (keyParts.length > 1) {
         const pageIndex = parseInt(keyParts[0], 10);
         if (!isNaN(pageIndex) && pageIndex > numeroPagine) {
           numeroPagine = pageIndex;
         }
       }
     });
   }
 });
return numeroPagine;
}

export const aggiungiPagineNecessarie = (numeroPagine,setSchema,schemaVuoto,setKey) => {
 
  for (let i = 2; i <= numeroPagine; i++) {
  setSchema((prevPagine) => {
    const newPagine = aggiungiPagina(prevPagine, schemaVuoto);
    setKey((prevKey) => prevKey + 1);
    
   return newPagine;
  });
}

}

  export default {
    organizzaSchema,
    aggiungiPagina,
    eliminaPagina,
    valoreAssoluto,
    determinaNumeroPagine,
    aggiungiPagineNecessarie
     };

  expo