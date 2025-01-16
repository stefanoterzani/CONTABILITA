import {Text, View,Platform ,TextInput} from 'react-native'
import React from 'react'

import { Controller, useFormContext } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import  {selectFormData } from '../../redux/selectors'
import { setFieldValue } from '../../redux/slice/formSlice';



const FormDinamicoInput = ({
  item,
  etichetta,
  formNumber, 
  handleEvent,
  initialDataForm

}) => {

//  console.log('FORM DINAMICO INPUT ITEM:',item.key)
 // console.log('FORM DINAMICO INPUTinitialDataForm:',initialDataForm)
 const dispatch = useDispatch();
 const formData = useSelector((state) => selectFormData(state, formNumber));
 const { control, formState: { errors } } = useFormContext();

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
            name={`${formNumber}.${item.key}`}
            control={control}
            defaultValue={initialDataForm[`${formNumber}.${item.key}`] || ''}
            render={({ field: { onChange, onBlur, value, ref }})=>(
                      <TextInput style={{
                            fontFamily:'Roboto-Medium', 
                            padding:5,
                            fontSize: Platform.OS ==='web' ? 16 : 18,                
                            height:item.layout.height ?item.layout.height : 40, 
                            borderColor:item.layout.bordoColor ?item.layout.bordoColor : 'lightgray', 
                            borderWidth:item.layout.bordoWidth ?item.layout.bordoWidth : 1,
                            color:item.layout.inputColor ?item.layout.inputColor : 'black'}}
                            placeholder={!etichetta ? item.label : ''}
                            placeholderTextColor='gray'

                            onFocus={(e) =>{
                                handleEvent(formNumber, 'focus', item.key, value,item)
                            }}
                            onBlur={(e) => {
                                handleEvent(formNumber, 'blur', item.key, value,item);
                                onBlur(e);
                              }}
                            onChangeText={(text) => {
                                onChange(text);
                                dispatch(setFieldValue({ formNumber, name: item.key, value: text,item }));
                                handleEvent(formNumber, 'change', item.key, text,item);
                          }}

                        value={value}
                        ref={ref}                       
                      />
            )}
        />
        {errors[item.key] && <Text>{errors[item.key].message}</Text>}  
   </View>
  )
}

export default FormDinamicoInput

/* <TextInput style={{fontFamily:'Roboto-Medium', padding:5,
                    fontSize: Platform.OS ==='web' ? 16 : 18,                
                    height:item.layout.height ?item.layout.height : 40, 
                    borderColor:item.layout.bordoColor ?item.layout.bordoColor : 'lightgray', 
                    borderWidth:item.layout.bordoWidth ?item.layout.bordoWidth : 1,
                    color:item.layout.inputColor ?item.layout.inputColor : 'black'}}
                    placeholder={!etichetta ? item.label : ''}
                    placeholderTextColor='gray'
                    onFocus={()=> onFocus(item.label,formNumber)}
            /> */