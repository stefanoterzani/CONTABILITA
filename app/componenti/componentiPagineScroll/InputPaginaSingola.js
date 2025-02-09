import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import PaginaScroll from '../componentiPagineScroll/PaginaScroll';
import FormDinamico  from '../componentiFormDinamico/FormDinamico';
import { useForm, FormProvider } from "react-hook-form";
import { useSelector } from 'react-redux';

const InputPaginaSingola = ({
                formId,
                schema,
                top,
                altezzaScroll,
                larghezzaScroll,
                barra,
                barraInserisciElimina,
                placeholder,
                etichetta,
                handleAggiungiPagina,
                handleEliminaPagina,
                handleEvent,
                altezzaColonna,
              }) => {
 
                const variabileFittizia = useSelector((state) => state.variabiliCondivise.variabileFittizia)
      //          console.log("INPUT PAGINA SINGOLA",altezzaColonna);

  
    return (
      
            <View>
                <PaginaScroll 
                    top={top}
                    scrollWidth={larghezzaScroll}  
                    scrollHeight={altezzaScroll} 
                    barra={barra}
                    barraInserisciElimina={barraInserisciElimina}
                    placeholder={placeholder} 
                    onNuovo={handleAggiungiPagina}
                    onElimina={handleEliminaPagina}  >  

                    {Object.keys(schema).map((pagina, index) => {
                      const numeroRighe = Object.keys(schema[pagina]).length;
                      {/* console.log('pagina SCHEMA 2',JSON.stringify(schema[pagina], null, 2))*/}
                      return (
                      
                        <View key={index} >
                              <FormDinamico 
                                  schemaPagina={schema[pagina]}
                                  containerWidth={larghezzaScroll} 
                                  containerHeight={altezzaScroll}  
                                  etichetta={etichetta}
                                  formId={formId} 
                                  handleEvent={handleEvent}
                                  numeroRighe={numeroRighe} // Passa il numero di righe 
                                  paginaCorrente={pagina} // Passa il numero di pagina
                                  tipoInputPagina={'singola'}
                                 
                                  />
                        </View>
                    )
                    })}
                </PaginaScroll>  
    </View>
  
  )
}

export default InputPaginaSingola

