import React , {useEffect} from 'react';
import { View, Text, StyleSheet,TextInput, Platform,ScrollView, KeyboardAvoidingView, TouchableWithoutFeedback, Keyboard  } from 'react-native';
import FormDinamicoInput from './FormDinamicoInput';

export const FormDinamico = ({ schemaPagina, containerWidth, containerHeight,borderColor, borderWidth,formNumber,handleFocus,etichetta,control, errors, prefix, index  }) => {
// console.log('FORM DINAMICO',JSON.stringify(schemaPagina, null, 2))
//console.log('FORM DINAMICO',schemaPagina)
  return (
   
    <View style={{ width: containerWidth, height: containerHeight,flex:1,borderColor,borderWidth }}>
          {Object.keys(schemaPagina).map((riga, rigaIndex) => (
              <View key={rigaIndex} style={{flexDirection: 'row',
                  marginBottom: etichetta ? Platform.OS === 'web' ? '2%' : '7%'  : '2%',
              }}>
                  {schemaPagina[riga].map((item, itemIndex) => (
                      <View   key={itemIndex}                 
                              style={{justifyContent:'center', width: item.layout.width, height:item.layout.height,
                                      marginRight: item.layout.margineDx, marginLeft: item.layout.margineSx,  }}>

                          <FormDinamicoInput 
                              item={item} 
                              itemIndex={itemIndex}
                              etichetta={etichetta}
                              onFocus={handleFocus}
                              formNumber={formNumber}
                              />

                       </View>
                  ))}
              </View>
            ))}
      </View>
    
  );
};

const styles = StyleSheet.create({
  riga: {
   
    marginBottom: Platform.OS ==='web' ? '2%' : '7%'
  },
 
});

export default FormDinamico;