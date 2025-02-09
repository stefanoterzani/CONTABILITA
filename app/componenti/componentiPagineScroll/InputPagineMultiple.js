import {View } from 'react-native'
import React from 'react'
import PaginaScroll from '../componentiPagineScroll/PaginaScroll';
import FormDinamico  from '../componentiFormDinamico/FormDinamico';
import { useForm, FormProvider } from "react-hook-form";

const InputPagineMultiple = ({ 
  formId,
  schema, 
  top, 
  altezzaScroll, 
  larghezzaScroll, 
  barra, 
  barraInserisciElimina, 
  placeholder, 
  etichetta, 
  handleEvent, 
  altezzaColonna,

}) => {
  //console.log('formMethods pagina Multipla',JSON.stringify(formMethods, null, 2))
 // console.log('PAGINA MULTIPA ALTEZZA ', altezzaColonna)
   
  return (
      <PaginaScroll 
          top={top}
          scrollWidth={larghezzaScroll}
          scrollHeight={altezzaScroll}
          barra={barra}
          barraInserisciElimina={barraInserisciElimina}
          placeholder={placeholder}
          
        >
          {Object.keys(schema).map((pagina, index) => {
            const numeroRighe = Object.keys(schema[pagina]).length;
            return (
              <View key={index}>
                <FormDinamico 
                  schemaPagina={schema[pagina]}
                  containerWidth={larghezzaScroll}
                  containerHeight={altezzaScroll}
                  etichetta={etichetta}
                  formId={formId}
                  handleEvent={handleEvent}
                  numeroRighe={numeroRighe}
                  paginaCorrente={0}
                  tipoInputPagina={'multipla'}
                 
                />
              </View>
            );
          })}
        </PaginaScroll>
     
    );
  };
  
  export default InputPagineMultiple;
 

