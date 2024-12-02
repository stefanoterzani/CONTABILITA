import { Platform,StyleSheet, Text, View ,TouchableOpacity,FlatList,Modal,Button} from 'react-native'
import React, { useEffect, useContext,useState,useRef } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context'
import { useRouter } from 'expo-router';
import FontAwesome from '@expo/vector-icons/FontAwesome';

import { AuthContext } from '../../context/AuthContext';
import Header from '../../components/Header';
import Footer from '../../components/Footer'
import { getFooterIcons } from '../../config/footerIconsConfig';
import menuConfig from '../../config/menuConfig.json';
import Menu from '../../components/Menu'
import {useFornitori} from '../../context/FornitoriContext';
import ModalAnagrafica from '../../components/ModalAnagrafica';

const menuFornitori = () => {
  const { Fornitori, fetchFornitori } = useFornitori(); 

  const { dataUser } = useContext(AuthContext);
  const [modalVisibile,setModalVisibile]=useState(false);
  const [FornitoreSelezionato,setFornitoreSelezionato]=useState(null);
    const router = useRouter();
    const modalRef = useRef(null); 
    const unreadMessages = 5; // Numero di messaggi non letti
  const footerIcons = getFooterIcons('Home', router, unreadMessages);
  const menuItems = menuConfig.menuFornitori; // Configurazione del menu per la home
  const [activeItem, setActiveItem] = useState(null);
 
    useEffect(() => {
      console.log('fetchFornitori',Fornitori);
      fetchFornitori (dataUser.idAzienda); 
    }, [dataUser.idAzienda]);
    
    const handleIconPress = () => {
      // Naviga alla schermata principale
      router.push('/home'); // Assicurati che la route '/home' esista
      console.log('Ho premuto l\'icona Home sul header di Menu Fornitori');
    };
 
    const renderFlat = ({ item }) => {
   //   const DataCreazioneFormattata = item.dataCreazione ? format(new Date(item.dataCreazione), 'dd/MM/yyyy HH:mm') : '';
   //   const DataAggiornamentoFormattata = item.dataAggiornamento ? format(new Date(item.dataAggiornamento), 'dd/MM/yyyy HH:mm') : '';
      
      
      return (
      
       <View style={{alignItems:'center'}}>
     
            <TouchableOpacity 
                style={[
                  styles.item,
                  FornitoreSelezionato === item.id && styles.activeItem
                  ]} 
                  onPress={()=>{
                    // Gestisci il toggle della selezione del Fornitore
                      if (FornitoreSelezionato === item.id) {
                        setFornitoreSelezionato(null); // Deseleziona se già selezionato
                      } else {
                        setFornitoreSelezionato(item.id); // Seleziona il Fornitore
                      }
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
                            console.log('Premuto occhio')
                            setFornitoreSelezionato(item);
                            setModalVisibile(true)
                            }} >
                        <FontAwesome name="eye" size={24} color="lightgrey" />
                    </TouchableOpacity>
                </View>  
                  
            </TouchableOpacity>
      
    
        </View>
       
      )
        
    };


   
   
   
    
  return (
      
    <SafeAreaView style={styles.container}> 
  
      <View  style={Platform.OS === 'web' ? styles.webContainer : styles.mobileContainer}> 
          <Header 
            screenName="Menu Fornitori" 
            icon="home" // Nome dell'icona da visualizzare (es. 'add', 'menu', ecc.)
            onIconPress={handleIconPress} // Funzione da eseguire quando l'icona viene premuta
          />
       
          <View  style={styles.flatListContainer}>       
               <FlatList
                 data={Fornitori}
                 renderItem={renderFlat}
                 keyExtractor={(item) => item.id}  
                 extraData={activeItem}
                 />
          </View>
 
          <Menu menuItems={menuItems} />
          <Footer icons={footerIcons} />
      </View>
     
      <ModalAnagrafica
        visible={modalVisibile}
        onClose={() => setModalVisibile(false)}
        record={FornitoreSelezionato}
      />
     
  </SafeAreaView>


  )
}

export default menuFornitori

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
  activeItem:{
    backgroundColor: 'rgba(0, 26, 255,0.1)',
    borderWidth: 0,
    borderColor: 'blue',
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