
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

  export default {
    organizzaSchema,
  
  };