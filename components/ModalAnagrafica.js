
import React ,{useState,useEffect} from 'react';
import { View, Text, Modal, ScrollView, StyleSheet,Platform, Pressable } from 'react-native';
import BottoneModerno from './BottoneModerno';
import { format } from 'date-fns';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';

import { schemaCliente } from '../schemi/schemiClienti';
import { schemaFornitore } from '../schemi/schemiFornitori';

const ModalAnagrafica = ({ visible, onClose, record, archivio}) => {
const [schema, setSchema] = useState(null);
const [titolo,setTitolo]=useState('');
useEffect(() => {
    if (archivio === 'clienti') {
      setSchema(schemaCliente);
      setTitolo('DETTAGLIO CLIENTE');
    } else {
        setSchema(schemaFornitore); 
        setTitolo('DETTAGLIO FORNITORE');

    }
},[archivio]);

  const renderModalContent = () => {
    if (!record) return null;

    return Object.keys(schema).map((key, index) => {
      const field = schema[key];
      if (!field) return null;
      if (typeof record[key] === 'object' && !Array.isArray(record[key])) {
        return (
          <View key={key}>
            <View style={styles.modalSection}>
              <Text style={styles.modalSectionTitle}>{key}</Text>
              {Object.keys(schema[key]).map((subKey, subIndex) => (
                <View key={`${key}.${subKey}`}>
                  <View style={subIndex % 2 === 0 ? styles.modalRowEven : styles.modalRowOdd}>
                    <Text style={styles.modalLabel}>{field[subKey]?.label || subKey}:</Text>
                    <Text style={styles.modalValore}>
                      {schema[key][subKey]?.type === 'data' && typeof record[key][subKey] === 'string' && record[key][subKey].includes('T')
                        ? format(new Date(record[key][subKey]), 'dd/MM/yyyy HH:mm')
                        : record[key][subKey]}
                    </Text>
                  </View>
                </View>
              ))}
            </View>
          </View>
        );
      }

      return (
        <View key={key}>
          <View style={index % 2 === 0 ? styles.modalRowEven : styles.modalRowOdd}>
            <Text style={styles.modalLabel}>{field.label}:</Text>
            <Text style={styles.modalValore}>
              {field.type === 'data' && typeof record[key] === 'string' && record[key].includes('T')
                ? format(new Date(record[key]), 'dd/MM/yyyy HH:mm')
                : record[key]}
            </Text>
          </View>
        </View>
      );
    });
  };

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}
    >
      <View style={styles.modalContainer}>
        <View style={Platform.OS === 'web' ? styles.webModalView : styles.mobileModalView}>
          
       
            <View  style={styles.header}>
                <View style={styles.snHeader}></View>
                <View style={styles.centroHeader}>
                    <Text style={styles.modalTitolo}>{titolo}</Text>
                </View>        
                <Pressable 
                    style={styles.dxHeader}
                    onPress={onClose}>                    
                    <MaterialCommunityIcons name="close" size={30} color="black" />
                </Pressable>              
            </View>  
   
        
          <View style={styles.contenitoreLista}>
            <ScrollView>
              {renderModalContent()}
            </ScrollView>
          </View>
          
          </View>
        </View>
     
    </Modal>
  );
};

export default ModalAnagrafica;

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)'
  },
  mobileModalView: {
    height: '80%',
    width: '85%',
    marginTop: '5%',
    backgroundColor: 'white',
    borderRadius: 20,
   // paddingHorizontal: '5%',
    elevation: 5,
  },
  webModalView: {
    height: '80%',
    width: '70%',
    marginTop: '5%',
    backgroundColor: 'white',
    borderTopRightRadius: 20,
    borderTopLeftRadius: 20,
    borderColor: 'blue',
    borderWidth: 0,
    elevation: 10,
  },
  header:{
    width: '100%',
    borderColor:'black',
    borderWidth:0,
    flexDirection:'row',
    justifyContent:'space-between',
    height:'8%',
    borderTopLeftRadius: 20, 
    borderTopRightRadius: 20, 
    backgroundColor:'#FFb266',
    alignItems:'center'
  },
  dxHeader:{
      height:'100%',
      width:'10%',
      borderColor:'blue',
      borderWidth:0,
      justifyContent:'center',
      alignItems:'center',
      flexDirection:'column'
     // backgroundColor:'blue'
    },
    snHeader:{
      width:'10%',
      height:'100%',
      borderColor:'blue',
      borderWidth:0,
      justifyContent:'center',
      alignItems:'center',
    //  backgroundColor:'blue'
    },
 centroHeader:{
      height:'80%',
      borderColor:'blue',
      borderWidth:0,
      justifyContent:'center',
      alignItems:'center',
     
    
    },
    contenitoreLista: {
        marginTop:'1%' ,
        width: '100%', 
        height: '85%', 
        paddingLeft: '2%',
        borderColor: 'red', 
        borderWidth: 0, 
        zIndex: 99
    },
  modalTitolo: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 20,
    color: 'black',
  },
  modalSection: {
    marginBottom: 10,
  },
  modalSectionTitle: {
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 16,
    marginBottom: 10,
  },
  modalRowEven: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    height: 20,
    backgroundColor: 'white',
    alignContent: 'center',
    borderBottomColor: 'lightgray',
    borderLeftColor: 'gray',
    borderBottomWidth: 1,
    borderLeftWidth:4,
    marginBottom:6,
  },
  modalRowOdd: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    height: 20,
    backgroundColor: 'white',
    alignContent: 'center',
    borderBottomColor: 'lightgray',
    borderBottomWidth: 1,
    borderLeftColor: 'gray',
    borderLeftWidth: 4,
    marginBottom:6,
  },
  modalLabel: {
    fontFamily: 'Poppins-Regular',
    fontSize: 14,
    marginLeft: 10,
    marginRight: 10,
  },
  modalValore: {
    fontSize: 14,
    fontFamily: 'Poppins-Bold',
    flexShrink: 1,
    color: 'blue',
    flexBasis: 'auto',
  },
});
