import { Platform,StyleSheet, Text, View ,TouchableOpacity,FlatList,Modal,Button} from 'react-native'
import React, { useEffect, useContext,useState,useRef } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context'
import { useRouter } from 'expo-router';
import { useClienti } from '../../context/Clienti/ClientiContext'; // I
import { AuthContext } from '../../context/AuthContext';
import { ScrollView } from 'react-native-gesture-handler';
import { format } from 'date-fns'; 
import { schemaCliente } from '../../context/Schemi/schemiClienti';
import BottoneModerno from '../../components/BottoneModerno';
import Header from '../../components/Header';
import Footer from '../../components/Footer'
import { getFooterIcons } from '../../config/footerIconsConfig';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import menuConfig from '../../config/menuConfig.json';
import Menu from '../../components/Menu'


const menuClienti = () => {
  const { clienti, fetchClienti } = useClienti(); 
  const { dataUser } = useContext(AuthContext);
  const [modalVisibile,setModalVisibile]=useState(false);
  const [clienteSelezionato,setClienteSelezionato]=useState(null);
    const router = useRouter();
    const modalRef = useRef(null); 
    const unreadMessages = 5; // Numero di messaggi non letti
  const footerIcons = getFooterIcons('Home', router, unreadMessages);
  const menuItems = menuConfig.menuClienti; // Configurazione del menu per la home
  const [activeItem, setActiveItem] = useState(null);

    useEffect(() => {
      console.log('fetchClienti',clienti);
      fetchClienti (dataUser.idAzienda); 
    }, [dataUser.idAzienda]);
    
    const handleIconPress = () => {
      // Naviga alla schermata principale
      router.push('/home'); // Assicurati che la route '/home' esista
      console.log('Ho premuto l\'icona Home sul header di Menu Clienti');
    };
 
    const renderFlat = ({ item }) => {
   //   const DataCreazioneFormattata = item.dataCreazione ? format(new Date(item.dataCreazione), 'dd/MM/yyyy HH:mm') : '';
   //   const DataAggiornamentoFormattata = item.dataAggiornamento ? format(new Date(item.dataAggiornamento), 'dd/MM/yyyy HH:mm') : '';
      
      
      return (
      
       <View style={{alignItems:'center'}}>
     
            <TouchableOpacity style={styles.item} 
                  onPress={()=>{
                    
                  }}>
                <View style={{flexDirection:'row'}}> 
                    <View style={{width:'90%',borderColor:'red',borderWidth:0}}>                   
                        <View style={styles.row} >
                            <Text style={styles.valore}>{item.nome}</Text> 
                            <View style={{borderColor:'black',borderWidth:0,width:'18%'}}>
                              <Text style={styles.valore}>{item.partitaIva}</Text> 
                            </View>
                        </View> 
                    </View>  

                    <TouchableOpacity  style={styles.occhio}
                          onPress={()=>{
                            setClienteSelezionato(item);
                            setModalVisibile(true)}} >
                        <FontAwesome name="eye" size={24} color="lightgrey" />
                    </TouchableOpacity>
              
                </View>  
                  
            </TouchableOpacity>
      
    
        </View>
       
      )
        
    };


   
    const renderModalContent = () => {
    
      if (!clienteSelezionato)  return null;
           
      return Object.keys(schemaCliente).map((key,index) => {
        const field = schemaCliente[key];
        if (!field) return null;
        if (typeof clienteSelezionato[key] === 'object' && !Array.isArray(clienteSelezionato[key])) {
          return (
            <View key={key}>
              <View style={styles.modalSection}>
                <Text style={styles.modalSectionTitle}>{key}</Text>
                {Object.keys(schemaCliente[key]).map((subKey, subIndex) => (
                  <View key={`${key}.${subKey}`}>
                  <View style={subIndex % 2 === 0 ? styles.modalRowEven : styles.modalRowOdd}>
                      <Text style={styles.modalLabel}>{field[subKey]?.label || subKey}:</Text>
                      <Text style={styles.modalValore}>
                        {schemaCliente[key][subKey]?.type === 'data' && typeof clienteSelezionato[key][subKey] === 'string' && clienteSelezionato[key][subKey].includes('T')
                          ? format(new Date(clienteSelezionato[key][subKey]), 'dd/MM/yyyy HH:mm')
                          : clienteSelezionato[key][subKey]}
                      </Text>
                    </View>
                  </View>
                )
                )}
              </View>
  {/*             
              {index < Object.keys(schemaCliente).length - 1 && <View style={styles.separator} />}

              */}            
            </View>
          );
         
        }
       
  
        return (
          <View key={key}>
          <View style={index % 2 === 0 ? styles.modalRowEven : styles.modalRowOdd}>
            <Text style={styles.modalLabel}>{field.label}:</Text>
            <Text style={styles.modalValore}>
              {field.type === 'data' && typeof clienteSelezionato[key] === 'string' && clienteSelezionato[key].includes('T')
                ? format(new Date(clienteSelezionato[key]), 'dd/MM/yyyy HH:mm')
                : clienteSelezionato[key]}
            </Text>
          </View>
 
        </View>
        );
      });

     
    };
   
   
    
  return (
      
    <SafeAreaView style={styles.container}> 
  
      <View  style={Platform.OS === 'web' ? styles.webContainer : styles.mobileContainer}> 
          <Header 
            screenName="Menu Clienti" 
            icon="home" // Nome dell'icona da visualizzare (es. 'add', 'menu', ecc.)
            onIconPress={handleIconPress} // Funzione da eseguire quando l'icona viene premuta
          />
       
          <View  style={styles.flatListContainer}>       
               <FlatList
                 data={clienti}
                 renderItem={renderFlat}
                 keyExtractor={(item) => item.id}  
                 extraData={activeItem}
                 />
          </View>
  {/* 
          <View style={{width:'95%', height:'10%',backgroundColor:'lightblue',
               alignItems:'center',justifyContent:'center'}}>     
                  <TouchableOpacity 
                   onPress={()=> router.push('/(Clienti)/creaNuovoCliente')} 
                   style={{height:'50%',width:'20%',alignItems:'center',justifyContent:'center'}}>
                   <View style={{width:'100%', backgroundColor:'orange', borderRadius:10}}>
                     <Text style={{textAlign:'center', fontFamily:'Poppins-SemiBold', fontSize:20, color:'white'}}>Nuovo Cliente</Text>
                   </View>
                 </TouchableOpacity>
       </View>
       */}
          <Menu menuItems={menuItems} />
          <Footer icons={footerIcons} />
      </View>
     

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisibile}
        onRequestClose={() => {
          setModalVisibile(!modalVisibile);
        }}>
         <View style={styles.modalContainer} ref={modalRef}> 
            
            <View 
              style={Platform.OS === 'web' ? styles.webModalView : styles.mobileModalView}> 
                <View style={{borderTopLeftRadius:20, borderTopRightRadius:20,backgroundColor:'#FFb266' ,height:'8%',width:'100%',
                    alignItems:'center',justifyContent:'center', flexDirection:'row'}}>
                    <Text style={styles.modalTitolo}>DETTAGLIO CLIENTE:</Text>
                    
                </View>
                <View style={{width:'100%',height:'80%',paddingLeft:'2%', borderColor:'red',
                    borderWidth:0,zIndex:99}}> 
                          <ScrollView style={{}}>
                            {renderModalContent()}
                          </ScrollView>
                </View> 
             
                <View style={{ width:'100%', height:'8%', marginTop:'1%',borderColor:'gray',borderTopWidth:1,
                         justifyContent:'center',alignItems:'center',gap:'5%',flexDirection:'row'}}>
                    
                         <BottoneModerno 
                            title="Modifica"
                            coloreTesto='black'
                            onPress={() => console.log('Modifica')}
                            colors={['#000099', '#ffffff','#000099']}
                            width='15%'
                            height='70%'

                            />
                            <BottoneModerno 
                            title="Chiudi"
                             coloreTesto='white'
                            onPress={() =>setModalVisibile(false)}
                            colors={['#003300', '#ffffff','#003300']}
                            width='15%'
                            height='70%'

                            />
                          
                </View>
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
   // borderWidth:5,
    alignItems:'center'
  },
  mobileContainer:{
    width:'100%',
    height:'99%',
    marginTop:'1%',
    backgroundColor:'white' , 
    borderColor:'blue', 
  //  borderWidth:5,
    alignItems:'center'
  },

  flatListContainer:{
    borderColor:'red', 
    borderWidth:0, 
    height:'65%',
    width:'95%',
    marginTop:'2%' 
  },
    item: {
    paddingVertical:2, // Spazio interno dell'item
    borderBottomWidth: 2, // Spessore della riga inferiore
    borderLeftWidth:4,
    borderColor: 'gray',
    borderRadius: 0,
    marginBottom: 5, // Margine inferiore fra gli item
    width: '100%', // Imposta la larghezza degli item al 95% del box
    // height:50 
  },
  
 
  row: {
    flexDirection: 'row', // Dispone i campi in una riga
    marginBottom: 4, //margine fra le righe dell item
    justifyContent: 'space-between', // Distribuisce uniformemente i campi
  },
 
 
 valore:{
  fontFamily: 'Poppins-SemiBold',
  fontSize: 14,
  marginLeft:7,
 },

 occhio:{
  borderColor:'black',
  borderWidth:0,
  width:'10%',
  justifyContent:'center',
  alignItems:'center'
 },

 modalContainer: {
  flex: 1,
  //justifyContent: 'center',
  alignItems: 'center',
  borderWidth:0,
  
 backgroundColor:'rgba(0,0,0,0.5)' 
},
 mobileModalView: {
  height: '80%',
  width: '90%',
  marginTop:'5%',
 //   margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    paddingHorizontal: '5%',
 //   alignItems: 'center',
    elevation: 5,
  },
  webModalView: {
    height: '80%',
    width: '70%',
    marginTop:'5%',
      backgroundColor: 'white',
      borderTopRightRadius: 20,
      borderTopLeftRadius: 20,
      borderColor:'blue',
      borderWidth:0,
   //   paddingHorizontal: '2%',
   //   alignItems: 'center',
         elevation: 10,
    },
