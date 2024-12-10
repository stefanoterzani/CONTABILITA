import { Platform, Text, View, TextInput,StyleSheet } from 'react-native';
import React from 'react'
import InputField from '../components/inputField'; 

import ElencoDiscesa from '../components/ElencoDiscesa'; // Assicurati di avere il percorso corretto

export const filtraDatiSchema = (schema, data) => {
    const datiFiltrati = Object.keys(schema).reduce((acc, key) => {
        if (schema[key]) {
           if (typeof data[key] === 'object' && !Array.isArray(data[key])) {
            acc[key] = Object.keys(data[key]).reduce((subAcc, subKey) => {
              if (schema[key][subKey]) {
                subAcc[subKey] = data[key][subKey];
              }
              return subAcc;
            }, {});
          } else {
            acc[key] = data[key];
          }
        }
        return acc;
       
      }, {});
      return datiFiltrati;
}

export const raggruppaSchemaPerRighe = (fields) => {
    const rows = {};
    fields.forEach(([name, field]) => {
      const layout =  (Platform.OS === 'web' ? field.layout.web  : field.layout.mobile)                         
      const row = layout.row || 1;
      if (!rows[row]) {
        rows[row] = [];
      }
      rows[row].push([name, field.label,field.type, field.obbligatorio, layout,]);
    
      });
   
   // console.log('Rows:', JSON.stringify(rows, null, 2)); // Loggare i campi interni in modo dettagliato
    return rows;
  };


  export const renderFields = (rowFields, control, errors, prefix = '',inputStile) => {
  //  console.log('ROWS:', JSON.stringify(rowFields, null, 2))
        return rowFields.map(([name, label, type, obbligatorio, layout]) => {
            return (
                
                layout.visibile === true && (
                  <InputField
                      key={prefix ? `${prefix}.${name}` : name} // Aggiungi una chiave unica
                      control={control}
                      name={prefix ? `${prefix}.${name}` : name}
                      field={{ label, type, obbligatorio, layout }}
                       errors={errors}
                      stileInput={inputStile}
                    
                  />
                )
            )
    });
     
   };

 // console.log('ROWS:', JSON.stringify(fields, null, 2));
   

  export const renderCampi = (title, fields, schema, control, errors, styles,  prefix = '') => {
   const rows = raggruppaSchemaPerRighe(fields);
   const inputStile={height:35}
    return (
      <View key={prefix} style={styles.sectionContainer}>
        <Text style={styles.title}>{title}</Text>
        {Object.values(rows).map((rowFields, index) => (
          <View key={`row-${index}`} style={styles.row}>
            {renderFields(rowFields, control, errors, prefix,inputStile)}
          </View>
        ))}
      </View>
    );
  };




  export const impostaValoriCampiNonVisibili = (schema, setValue) => {
    Object.keys(schema).forEach((key) => {
      const field = schema[key];
    // console.log('KEY', key);
    if (field.layout) {
      const layout = Platform.OS === 'web' ? field.layout.web : field.layout.mobile;
      if (!layout.visibile) {
        setValue(key, field.defaultValue || '');
      }
    }
    });
  };

  const styles = StyleSheet.create({
 
});