import React from 'react';
import { View, Text, StyleSheet,TextInput, Platform } from 'react-native';
import CustomInput from './CustomInput';

export const FormDinamico = ({ schemaPagina, containerWidth, containerHeight,borderColor, borderWidth,control, errors, prefix, index  }) => {
  return (
    <View style={{ width: containerWidth, height: containerHeight,flex:1,borderColor,borderWidth }}>
      {Object.keys(schemaPagina).map((riga, rigaIndex) => (
        <View key={rigaIndex} style={styles.riga}>
          {schemaPagina[riga].map((item, itemIndex) => (
              <View   key={itemIndex}                 
                    style={{justifyContent:'center',                       
                          width: item.layout.width,
                          height:item.layout.height,
                          marginRight: item.layout.margineDx,               
                          marginLeft: item.layout.margineSx,  }}>
                          
                  <Text style={{fontFamily:'Roboto-Regular',
                                color:item.layout.labelColor ?item.layout.labelColor : 'blue',
                                fontSize: Platform.OS ==='web' ? 13 : 16 }}>
                      {item.label} 
                  </Text>

                  <TextInput
                    style={{fontFamily:'Roboto-Medium', padding:5,
                            fontSize: Platform.OS ==='web' ? 16 : 18,                
                            height:item.layout.height ?item.layout.height : 40, 
                            borderColor:item.layout.bordoColor ?item.layout.bordoColor : 'lightgray', 
                            borderWidth:item.layout.bordoWidth ?item.layout.bordoWidth : 1,
                            color:item.layout.inputColor ?item.layout.inputColor : 'black'}}/>
              </View>
            ))}
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  riga: {
    flexDirection: 'row',
    marginBottom: Platform.OS ==='web' ? '2%' : '7%'
  },
 
});

export default FormDinamico;