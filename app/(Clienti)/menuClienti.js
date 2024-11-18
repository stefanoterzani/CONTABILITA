import { Platform,StyleSheet, Text, View ,TouchableOpacity,FlatList,Modal,Button} from 'react-native'
import React, { useEffect, useContext,useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context'
import { useRouter } from 'expo-router';
import { useClienti } from '../../context/Clienti/ClientiContext'; // I
import { AuthContext } from '../../context/AuthContext';
import { ScrollView } from 'react-native-gesture-handler';
import { format } from 'date-fns'; // Importa la libreria date-fns
import { schemaCliente } from '../../context/Clienti/schemiClienti';

const menuClienti = () => {
  const { clienti, fetchClienti } = useClienti(); // Usa il contesto
  const { dataUser } = useContext(AuthContext);
  const [modalVisibile,setModalVisibile]=useState(false);
  const [clienteSelezionato,setClienteSelezionato]=useState(null);
    const router = useRouter();

    useEffect(() => {
      fetchClienti(dataUser.idAzienda); // Recupera i clienti quando il componente viene montato
    }, [dataUser.idAzienda]);

    const renderItem = ({ item }) => {
      const DataCreazioneFormattata = item.dataCreazione ? format(new Date(item.dataCreazione), 'dd/MM/yyyy HH:mm') : '';
      const DataAggiornamentoFormattata = item.dataAggiornamento ? format(new Date(item.dataAggiornamento), 'dd/MM/yyyy HH:mm') : '';
      return (
       <View style={{alignItems:'center'}}>
            <TouchableOpacity style={styles.item} 
                  onPress={()=>{
                    setClienteSelezionato(item);
                    setModalVisibile(true);
                  }}>          
                <View style={styles.row}>
                  <Text style={styles.label}>Nome:</Text> 
                  <Text style={styles.valore}>{item.nome}</Text> 
                </View>

                <View style={styles.row} >
                  <Text style={styles.label}>PartitaIva:</Text>     
                  <Text style={styles.valore}>{item.partitaIva}</Text>  
                </View>  
                <View style={styles.row} >
                  <Text style={styles.label}>IdCreatore:</Text>     
                  <Text style={styles.valore}>{item.idCreatore}</Text>  
                </View>  
                <View style={{flexDirection:'row'}}>  
                    <View style={styles.row} >
                      <Text style={styles.label}>DataCreazione:</Text>     
                      <Text style={styles.valore}>{DataCreazioneFormattata}</Text>  
                    </View>  
                    <View style={[styles.row,{marginLeft:20}]} >
                      <Text style={styles.label}>DataAggiornamento:</Text>     
                      <Text style={styles.valore}>{DataAggiornamentoFormattata}</Text>  
                    </View> 
                </View>        
            </TouchableOpacity>
        </View>
      )
    };
    const renderModalContent = () => {
      if (!clienteSelezionato)  return null;
            
      return Object.keys(schemaCliente).map((key) => {
        const field = schemaCliente[key];
        if (!field) return null;
        if (typeof clienteSelezionato[key] === 'object' && !Array.isArray(clienteSelezionato[key])) {
          return (
            <View key={key} style={styles.modalSection}>
              <Text style={styles.modalSectionTitle}>{key}</Text>
              {Object.keys(schemaCliente[key]).map((subKey) => (
                <View key={`${key}.${subKey}`} style={styles.modalRow}>
                  <Text style={styles.modalLabel}>{field[subKey]?.label || subKey}:</Text>
                  <Text style={styles.modalValore}>
                  
                  {schemaCliente[key][subKey]?.type === 'data' && typeof clienteSelezionato[key][subKey] === 'string' && clienteSelezionato[key][subKey].includes('T')
                    ? format(new Date(clienteSelezionato[key][subKey]), 'dd/MM/yyyy HH:mm')
                    : clienteSelezionato[key][subKey]}
                    </Text>
                </View>
              ))}
            </View>
          );
        }
  
        return (
          <View key={key} style={styles.modalRow}>
            <Text style={styles.modalLabel}>{field.label}:</Text>
            <Text style={styles.modalValore}>
              {field.type === 'data' && typeof clienteSelezionato[key] === 'string' && clienteSelezionato[key].includes('T')
                ? format(new Date(clienteSelezionato[key]), 'dd/MM/yyyy HH:mm')
                : clienteSelezionato[key]}
            </Text>
          </View>
        );
      });
    };

    
    return (
      
  <SafeAreaView style={styles.container}>
      <View  style={Platform.OS === 'web' ? styles.webContainer : styles.mobileContainer}> 
          {/*console.log('CLIENTI',clienti)*/}
          <View  style={{borderColor:'red', borderWidth:1, height:'90%',width:'100%'}}> 
            
                  <FlatList
                    data={clienti}
                    renderItem={renderItem}
                    keyExtractor={(item) => item.id}  />
            
          </View>
     
          <View style={{width:'100%', height:'10%',backgroundColor:'lightblue'}}>        
              <TouchableOpacity 
                  onPress={()=> router.push('/(Clienti)/creaNuovoCliente')} 
                  style={{height:'100%',width:'100%',alignItems:'center',justifyContent:'center'}}>
                  <View style={{width:'20%', backgroundColor:'orange', borderRadius:10}}>
                      <Text style={{textAlign:'center', fontFamily:'Poppins-SemiBold', fontSize:20, color:'white'}}>Nuovo Cliente</Text>
                  </View>
              </TouchableOpacity>
          </View>
      </View>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisibile}
        onRequestClose={() => {
          setModalVisibile(!modalVisibile);
        }}>
         <View style={styles.modalContainer}>
        <View 
         style={Platform.OS === 'web' ? styles.webModalView : styles.mobileModalView} 
        >
          <ScrollView>
            {renderModalContent()}
          </ScrollView>
          <Button title="Chiudi" onPress={() => setModalVisibile(false)} />
        </View>
        </View>
      </Modal>
      
  </SafeAreaView>
  )
}

