import React , {useEffect} from 'react';
import { View,Text } from 'react-native';
import FormDinamicoInput from './FormDinamicoInput';

export const FormDinamico = ({ formNumber,
                                schemaPagina,
                                initialDataForm, 
                                handleEvent,
                                containerWidth, 
                                containerHeight,
                                borderColor, 
                                borderWidth,
                                etichetta,numeroRighe}) => {

//console.log ('FORM DINAMICO SCHEMA PAGINA:',containerWidth,containerHeight)

  return (
   
    <View style={{ width: containerWidth, height: containerHeight,flex:1,borderColor,borderWidth }}>
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
                              item={item} 
                              initialDataForm={initialDataForm}
                              itemIndex={itemIndex}
                              etichetta={etichetta}
                              schemaPagina={schemaPagina}
                              formNumber={formNumber}
                              handleEvent={handleEvent}
                              />

                       </View>
                  ))}
              </View>
            ))}
      </View>
    
  );
};



export default FormDinamico;

