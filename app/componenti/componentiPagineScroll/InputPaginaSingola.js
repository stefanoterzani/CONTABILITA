import { StyleSheet, Text, View } from 'react-native'
import React, {useState,useEffect} from 'react'
import PaginaScroll from '../componentiPagineScroll/PaginaScroll';
import FormDinamico  from '../componentiFormDinamico/FormDinamico';

const InputPaginaSingola = ({formNumber,schema,top,altezzaScroll,larghezzaScroll,barra,barraInserisciElimina,placeholder,etichetta,handleFocus,handleAggiungiPagina,handleEliminaPagina, control, errors}) => {
  const [localSchema, setLocalSchema] = useState(schema);
  
    useEffect(() => {
        setLocalSchema(schema)
    }, [schema])

  

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
             
                    {Object.keys(localSchema).map((pagina, index) => {
                      const numeroRighe = Object.keys(localSchema[pagina]).length;
                      return (
                        <View key={index} >
                              <FormDinamico 
                                  schemaPagina={localSchema[pagina]}
                                  containerWidth={larghezzaScroll} 
                                  containerHeight={altezzaScroll}  
                                  etichetta={etichetta}
                                  formNumber={formNumber} 
                                  handleFocus={handleFocus} 
                                  numeroRighe={numeroRighe} // Passa il numero di righe 
                                  control={control}
                                  errors={errors}

                                  />
                        </View>
                     )
                    })}
                </PaginaScroll>  
    </View>
  )
}

export default InputPaginaSingola

