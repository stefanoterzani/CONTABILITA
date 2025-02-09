import React , {useEffect} from 'react';
import { View,Text } from 'react-native';
import FormDinamicoInput from './FormDinamicoInput';

export const FormDinamico = ({ formId,
                                schemaPagina,
                                handleEvent,
                                containerWidth, 
                                containerHeight,
                                etichetta,
                                numeroRighe,
                                paginaCorrente,
                                tipoInputPagina,
                               }) => {
                                  
//console.log('FORM DINAMICO')

  return (
  
    <View style={{ width: containerWidth, height: containerHeight,flex:1}}>
          
          {Object.keys(schemaPagina).map((riga, rigaIndex) => (
              <View key={rigaIndex} style={{flexDirection: 'row',height:containerHeight/numeroRighe }}>
                  {schemaPagina[riga].map((item, itemIndex) => (
                      <View   key={itemIndex}                 
                              style={{justifyContent:'center', 
                                      width: containerWidth*item.layout.width/100,                                
                                      marginRight:containerWidth* item.layout.margineDx/100,
                                      marginLeft:containerWidth* item.layout.margineSn/100 ,
                                      marginTop:0, }}>

                          <FormDinamicoInput 
                              formId={formId} // Passiamo il formId
                              field={item.key} // Passiamo la chiave del campo
                              item={item} 
                              etichetta={etichetta}
                              schemaPagina={schemaPagina}                         
                              handleEvent={handleEvent}
                              paginaCorrente={paginaCorrente}
                              tipoInputPagina={tipoInputPagina}
                             width={containerWidth*item.layout.width/100}
                              />

                       </View>
                  ))}
              </View>
            ))}
      </View>
    
  );
};



export default FormDinamico;

