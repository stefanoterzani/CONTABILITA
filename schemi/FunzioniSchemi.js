import { Platform,StyleSheet, Text, View } from 'react-native'
import React from 'react'
import InputField from '../components/inputField'; 
import { setSyntheticLeadingComments } from 'typescript';

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
 //  console.log('Fields:', JSON.stringify(fields, null, 2)); // Loggare i campi interni in modo dettagliato
    fields.forEach(([name, field]) => {

      const layout =  (Platform.OS === 'web' ? field.layout.web  : field.layout.mobile)                         
      const row = layout.row || 1;
      if (!rows[row]) {
        rows[row] = [];
      }
      rows[row].push([name, field.label,field.type, field.obbligatorio, layout]);
    
      });
   
   // console.log('Rows:', JSON.stringify(rows, null, 2)); // Loggare i campi interni in modo dettagliato
    return rows;
  };


  export const renderFields = (rowFields, control, errors, prefix = '',inputStile) => {
   // console.log('STYLE INPUT renderfilds' , inputStile);
    return rowFields.map(([name, label, type, obbligatorio, layout]) => (
      layout.visibile === true &&  
        <InputField
          key={name}
          control={control}
          name={prefix ? `${prefix}.${name}` : name}
          field={{ label, type, obbligatorio, layout }}
          errors={errors}
          stileInput={inputStile}
      />
    
    ));
  };
  

  export const renderCampi = (title, fields, schema, control, errors, styles,  prefix = '') => {
  
    const rows = raggruppaSchemaPerRighe(fields);

    //************************************************************************ */
   const inputStile={height:35}
    //************************************************************************ */
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
    // console.log('KEY', key);
      if (schema[key].layout && !schema[key].layout.visibile) {
        setValue(key, schema[key].defaultValue || '');
      }
    });
  };