modalTitolo:{
fontFamily: 'Poppins-SemiBold',
fontSize: 20,
color:'black',
},
modalTitoloNome:{
fontFamily: 'Poppins-SemiBold',
fontSize: 20,
color:'black',
},

  modalSection: {
    marginBottom: 10,
    
  },
  modalSectionTitle: {
    textAlign:'center',
    fontWeight: 'bold',
    fontSize: 18,
    marginBottom: 10,
  },
 modalRowEven: {
    flexDirection: 'row',
    flexWrap: 'wrap',
   height: 50,
    backgroundColor: 'white', // Colore più chiaro
    alignContent:'center',
    borderBottomColor: 'gray',
    borderLeftColor:'gray',
    borderBottomWidth: 1,
    borderLeftWidth:1,
  },
  modalRowOdd: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    height: 50,
   // marginBottom: 10,
    backgroundColor: 'white', // Colore più scuro
    alignContent:'center',
    borderBottomColor: 'gray',
    borderBottomWidth: 1,
    borderLeftColor:'gray',
    borderLeftWidth:1,
  
  },
 modalLabel: {
  
    fontFamily: 'Poppins-Regular',
    fontSize: 16,
    marginLeft:10,
    marginRight:10,
  //  marginRight: 20,
  },
  modalValore: {
    fontSize: 16,
    fontFamily: 'Poppins-Bold',
  flexShrink: 1,
  color:'blue',
  flexBasis: 'auto',

  },
  separator: {
    height: 1, // Altezza della riga di separazione
    backgroundColor: 'gray', // Colore della riga di separazione
    //marginVertical: 10, // Spazio verticale intorno alla riga di separazione
  },
})