import {Text, View,Platform ,TextInput,StyleSheet,Dimensions} from 'react-native'
import React from 'react'

import { Controller, useFormContext } from 'react-hook-form';

const { width, height } = Dimensions.get('window');

const FormDinamicoInput = ({
  formId,
  field,
  item,
  etichetta,
  handleEvent,
  paginaCorrente,
  tipoInputPagina,
 width,
    
  }) => { 



      const { control, formState: { errors }, getValues } = useFormContext();
      
       //  console.log('FORMID', formId, 'FIELD', field, 'PAGINA CORRENTE',paginaCorrente)
                      //  console.log('CAMPO INPUT',`${formId}.${field}`)
      /*
      if (formId === 1) {    
          //  console.log('CAMPO INPUT',`${formId}.${paginaCorrente}_${field}`)
            console.log('PAGINA CORRENTE',paginaCorrente)
            console.log('CAMPO INPUT',`${formId}.${paginaCorrente}_${field}`,getValues(`${formId}.${paginaCorrente}_${field}`) )
      }
     
      if (formId === 0) {    
           
           // console.log('CAMPO INPUT',`${formId}.${paginaCorrente}_${field}`)
            console.log('CAMPO INPUT',(`${formId}.${field}`) ,getValues(`${formId}.${field}`) )
      }
      */
      // console.log('CAMPO INPUT',`${formId}.${paginaCorrente}_${field}`)
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
          //  name={`${formId}.${paginaCorrente}_${field}`} // Modifica per includere formId nel nome del campo
            name ={tipoInputPagina === 'multipla' 
                  ? `${formId}.${field}` 
                  : `${formId}.${paginaCorrente}_${field}`}
            
            control={control}
           // defaultValue={getValues(`${formId}.${field}`) || ''}
        
           defaultValue={tipoInputPagina === 'multipla' 
                  ? getValues(`${formId}.${field}`) || '' 
                  : getValues(`${formId}.${paginaCorrente}_${field}`) || ''}
            
            rules={{ required: item.obbligatorio && "Campo obbligatorio" 
            // Aggiungi ulteriori regole di validazione qui
            }}
            render={({ field: { onChange, onBlur, value } }) => (
                 
                  <View style={[
            styles.textInputContainer, 
            { 
              width: {width}, 
              height: item.layout.height,
            }
          ]}>
                  <View style={styles.innerShadow}>
                      <TextInput style={{
                            fontFamily:'Roboto-Medium', 
                            padding:5,
                            fontSize: Platform.OS ==='web' ? 16 : 18,                
                            height:item.layout.height ?item.layout.height : 40, 
                            borderColor:item.layout.bordoColor ?item.layout.bordoColor : 'lightgray', 
                            borderWidth:item.layout.bordoWidth ?item.layout.bordoWidth : 0,
                            color:item.layout.inputColor ?item.layout.inputColor : 'black'
                            }}

                            placeholder={!etichetta ? item.label : ''}
                            placeholderTextColor='gray'
                            value={value}
                            onFocus={() => {
                                  handleEvent('focus', formId, field,value, item)} }
                            
                            onBlur={() => {
                                  onBlur();  // Chiamata nativa a onBlur di react-hook-form
                                  handleEvent('blur', formId, field, value, item);
                                  }}
                            
                            onChangeText={(text) => {
                                  onChange(text); // Chiamata nativa a onChange di react-hook-form
                                  handleEvent('change', formId, field, text, item);
                            }}                    
                      />
                      {errors[`${formId}_${field}`] && <Text style={styles.error}>{errors[`${formId}_${field}`]?.message}</Text>}
                  </View>
                  </View>
                
            )}
        />
    </View>
  )
}
/*
const styles = {
      error: {
        color: 'red',
      },
    };
    */
    
    const styles = StyleSheet.create({
      textInputContainer: {
          
            height: 30, // Altezza fissa
           backgroundColor: 'white', // Colore di sfondo chiaro
            borderRadius: 5,
            paddingHorizontal:2,
            paddingVertical: 2,
            shadowColor: 'black', // Ombra scura
            shadowOffset: { width: 2, height: 2 }, 
            shadowOpacity: 0.1,
            shadowRadius: 4,
          },
  innerShadow: {
    flex: 1,
    backgroundColor: '#f0f0f0', // Colore di sfondo chiaro
    borderRadius: 5,
    borderColor: 'white', // Bordo bianco per simulare l'ombra interna
    borderWidth: 1,
    shadowColor: 'black', // Ombra scura
    shadowOffset: { width: 2, height: -2 },
    shadowRadius: 2,
  },
    })
    
export default FormDinamicoInput
