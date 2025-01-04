import React from 'react';
import { View } from 'react-native';
import PaginaScroll from './PaginaScroll'; // Assicurati che il percorso sia corretto
import FormDinamico from './FormDinamico'; // Assicurati che il percorso sia corretto

const ScrollSchema = ({ 
  top,
 larghezzaColonnaCentrale,
  heightScrollSchema,
  schema,
  barra,
  barraInserisciElimina,
  placeholder,
}) => {
  return (
    <PaginaScroll
      top={0}
      scrollWidth="100%"
      scrollHeight="100%"
      barra={barra}
      barraInserisciElimina={barraInserisciElimina}
      placeholder={placeholder}
    >
      {Object.keys(schema).map((pagina, index) => {
        const numeroRighe = Object.keys(schema[pagina]).length;
        return (
          <View
            key={index}>
            <FormDinamico
              schemaPagina={schema[pagina]}
              containerWidth={larghezzaColonnaCentrale}
              containerHeight={heightScrollSchema}
              etichetta={true}
              formNumber={1}
              handleFocus={() => {}}
              numeroRighe={numeroRighe}
            />
          </View>
        );
      })}
    </PaginaScroll>
  );
};

export default ScrollSchema;