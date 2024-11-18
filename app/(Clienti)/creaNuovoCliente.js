import InputField from '../../components/inputField'; // Assicurati che il percorso sia corretto

import React, { useState, useRef, useEffect ,useContext} from 'react';
import { useForm, FormProvider } from 'react-hook-form';
import { View, Button, StyleSheet, ScrollView, Text, Platform ,Alert} from 'react-native';
import {schemaCliente } from '../../context/Clienti/schemiClienti';
import { addCliente, getClienti } from '../../context/Clienti/FunzioniClienti';
import { AuthContext } from '../../context/AuthContext';
import { useRouter} from 'expo-router';
import { useClienti } from '../../context/Clienti/ClientiContext'; // Importa il contesto

const CreaNuovoCliente = () => {
  const { control, handleSubmit, setValue, formState: { errors } } = useForm();
  const {dataUser} = useContext(AuthContext);
  const scrollViewRef = useRef(null);
  const [piattaforma,setPiattaforma]=useState('');
  const { fetchClienti } = useClienti(); // Usa il contesto
  const router = useRouter();
  const [cliente, setCliente] = useState({}); // Definisci lo stato cliente
  const methods = useForm();
  
  useEffect(() => {
    if (Platform.OS === 'web') {
      setPiattaforma('web');
    } else {
      setPiattaforma('mobile');
    }

    // Imposta i valori dei campi non visibili
    Object.keys(schemaCliente).forEach((key) => {
      console.log('KEY',key)
      if (schemaCliente[key].layout && !schemaCliente[key].layout.visibile) {
        setValue(key, schemaCliente[key].defaultValue || '');
      }
    });
  }, [setValue]);



  const onSubmit = async (data) => {
    try {
      const dataOdierna = new Date().toISOString();
      data.dataCreazione = dataOdierna;
      data.dataAggiornamento = dataOdierna;
      data.idCreatore = dataUser.idUser;
      
      const datiFiltrati = Object.keys(schemaCliente).reduce((acc, key) => {
        if (schemaCliente[key]) {
        //  if (key === 'sedeLegale') {
          if (typeof data[key] === 'object' && !Array.isArray(data[key])) {
            acc[key] = Object.keys(data[key]).reduce((subAcc, subKey) => {
              if (schemaCliente[key][subKey]) {
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

   
   console.log('datiFiltrati:', JSON.stringify(datiFiltrati, null, 2)); // Loggare i campi interni in modo dettagliato
 
    const clienti = await getClienti(dataUser.idAzienda);
    if (clienti.length === 0) {
      // La collezione non esiste, aggiungi il primo cliente
   //   console.log('DATAUSER',dataUser.idAzienda)
      await addCliente(dataUser.idAzienda, datiFiltrati);
    } else {
      // La collezione esiste, aggiungi il cliente
      await addCliente(dataUser.idAzienda, datiFiltrati);
    }

 
    
  fetchClienti(dataUser.idAzienda);

   
  //  await aggiornaCliente(cliente.idCliente, datiFiltrati);
 //   const updatedCliente = await getCliente(cliente.idCliente);
 //   setDatiCliente(updatedCliente); // Aggiorna il contesto
   
    router.back();
  } catch (error) {
    console.error('Errore durante l\'aggiunta del cliente:', error);
    Alert.alert('Errore', 'Si è verificato un errore durante l\'aggiunta del cliente. Riprova.');
  }
  };


  const groupFieldsByRow = (fields, platform) => {
    const rows = {};
 //  console.log('Fields:', JSON.stringify(fields, null, 2)); // Loggare i campi interni in modo dettagliato
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

  const filteredFields = Object.entries(schemaCliente).filter(([name]) => name !== 'sedeLegale');
  
  const rows = groupFieldsByRow(filteredFields, Platform.OS);
 console.log('ROWS',rows); // Loggare i campi interni in modo dettagliato
//console.log('SCHEMA ', JSON.stringify(schemaCliente, null, 2)); // Loggare i campi interni in modo dettagliato
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
    const rows = groupFieldsByRow(Object.entries(schemaCliente.sedeLegale), Platform.OS);
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
    <FormProvider {...methods}>
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
    </FormProvider>
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

export default CreaNuovoCliente;