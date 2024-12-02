//import InputField from '../../components/inputField'; // Assicurati che il percorso sia corretto

import React, { useState, useRef, useEffect ,useContext} from 'react';
import { useForm,FormProvider } from 'react-hook-form';
import { View, Button, StyleSheet, ScrollView, Text, Platform } from 'react-native';
import {schemaAzienda } from '../../context/Azienda/schemiAzienda';
import { aggiornaAzienda,getAzienda } from '../../context/Azienda/FunzioniAzienda';
import { AuthContext } from '../../context/AuthContext';
import { useRouter} from 'expo-router';
import { useAzienda } from '../../context/Azienda/AziendaContext'; // Importa il contesto

const InserimentoAzienda = () => {
  const { control, handleSubmit, setValue, getValues, formState: { errors } } = useForm();
  const {dataUser} = useContext(AuthContext);
  const scrollViewRef = useRef(null);
const [piattaforma,setPiattaforma]=useState('');

const router = useRouter();
const { setDatiAzienda } = useAzienda(); // Usa il contesto

  useEffect(() => {
   // console.log('SCHEMA AZIENDA', JSON.stringify(schemaAzienda, null, 2));
    // Inizializza gli stati se necessario
    if (Platform.OS === 'web') {
      setPiattaforma('web');
    } else { setPiattaforma('mobile'); }  
  }, []);


  useEffect(() => {
    if (dataUser.idAzienda) {
      getAzienda(dataUser.idAzienda).then((data) => {
        if (data) {
          Object.keys(data).forEach((key) => {
            setValue(key, data[key]);
          });
        }
      });
    }
  }, [dataUser.idAzienda]);

  const onSubmit = async (data) => {
  //  console.log('Dati inviati:', data); // Log dei dati inviati

    // Rimuovi i campi non più presenti nello schema
    const datiFiltrati = Object.keys(data).reduce((acc, key) => {
      if (schemaAzienda[key]) {
        if (key === 'sedeLegale') {
          acc[key] = Object.keys(data[key]).reduce((subAcc, subKey) => {
            if (schemaAzienda[key][subKey]) {
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

 //   console.log('Dati filtrati:', datiFiltrati); // Log dei dati filtrati

    await aggiornaAzienda(dataUser.idAzienda, datiFiltrati);
    const updatedAzienda = await getAzienda(dataUser.idAzienda);
    setDatiAzienda(updatedAzienda); // Aggiorna il contesto
    router.back();
  };


  const groupFieldsByRow = (fields, platform) => {
    const rows = {};
   
    fields.forEach(([name, field]) => {

      const layout =  (platform === 'web' ? field.layout.web  : field.layout.mobile)                         
      const row = layout.row || 1;
      if (!rows[row]) {
        rows[row] = [];
      }
      rows[row].push([name, field.label,field.type, field.obbligatorio, layout]);
    
      });
   
   // console.log('Rows:', JSON.stringify(rows, null, 2)); // Loggare i campi interni in modo dettagliato
    return rows;
  };




  const renderFields = (rowFields,prefix='') => {
 //console.log('RowFields:', JSON.stringify(rowFields, null, 2));
    return rowFields.map(([name, label, type, obbligatorio, layout]) => (
      layout.visibile === true && 
      <InputField
        key={name}
        control={control}
        name={prefix ? `${prefix}.${name}` : name}
        field={{ label, type, obbligatorio, layout }}
        errors={errors}
      />
    ));


  };

  const renderCampiNormali = () => {
    const filteredFields = Object.entries(schemaAzienda).filter(([name]) => name !== 'sedeLegale');
    const rows = groupFieldsByRow(filteredFields, Platform.OS);

    return (
      <View key="campiNormali" style={styles.sectionContainer}>
        <Text style={styles.title}>Anagrafica</Text>
        {Object.values(rows).map((rowFields, index) => (
          <View key={`row-${index}`} style={styles.row}>
            {renderFields(rowFields)}
          </View>
        ))}
      </View>
    );
    
  };

  const renderSedeLegale = () => {
    const rows = groupFieldsByRow(Object.entries(schemaAzienda.sedeLegale), Platform.OS);
    return (
      <View key="sedeLegale" style={styles.sectionContainer}>
        <Text style={styles.title}>Sede Legale</Text>
        {Object.values(rows).map((rowFields, index) => (
          <View key={`row-${index}`} style={styles.row}>
            {renderFields(rowFields, 'sedeLegale')}
          </View>
        ))}
      </View>
    );
  };



  return (
    <View style={Platform.OS === 'web' ? styles.webContainer : styles.mobileContainer}>
      <ScrollView contentContainerStyle={ styles.scrollContainer} ref={scrollViewRef}>
        {renderCampiNormali()}
       {renderSedeLegale()} 
       
      </ScrollView>

      <View style={Platform.OS === 'web' ? styles.webButtonContainer : styles.mobileButtonContainer} >
       
        <View style={{marginTop:10}}>
          <Button  title="Invia" onPress={handleSubmit(onSubmit)} />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  mobileContainer: {
    flex: 1,
    marginTop: 70,
  },
  webContainer: {
    flex: 1,
    width:'70%',
    borderColor:'red',
    borderWidth:2,
    marginHorizontal:'auto',
    backgroundColor:'white',
  },
  scrollContainer: {
    padding: 20,
    alignItems: 'center',
  },
  sectionContainer: {
    marginBottom: 10,
    width: '100%',
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  subtitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  subFieldContainer: {
    marginBottom: 20,
    paddingLeft: 10,
    borderLeftWidth: 1,
    borderLeftColor: '#ccc',
    width: '100%',
  },
  row: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 0,
  //  justifyContent: 'space-between', // Aggiungi questa linea per distribuire uniformemente i campi
  },
  webButtonContainer: {
    flexDirection: 'row',
    padding: 20,
    borderTopWidth: 1,
    borderTopColor: '#ccc',
    backgroundColor: '#fff',
    width: '100%',
    justifyContent:'space-between',
   
  },
  mobileButtonContainer: {
    flexDirection: 'column',
    padding: 20,
    borderTopWidth: 1,
    borderTopColor: '#ccc',
    backgroundColor: '#fff',
    width: '100%',
   
   
  },
});

export default InserimentoAzienda;