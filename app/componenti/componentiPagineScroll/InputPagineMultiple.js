import {View } from 'react-native'
import React from 'react'
import PaginaScroll from '../componentiPagineScroll/PaginaScroll';
import FormDinamico  from '../componentiFormDinamico/FormDinamico';

const InputPagineMultiple = ({formNumber,schema,handleEvent,initialDataForm,top,altezzaScroll,larghezzaScroll,barra,barraInserisciElimina,placeholder,etichetta}) => {
    console.log('INPUT PAGINE MULTIPLE larghezzaScroll :',larghezzaScroll)
    return (
    <View>
            <PaginaScroll 
                    top={top}
                    scrollWidth={larghezzaScroll}  
                    scrollHeight={altezzaScroll} 
                    barra={barra}
                    barraInserisciElimina={barraInserisciElimina}
                    placeholder={placeholder} >
               
                          {Object.keys(schema).map((pagina, index) =>{
                              const numeroRighe = Object.keys(schema[pagina]).length;
                              return (
                                  <View key={index} >  
                                        <FormDinamico 
                                            schemaPagina={schema[pagina]} 
                                            initialDataForm={initialDataForm}
                                            containerWidth={larghezzaScroll}
                                            containerHeight={altezzaScroll}
                                            etichetta={etichetta} 
                                            formNumber={formNumber}
                                            numeroRighe={numeroRighe} 
                                            handleEvent={handleEvent}
                                             />      
                                    </View>
                               )
                            })}  




            </PaginaScroll>   
    </View>
  )
}

export default InputPagineMultiple

