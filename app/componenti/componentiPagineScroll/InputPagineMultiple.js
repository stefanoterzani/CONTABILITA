import {View } from 'react-native'
import React from 'react'
import PaginaScroll from '../componentiPagineScroll/PaginaScroll';
import FormDinamico  from '../componentiFormDinamico/FormDinamico';

const InputPagineMultiple = ({formNumber,top,altezzaScroll,larghezzaScroll,barra,barraInserisciElimina,placeholder,etichetta,schema,handleFocus}) => {
    
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
                                            containerWidth={larghezzaScroll}
                                            containerHeight={altezzaScroll}
                                            etichetta={etichetta} 
                                            formNumber={formNumber}
                                            handleFocus={handleFocus}  
                                            numeroRighe={numeroRighe}  />      
                                    </View>
                               )
                            })}  




            </PaginaScroll>   
    </View>
  )
}

export default InputPagineMultiple

