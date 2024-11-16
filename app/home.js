import React, { useContext, useEffect, useState } from 'react';
import { View, Text, Button, StyleSheet, Pressable, Image ,TouchableOpacity} from 'react-native';
import { AuthContext } from '../context/AuthContext';
import { useRouter } from 'expo-router';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import {  query, where, doc, getDoc, getDocs, setDoc, deleteDoc, collection, addDoc  } from 'firebase/firestore';
import { db } from '../firebaseConfig';
import { creaAziendaVuota,getAzienda ,registraAccessoUtente} from '../context/Azienda/FunzioniAzienda';
import Modal from 'react-native-modal';
import { Audio } from 'expo-av'; // Importa correttamente Audio da expo-av
import { useAzienda } from '../context/Azienda/AziendaContext'; // Importa il contesto

export default function Home() {
  const { datiAzienda, setDatiAzienda } = useAzienda(); // Usa il contesto
  const { logoutUser, loading,dataUser,aziendaId} = useContext(AuthContext);
  const [logoURL, setLogoURL] = useState(null);
  const router = useRouter();
  
  const [isModalVisible, setModalVisible] = useState(false);
  const [AzLoading, setAzLoading] = useState(true);

 
  
  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };
  
  
  
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
       console.log( 'HOME DATI Azienda',Az)
       console.log( 'HOME DATI USER',dataUser)
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




const renderDataUser = (ciccio) => (
  <View style={styles.dataContainer}>
    <Text style={styles.dataTitle}>Dati Utente</Text>
    <Text style={styles.dataText}>Email: {ciccio.email}</Text> 
    <Text style={styles.dataText}>Nome: {ciccio.nome}</Text>
    <Text style={styles.dataText}>Qualifica: {ciccio.qualifica}</Text>
</View>
)

  return (
    <View  style={styles.container}>
        <View style={{flexDirection:'row', justifyContent:'space-between', paddingHorizontal:20}}>
            <View >
                <Pressable onPress={()=> { router.push('/(SettingAzienda)/MenuSetting')   }} >                     
                  <MaterialIcons name="settings" size={30} color="black" />
                </Pressable>
            </View>
            
            <View >
                <Pressable  onPress={handleLogout} >
                   <MaterialCommunityIcons name="logout" size={30} color="black" />
                </Pressable>
            </View>
            
        </View>

        <View style={{flexDirection:'row'}}>
      
          {logoURL ? <Image source={{ uri: logoURL }} style={styles.logo} /> : <Text>Logo non disponibile</Text>}
        </View>
  
        <View style={styles.dati}>
          <View style={{justifyContent:'center'}}>
           <Text style={styles.welcomeText}>Benvenuto {dataUser?.nome}</Text>
           
         </View>   
            <View>
              {renderDataUser(dataUser)}  
            </View>
            {datiAzienda && (
              <View style={styles.dataContainer}>
                <Text style={styles.dataTitle}>Dati Azienda</Text>
                <Text style={styles.dataText}>Nome: {datiAzienda.nome}</Text>
                <Text style={styles.dataText}>Partita IVA: {datiAzienda.partitaIva}</Text>
         
              </View>
            )}
            <View>
              <TouchableOpacity style={{marginTop:30}}
                    onPress={()=> router.push('/(Azienda)/menuAzienda')} >  
                 <Text style={{color:'blue', fontSize:20}}> Menu Azienda</Text>
              </TouchableOpacity>
            </View>
            <View>
              <TouchableOpacity style={{marginTop:30}}
                    onPress={()=> router.push('/(Accessi)/menuAccessi')} >  
                 <Text style={{color:'blue', fontSize:20}}> Menu Accessi</Text>
              </TouchableOpacity>
            </View>
            <View>
              <TouchableOpacity style={{marginTop:30}}
                    onPress={()=> router.push('/(Clienti)/menuClienti')} >  
                 <Text style={{color:'blue', fontSize:20}}> Menu Clienti</Text>
              </TouchableOpacity>
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
  );
}

const styles = StyleSheet.create({
    dati:{
      justifyContent: 'center',
      alignItems: 'center',
      padding: 20,
    },
    container: {
      flex: 1,
     
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
    welcomeText: {
      fontSize: 18,
      fontWeight: 'bold',
    },
    dataContainer: {
      marginVertical: 0,
      padding: 10,
      borderWidth: 0,
      borderColor: '#ccc',
      borderRadius: 5,
      width: '100%',
    },
    dataTitle: {
      fontSize: 16,
      fontWeight: 'bold',
      marginBottom: 5,
    },
    dataText: {
      fontSize: 14,
      marginVertical: 2,
    },
  
  logo: {
    width: 100,
    height: 100,
    marginVertical: 30,
    marginLeft:10,
  },

  });
/*
  <View style={{}}>
  {renderAziendaData(datiAzienda)}
</View>*/