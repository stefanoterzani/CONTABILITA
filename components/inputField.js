import React, { useEffect } from 'react';
import { Controller, useFormContext } from 'react-hook-form';
import { View, Text, TextInput, StyleSheet, Platform } from 'react-native';

const InputField = ({ control, name, field, errors}) => {
//  console.log('InputField:', JSON.stringify(field, null, 2));
const { setValue } = useFormContext();

useEffect(() => {
  if (!field.layout.visibile) {
    // Imposta il valore del campo non visibile
    setValue(name, field.defaultValue || '');
  }
}, [field.layout.visibile, name, setValue, field.defaultValue]);

if (!field.layout.visibile) {
  return null; // Non renderizzare il campo se non è visibile
}


const placeholder = field.obbligatorio ? `${field.label} (obbligatorio)` : field.label;

  return (
    <View style={[styles.fieldContainer,{width:field.layout.width, marginRight:field.layout.margineDx}]}>
     
      <Controller
        control={control}
        name={name}
        rules={{ required: field.obbligatorio }}
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            style={[styles.input, Platform.OS === 'android' && { textAlignVertical: 'center' }]}
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
            placeholder={placeholder}
            keyboardType={field.type === 'email' ? 'email-address' : 'default'}
          

          />
        )}
       
        defaultValue=""
      />
      {errors[name] && <Text style={styles.errorText}>Questo campo è obbligatorio.</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  fieldContainer: {
    marginBottom: 15,
    width: '100%',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    fontSize: 16,
    fontFamily:'Poppins-Regular',
    color:'blue',
    borderRadius: 5,
    height: 50,
 
   // width: '100%',
  },
  errorText: {
    color: 'red',
    marginTop: 5,
  },
});

export default InputField;


/*

import React, { useEffect } from 'react';
import { Controller ,useFormContext } from 'react-hook-form';
import { View, Text, TextInput, StyleSheet, Platform } from 'react-native';

const InputField = ({ control, name, label, type, rules, errors, placeholder, field }) => {
  console.log('INPUT FIELD',field);
  const { setValue } = useFormContext();

  if (!field.layout.visibile) {
    return null; // Non renderizzare il campo se non è visibile
  }

  useEffect(() => {
    if (!field.layout.visibile) {
      // Imposta il valore del campo non visibile
      setValue(name, field.defaultValue || '');
    }
  }, [field.layout.visibile, name, setValue, field.defaultValue]);
  
  if (!field.layout.visibile) {
    return null; // Non renderizzare il campo se non è visibile
  }
  
  return (
    <View style={[styles.fieldContainer,{width:field.layout.width, marginRight:field.layout.margineDx}]}>
     
      <Controller
        control={control}
        name={name}
        rules={rules}
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            style={[styles.input, Platform.OS === 'android' && { textAlignVertical: 'center' }]}
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
            placeholder={placeholder}
            keyboardType={field.type === 'email' ? 'email-address' : 'default'}
          

          />
        )}
       
        defaultValue=""
      />
      {errors[name] && <Text style={styles.errorText}>Questo campo è obbligatorio.</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  fieldContainer: {
    marginBottom: 15,
    width: '100%',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    fontSize: 16,
    fontFamily:'Poppins-Regular',
    color:'blue',
    borderRadius: 5,
    height: 50,
 
   // width: '100%',
  },
  errorText: {
    color: 'red',
    marginTop: 5,
  },
});

export default InputField;
*/