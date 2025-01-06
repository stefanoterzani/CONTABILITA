import React , {useEffect} from 'react';
import { View, Text, StyleSheet,TextInput, Platform,ScrollView, KeyboardAvoidingView, TouchableWithoutFeedback, Keyboard  } from 'react-native';
import FormDinamicoInput from './FormDinamicoInput';

export const FormDinamico = ({control,errors, schemaPagina, containerWidth, containerHeight,borderColor, borderWidth,formNumber,handleFocus,etichetta,numeroRighe, prefix, index  }) => {

  return (
   
    <View style={{ width: containerWidth, height: containerHeight,flex:1,borderColor,borderWidth }}>
          {Object.keys(schemaPagina).map((riga, rigaIndex) => (
              <View key={rigaIndex} style={{flexDirection: 'row',height:containerHeight/numeroRighe,
                                           // marginBottom:-15,
                                            }}>
                  {schemaPagina[riga].map((item, itemIndex) => (
                      <View   key={itemIndex}                 
                              style={{justifyContent:'center', 
                                      width: containerWidth*item.layout.width/100,                                
                                      marginRight:containerWidth* item.layout.margineDx/100,
                                      marginLeft:containerWidth* item.layout.margineSn/100 ,
                                      marginTop:0, }}>

                          <FormDinamicoInput 
                              item={item} 
                              itemIndex={itemIndex}
                              etichetta={etichetta}
                              onFocus={handleFocus}
                              formNumber={formNumber}
                              control={control}
                              errors={errors}
                              />

                       </View>
                  ))}
              </View>
            ))}
      </View>
    
  );
};



export default FormDinamico;