import { StyleSheet, Text, View } from 'react-native'
import React, {useState,useEffect} from 'react'
import PaginaScroll from '../componentiPagineScroll/PaginaScroll';
import FormDinamico  from '../componentiFormDinamico/FormDinamico';

const InputPaginaSingola = ({formNumber,
                schema,
                initialDataForm,
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
              }) => {

// console.log('pagina singola SCHEMA ORGANIZZATO 2',JSON.stringify(schema, null, 2))
// console.log('pagina singola ALTEZZA:',altezzaScroll,'LARGHEZZA:', larghezzaScroll, 'TOP',top,)
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
                    onElimina={handleEliminaPagina}   
                   
                    >
             
                    {Object.keys(schema).map((pagina, index) => {
                      const numeroRighe = Object.keys(schema[pagina]).length;
                      {/* console.log('pagina SCHEMA 2',JSON.stringify(schema[pagina], null, 2))*/}
                      return (
                      
                        <View key={index} >
                              <FormDinamico 
                                  schemaPagina={schema[pagina]}
                                  initialDataForm={initialDataForm}
                                  containerWidth={larghezzaScroll} 
                                  containerHeight={altezzaScroll}  
                                  etichetta={etichetta}
                                  formNumber={formNumber} 
                                  handleEvent={handleEvent}
                                  numeroRighe={numeroRighe} // Passa il numero di righe 
                                  />
                        </View>
                    )
                    })}
                </PaginaScroll>  
    </View>
  )
}

export default InputPaginaSingola

