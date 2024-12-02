import React, { useContext, useEffect, useState,useRef } from 'react';
import { FlatList,Platform,View, Text, Button, StyleSheet, Pressable, Image ,TouchableOpacity, SafeAreaView} from 'react-native';
import { AuthContext } from '../context/AuthContext';
import { useRouter } from 'expo-router';
import { MaterialIcons, MaterialCommunityIcons, FontAwesome } from '@expo/vector-icons';
import {  query, where, doc, getDoc, getDocs, setDoc, deleteDoc, collection, addDoc  } from 'firebase/firestore';
import { db } from '../firebaseConfig';
import { creaAziendaVuota,getAzienda ,registraAccessoUtente} from '../context/Azienda/FunzioniAzienda';
import Modal from 'react-native-modal';
import { Audio } from 'expo-av'; // Importa correttamente Audio da expo-av
import { useAzienda } from '../context/Azienda/AziendaContext'; // Importa il contesto

export default function Home() {
  const [piattaforma,setPiattaforma] = useState(Platform.OS);
  const { datiAzienda, setDatiAzienda } = useAzienda(); // Usa il contesto
  const { logoutUser, loading,dataUser,aziendaId} = useContext(AuthContext);
  const [logoURL, setLogoURL] = useState(null);
  const router = useRouter();
  
  const [isModalVisible, setModalVisible] = useState(false);
  const [AzLoading, setAzLoading] = useState(true);
  const unreadMessages = 5; // Numero di messaggi non letti
 
  
  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };
  
  const menu=['AZIENDA', 'CLIENTI','FORNITORI', 'PREVENTIVI','ORDINI', 'FATTURE','PRODOTTI','MAGAZZINO','ACCESSI','USCITE','STATISTICHE','IMPOSTAZIONI'];
  
  const playBeep = async () => {
    const { sound } = await Audio.Sound.createAsync(
      require('../assets/suoni/warning.mp3')
    );
    await sound.playAsync();
  };

  useEffect (() => {
    const fetchData = async () => {
    if (!dataUser) {
      router.replace('/') 
    } else {
        const Az = await getAzienda(dataUser.idAzienda)
     //  console.log( 'HOME DATI Azienda',Az)
     //  console.log( 'HOME DATI USER',dataUser)
    if (Az) {
      setDatiAzienda(Az);
      setLogoURL(Az.logo);   
    } else {
      console.log('L azienda non esiste');
      toggleModal()
      await creaAziendaVuota(dataUser.idAzienda);
      const newAzienda = await getAzienda(dataUser.idAzienda);
      setDatiAzienda(newAzienda);
      setLogoURL(newAzienda.logo);
    }
   }
   setAzLoading(false);
  }
    fetchData();

    if (dataUser) {
    //  registraAccessoUtente(dataUser.idAzienda, dataUser.idUser, 'home');
    }
  }, [dataUser]);


   
  const handleLogout = async () => {
    console.log('Logout');
    await logoutUser();
    router.replace('/');
  };

  if (loading) {
    return (
      <View style={{flex:1, alignItems:'center',justifyContent:'center'}}>
        <Text>Caricamento...</Text>
      </View>
    );
  }

  const renderItem = ({ item }) => (
    <View style={styles.menuItemBox}>
        <TouchableOpacity onPress={() => router.push(`/${item.toLowerCase()}/menu${item}`)}>
          <Text style={styles.menuText}>{item}</Text>
        </TouchableOpacity>
    </View>
  );
  const flatListRef = useRef(null);

  const scrollToIndex = (index) => {
    flatListRef.current.scrollToIndex({ animated: true, index });
  };

  return (
    <SafeAreaView style={{flex:1,width:'100%',height:'100%'}} >
      <View>
 {/* icone setting e logout */}
        <View style={styles.header}>         
            <Pressable onPress={()=> { router.push('/(SettingAzienda)/MenuSetting')   }} >                     
                <MaterialIcons name="settings" size={30} color="black" style={{marginLeft:10}} />
            </Pressable>
            
            <View style={styles.userInfo}>
                <Text style={styles.welcomeText}>Benvenuto {dataUser?.nome} </Text>
                <Text style={styles.userQualification}>{dataUser?.qualifica} </Text>           
            </View>

            <View >
                <Pressable  onPress={handleLogout} >
                   <MaterialCommunityIcons name="logout" size={30} color="black" style={{marginRight:10}} />
                </Pressable>
            </View>
        </View>

        <View style={styles.companyInfo}>     
            {logoURL ? <Image source={{ uri: logoURL }} style={styles.logo} /> : <Text>Logo non disponibile</Text>}
            <View style={styles.companyDetails} >          
                  <Text style={styles.companyName}>{datiAzienda ? datiAzienda.nome : 'Azienda Nuova' }</Text>
                  <Text style={styles.companyPiva}>{datiAzienda ? datiAzienda.partitaIva : '' }</Text>             
            </View>
         </View>


          <View style={styles.newsContainer}>
            <View  style={styles.newsSection}>
                <Text style={styles.newsTitle}>Area notizie Mondo</Text>
            </View>
            <View style={styles.newsSection}>
                <Text style={styles.newsTitle}>Area notizie Italia</Text> 
            </View>
          </View>

        
         {/* Box fisso a fondo pagina */}
      <View style={styles.footer}>
          <View style={{width:'100%', height:'50%', borderColor:'blue' , borderWidth:1, flexDirection:'row',alignItems:'center',justifyContent:'center'}}>
     
              <Pressable onPress={() => scrollToIndex(0)} style={styles.arrowButton}>
                <MaterialIcons name="arrow-back-ios-new" size={24} color="black" />
              </Pressable>
       
              <View style={styles.menuBox}>
                <FlatList
                 ref={flatListRef}
                  data={menu}
                  renderItem={renderItem}
                  keyExtractor={(item) => item}
                  horizontal
                  showsHorizontalScrollIndicator={false}
                />
              </View>
       
              <Pressable onPress={() => scrollToIndex(menu.length - 1)} style={styles.arrowButton}>
                <MaterialIcons name="arrow-forward-ios" size={24} color="black" />
              </Pressable>
          
          </View>
        <View style={styles.iconBox}>
          <Pressable onPress={() => { router.push('/(SettingAzienda)/MenuSetting') }}>
          <MaterialIcons name="settings" size={piattaforma === 'web' ? 24 : 30} color="black" />
          </Pressable>
          {/* Icona campana con numero di messaggi */}
          <View style={styles.bellContainer}>
          <FontAwesome name="bell" size={piattaforma === 'web' ? 24 : 30} color="black" />
            {unreadMessages > 0 && (
              <View style={styles.badge}>
                <Text style={styles.badgeText}>{unreadMessages}</Text>
              </View>
            )}
          </View>
        </View>
      </View>
    
      <Modal
        isVisible={isModalVisible}
        onBackdropPress={toggleModal}
        animationIn="slideInUp"
        animationOut="slideOutDown"
        backdropOpacity={0.5} // Riduci l'opacità dello sfondo
        style={styles.modal}
      >
        <View style={styles.modalContent}>
          <Text style={styles.errorText}>La tua Azienda non esiste ancora </Text>
          <Button title="Chiudi" onPress={toggleModal} />
        </View>
      </Modal>
     
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  
  Webcontainer: {
      flex: 1,
      height: '100%',
      width:'80%',
      alignItems:'center',
     // justifyContent:'center',
      borderColor:'red',
      borderWidth:2,
    //  padding: 20,
    },
  Mobilecontainer: {
    flex: 1,
    height: '100%',
    width:'100%',
    alignItems:'center',
  //  padding: 10,
  },
  header: {
    flexDirection: 'row',
    width: '100%',
    height: '10%',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor:'rgb(98, 185, 207)',
    paddingHorizzontal:40,
    borderColor:'red',
    borderWidth:1,
 
  
  },
  userInfo: {
    alignItems: 'center',
    justifyContent: 'center',
    width: '80%',
    height: '95%',
    borderColor: 'red',
    borderWidth: 0,
  },
  welcomeText: {
    fontFamily: "Poppins-Bold",
    fontSize: 25,
  },
  userQualification: {
    marginLeft: 10,
    fontFamily: "Poppins-Regular",
    fontSize: 18,
  },
  companyInfo: {
    flexDirection: 'row',
    borderColor: 'red',
    borderWidth: 0,
    width: '95%',
    alignItems: 'center',
    marginTop: 10,
  },
    companyDetails: {
    flex: 1,
  },
  companyName: {
    fontFamily: "Poppins-Bold",
    fontSize: 20,
    marginLeft:10,
   // textAlign: 'center',
    flexWrap: 'wrap',
  },
  companyPiva: {
    fontFamily: "Poppins-Regular",
    fontSize: 16,
    flexWrap: 'wrap',
    marginLeft:10,
  },
   logo: {
    width: 70,
    height: 70,
  //  marginVertical: 30,
    marginLeft:10,
    borderRadius: 100,
  },
  newsContainer: {
    width: '95%', // Imposta la larghezza al 95%
    alignItems: 'center',
    height: '55%',
    marginTop: 20,
    borderColor: 'red',
    borderWidth: 1,
  },
  newsSection: {
    flexDirection: 'column',
   // marginTop: '1%',
    width: '100%', // Imposta la larghezza al 100% del contenitore delle notizie
    height: '50%',
    borderColor: 'blue',
    borderWidth: 1,
    alignItems: 'center',
  },
  modal: {
    justifyContent: 'center',
    margin: 0,
   
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
  },
footer: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    height:'18%',
    alignItems: 'center',
  //  padding: 10,
  justifyContent: 'space-between',
  //  backgroundColor: 'rgb(98, 185, 207)',
  paddingBottom: Platform.OS === 'ios' ? 20 : 0, // Aggiungi padding extra per iOS
 // paddingHorizontal:40,
  borderColor:'red',
  borderWidth:1
  },
  menuBox: {
   flexDirection: 'row',
    alignItems: 'center',
   justifyContent: 'center',
    width: '85%',
 //  marginBottom: 10, // Aggiungi margine inferiore per separare il riquadro dei menu dalle icone
  height:'60%',
  borderColor:'blue',
  borderWidth:1,
 
  },
  arrowButton: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
  },
  menuItemBox: {
    borderColor: 'green',
    borderWidth: 1,
   // marginVertical: 2, // Aggiungi margine verticale per separare i box
    marginHorizontal: 10, // Aggiungi margine orizzontale per separare i box
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal:10,
    borderRadius: 20,
    height: '100%',
    flex:1,
    backgroundColor: 'rgb(68, 124, 138)',
  },
  menuText: {
    color: 'white',
    fontSize: 14,
    fontWeight: 'bold',
  },
  iconBox: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    height:'38%',
   // marginTop:10,
    paddingHorizontal: 20, // Aggiungi padding orizzontale per spostare le icone verso il centro
    borderColor:'blue',
    borderTopWidth:1,
    backgroundColor: 'rgb(98, 185, 207)',
    
  },

  bellContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  badge: {
    position: 'absolute',
    right: -10,
    top: -5,
    backgroundColor: 'red',
    borderRadius: 10,
    width: 20,
    height: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  badgeText: {
    color: 'white',
    fontSize: 12,
    fontWeight: 'bold',
  },
  });
/*
  <View style={{}}>
  {renderAziendaData(datiAzienda)}
</View>*/
  {/*
          <TouchableOpacity onPress={() => router.push('/(Azienda)/menuAzienda')}>
            <Text style={styles.menuText}>Menu Azienda</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => router.push('/(Accessi)/menuAccessi')}>
            <Text style={styles.menuText}>Menu Accessi</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => router.push('/(Clienti)/menuClienti')}>
            <Text style={styles.menuText}>Menu Clienti</Text>
          </TouchableOpacity>
*/}