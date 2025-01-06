import {Text, View,Platform ,TextInput} from 'react-native'
import React from 'react'
import { Controller } from 'react-hook-form';

const FormDinamicoInput = ({item,itemIndex,etichetta,onFocus,formNumber, control, errors,}) => {

 const fieldName = item.key
  console.log('FORM DINAMICO INPUT fieldNme',fieldName)
  return (
    
    <View>
          {etichetta  && (
            <Text style={{fontFamily:'Roboto-Regular',
                    color:item.layout.labelColor ?item.layout.labelColor : 'blue',
                    fontSize: Platform.OS ==='web' ? 13 : 16 }}>
                {item.label} 
            </Text>
            )}
            <Controller
                 control={control}
                 name={fieldName}
                 defaultValue=""
                 render={({ field: { onChange, onBlur, value } }) => (
                    <TextInput  style={{fontFamily:'Roboto-Medium', padding:5,
                                        fontSize: Platform.OS ==='web' ? 16 : 18,                
                                        height:item.layout.height ?item.layout.height : 40, 
                                        borderColor:item.layout.bordoColor ?item.layout.bordoColor : 'lightgray', 
                                        borderWidth:item.layout.bordoWidth ?item.layout.bordoWidth : 1,
                                        color:item.layout.inputColor ?item.layout.inputColor : 'black'
                                      }}
                                placeholder={!etichetta ? item.label : ''}
                                placeholderTextColor='gray'
                                onBlur={onBlur}
                                onChangeText={onChange}
                                value={value}
                                onFocus={()=> onFocus(item.label,formNumber)}
                      />
                 )}
            />
            {errors[formNumber] && errors[formNumber][item.key] && (
              <Text style={styles.error}>{errors[formNumber][item.key].message}</Text>
            )}
   </View>
  )
}

export default FormDinamicoInput;