export default menuClienti

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'lightgray',
    width:'100%',
    height:'100%',  
    alignItems: 'center',
  },
  webContainer:{
    width:'80%',
    height:'100%',
    backgroundColor:'white' , 
    borderColor:'blue', 
    borderWidth:5,
    alignItems:'center'
  },
  mobileContainer:{
    width:'100%',
    height:'100%',
    backgroundColor:'white' , 
    borderColor:'blue', 
    borderWidth:5,
    alignItems:'center'
  },

  outerBox: {
    width: '100%',
    alignItems: 'center', // Centra il contenuto orizzontalmente
  },
    item: {
    padding: 10,
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 5,
    marginBottom: 10,
    width: '95%', // Imposta la larghezza degli item al 95% del box
    // height:50 
  },
  
 
  row: {
    flexDirection: 'row', // Dispone i campi in una riga
    marginBottom: 3, //margine fra le righe dell item
  },
 
 label:{
  fontFamily: 'Poppins-Regular',
  fontSize: 18,
 },
 valore:{
  fontFamily: 'Poppins-SemiBold',
  fontSize: 18,
  marginLeft:10,
 },
 modalContainer: {
  flex: 1,
  justifyContent: 'center',
  alignItems: 'center',
},
 mobileModalView: {
  height: '80%',
  width: '90%',
    margin: 20,
    backgroundColor: 'lightgray',
    borderRadius: 20,
    padding: 35,
 //   alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  webModalView: {
    height: '80%',
    width: '60%',
      margin: 20,
      backgroundColor: 'lightgray',
      borderRadius: 20,
      padding: 35,
   //   alignItems: 'center',
      shadowColor: 'blue',
      shadowOffset: {
        width: 0,
        height: 4,
      },
      shadowOpacity: 0.10,
      shadowRadius: 10,
      elevation: 10,
    },

  modalSection: {
    marginBottom: 20,
  },
  modalSectionTitle: {
    fontWeight: 'bold',
    fontSize: 18,
    marginBottom: 10,
  },
 modalRow:{
 flexDirection: 'row',
  flexWrap: 'wrap',
  marginBottom: 10,
 },
 modalLabel: {
    fontWeight: 'bold',
    fontSize: 16,
    marginRight: 20,
  },
  modalValore: {
    fontSize: 16,
  flexShrink: 1,
  flexBasis: 'auto',
  },
})