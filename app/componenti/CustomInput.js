import React from 'react';
import { View, Text, TextInput, StyleSheet, Platform } from 'react-native';
import { Controller } from 'react-hook-form';
import { parse, isDate, isValid } from 'date-fns';

const validateDate = (value) => {
  if (!value) return true; // Se il campo non è stato riempito, non applicare la validazione
  const parsedDate = parse(value, 'yyyy-MM-dd', new Date());
  return isDate(parsedDate) && isValid(parsedDate) || 'Data non valida';
};

const validateEmail = (value) => {
  if (!value) return true; // Se il campo non è stato riempito, non applicare la validazione
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(value) || 'Email non valida';
};

const validateNumber = (value) => {
  if (!value) return true; // Se il campo non è stato riempito, non applicare la validazione
  return !isNaN(value) || 'Solo numeri sono ammessi';
};

const CustomInput = ({ control, name, label, layout, rules }) => {
  return (
    <View style={styles.container}>
      <Text style={{ color: layout.labelColor ? layout.labelColor : 'blue', fontSize: Platform.OS === 'web' ? 13 : 16 }}>
        {label}
      </Text>
      <Controller
        control={control}
        rules={rules}
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            style={{
              fontFamily: 'Roboto-Medium',
              padding: 5,
              fontSize: Platform.OS === 'web' ? 16 : 18,
              height: layout.height ? layout.height : 40,
              borderColor: layout.bordoColor ? layout.bordoColor : 'lightgray',
              borderWidth: layout.bordoWidth ? layout.bordoWidth : 1,
              color: layout.inputColor ? layout.inputColor : 'black',
            }}
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
            placeholder={label}
            placeholderTextColor="gray"
            keyboardType={layout.type === 'email' ? 'email-address' : layout.type === 'number' ? 'numeric' : 'default'}
          />
        )}
        name={name}
        defaultValue=""
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    marginBottom: 10,
  },
});

export default CustomInput;