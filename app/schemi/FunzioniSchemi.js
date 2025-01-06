
import { Platform } from 'react-native';


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
       // field.key = field.key;

        field.key = `${newPageNumber}.${field.key}`;
        field.layout.pagina = newPageNumber;
      });
    });
  console.log('aggiungiPagina', newPage);
    return {  ...pagine, [newPageNumber]: newPage };
     
     
  };



  export const eliminaPagina = (pagine, pageNumber) => {
    const updatedPages = { ...pagine };
    delete updatedPages[pageNumber];

    // Crea un nuovo oggetto con le chiavi scalate
  const newPages = {};
  let newPageNumber = 1;
  Object.keys(updatedPages).sort().forEach((key) => {
    newPages[newPageNumber] = updatedPages[key];
    newPageNumber++;
  });

 // console.log('eliminaPagina', newPages);
  return newPages;
    
  };

  export default {
    organizzaSchema,
    aggiungiPagina,
    eliminaPagina,
  };

  expo