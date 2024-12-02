import React, { useContext, useEffect, useState,useRef } from 'react';
import {Animated, FlatList,Platform,View, Text, StyleSheet, Pressable, Image ,TouchableOpacity, SafeAreaView} from 'react-native';
import { AuthContext } from '../context/AuthContext';
import { useRouter } from 'expo-router';
import { MaterialIcons, MaterialCommunityIcons, FontAwesome } from '@expo/vector-icons';
import {  query, where, doc, getDoc, getDocs, setDoc, deleteDoc, collection, addDoc  } from 'firebase/firestore';
import { db } from '../firebaseConfig';
import { creaAziendaVuota,getAzienda ,registraAccessoUtente} from '../servizi/FunzioniAzienda';
import Modal from 'react-native-modal';
import { Audio } from 'expo-av'; // Importa correttamente Audio da expo-av
 
import Header from '../components/Header'
import datiApi from '../assets/dati/apiJason.json'
import menuConfig from '../config/menuConfig'
import Menu from '../components/Menu'
import Footer from '../components/Footer'
import { getFooterIcons } from '../config/footerIconsConfig'


export default function Home() {
  const [piattaforma,setPiattaforma] = useState(Platform.OS);
 // const {Azienda, setAzienda } = useContext(AziendaContext);
   const {newAzienda, setNewAzienda } = useState(null);
  const { logoutUser, loading,dataUser,aziendaId} = useContext(AuthContext);
  const [logoURL, setLogoURL] = useState(null);
  const router = useRouter();
   const [isModalVisible, setModalVisible] = useState(false);
  const [AzLoading, setAzLoading] = useState(true);
  const [loadingMondo, setLoadingMondo] = useState(true);
  const [loadingItalia, setLoadingItalia] = useState(true);
  const [newsItalia, setNewsItalia] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0); // Stato per tenere traccia dell'indice corrente
  const unreadMessages = 5; // Numero di messaggi non letti
  const footerIcons = getFooterIcons('Home', router, unreadMessages);
  const menuItems = menuConfig.home; // Configurazione del menu per la home
  
  
  
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
    console.log('HOME vedi come trattare il context azienda')
    const fetchData = async () => {
    if (!dataUser) {
      router.replace('/') 
    } else {
        const Az = await getAzienda(dataUser.idAzienda)
     //  console.log( 'HOME DATI Azienda',Az)
     //  console.log( 'HOME DATI USER',dataUser)
    if (Az) {
     // setNewAzienda(Az);
      setLogoURL(Az.logo);   
    } else {
      console.log('L azienda non esiste');
      toggleModal()
      await creaAziendaVuota(dataUser.idAzienda);
      const newAzienda = await getAzienda(dataUser.idAzienda);
     // setNewAzienda(newAzienda);
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

  useEffect(() => {
    // Funzione per caricare le news da un'API
    const fetchNewsItalia = async () => {
      try {
        //https://api.apitube.io/v1/news/top-headlines
        // apitube.io   api_live_elinzQGcOzbRM45cne4KFUMwWEsBUwRakC0h92gTn7If3sLRE0PTCd
        //72ffccf13a934f7eaeee8fcb69551efa
       // https://newsapi.org/v2/top-headlines?country=us&language=it&pageSize=10&apiKey=YOUR_API_KEY
     
     
   //   const response = await fetch('https://newsapi.org/v2/everything?domains=repubblica.it,ilsole24ore.com&language=it&from=2024-11-26&to=2024-11-28&sortBy=publishedAt&pageSize=20&page%3E=1&apiKey=72ffccf13a934f7eaeee8fcb69551efa'); // Sostituisci con l'URL della tua API per le news italiane
   // const data = await response.json();

       const data=datiApi
    //   console.log('response',JSON.stringify(data, null, 2))
        setNewsItalia(data.articles); // Assumi che le news siano in un array chiamato 'articles'
        setLoadingItalia(false);
      } catch (error) {
        console.error('Errore nel caricamento delle news italiane:', error);
        setLoadingItalia(false);
      }
    };

      fetchNewsItalia();
   
  }, []);
   
  const handleIconPress = async () => {
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
  const renderItemNotizie = ({ item }) => (
    <View style={styles.newsItem}>
        <Image source={{ uri: item.urlToImage }} 
          style={styles.newsImage} />
     
      <View style={styles.newsTextContainer}>     
        <Text style={styles.newsTitle}>{item.title}</Text>
        <Text style={styles.newsDescription}>{item.description}</Text>
        <View style={styles.newsFooter}>
            <Text style={styles.newsDate}>{new Date(item.publishedAt).toLocaleDateString()}</Text>
            <Text style={styles.newsSource}> - {item.source.name}</Text>
        </View>
      </View>
     
    </View>
   
  );
 
  const flatListRef = useRef(null);

 

 

  return (
    <SafeAreaView style={styles.container} >
      <View style= {piattaforma==='web' ? styles.Webcontainer : styles.Mobilecontainer}>
        
          <Header
            screenName="Home" 
            icon="logout" 
            onIconPress={handleIconPress} 
          />

          <View style={[styles.boxNews,piattaforma==='web' ? { height: '65%',marginTop:'2%',marginBottom:0} : { height: '68%',marginTop:'5%',marginBottom:0}]}>
            <View style={styles.newsSection}>
                <Text style={{ fontSize: 14, fontFamily: 'Poppins-Medium' }}>Notizie dal Mondo</Text>
       
                <FlatList
                  data={newsItalia}
                  renderItem={renderItemNotizie}
                  keyExtractor={(item) => item.url}
                  contentContainerStyle={styles.newsList}
                  horizontal
                  style={{ width: '100%' }} // Imposta la larghezza della FlatList
                />
            </View>
          </View>

 
        <Menu menuItems={menuItems} />

        <Footer icons={footerIcons} />

      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container:{
    alignItems:'center', 
    flex:1,
    width:'100%',
    height:'100%',
    borderColor:'orange',
    borderWidth:0 
  },
  Webcontainer: {
      flex: 1,
      height: '100%',
      width:'80%',
      alignItems:'center',
     // justifyContent:'center',
      borderColor:'red',
      borderWidth:0,
      backgroundColor:'white'
    //  padding: 20,
    },
  Mobilecontainer: {
    flex: 1,
    height: '100%',
    width:'100%',
    alignItems:'center',
    alignItems:'center',
    borderColor:'red',
    borderWidth:0,
  //  padding: 10,
  },
 /* Stili per l'header */
  /* Stili per il contenitore delle notizie */
  boxNews: {
    width: '95%', // Imposta la larghezza al 95%
    alignItems: 'center',
    borderColor: 'red',
    borderWidth: 0,
    marginBottom: '2%',
   // marginTop: '5%',
  },
 
  newsSection: {
  flexDirection: 'column',
  width: '100%',
  height: '100%',
  alignItems: 'center',
  paddingHorizontal: Platform.OS === 'web' ? '2%' : 0, // Aggiungi padding orizzontale per limitare la larghezza su web
  paddingVertical: 10, // Aggiungi padding verticale per aumentare l'altezza della FlatList
},
  newsItem: {
   // marginBottom: 20,
    padding: 10,
    backgroundColor: 'white',
    borderRadius: 10,
    borderColor: 'gray',
    borderWidth: 1,
    alignItems: 'center',
    width: 400,
    height: '100%',
  },
 
newsList: {
    paddingBottom:0,
  },
 
  newsImage: {
    width: Platform.OS === 'web' ? 120 : 250,
    height: Platform.OS === 'web' ? 120 : 250,
    borderRadius: 10,
    marginBottom: 10,
  },
newsTitle: {
  fontSize: Platform.OS === 'web' ? 14 : 18,
  fontFamily: 'Poppins-Bold',
  fontWeight: 'bold',
  textAlign: 'center',
  flexWrap: 'wrap',
  overflow: 'hidden', // Nasconde il testo in eccesso
  height: Platform.OS === 'web' ? 70 : 90, // Imposta un'altezza fissa per limitare il numero di righe
//marginBottom: 5
},
  newsTextContainer: {
    alignItems: 'center',
  },
 newsDescription: {
  fontSize: Platform.OS === 'web' ? 12 : 16,
 fontFamily: 'Poppins-Regular',
  textAlign: 'center',
  flexWrap: 'wrap',
  overflow: 'hidden', // Nasconde il testo in eccesso
  height: Platform.OS === 'web' ? 70 : 90,  // Imposta un'altezza fissa per limitare il numero di righe
},
newsFooter: {
  flexDirection: 'row',
  justifyContent: 'center',
  alignItems: 'center',
  marginTop: Platform.OS === 'web' ? 15 : 40,
},
  newsDate: {
    fontSize: 12,
    color: 'gray',
   // marginTop: 10,
    textAlign: 'center',
  },

 
  });

 {/*
        <View style={styles.footer}>
            <View style={styles.bellContainer}>
              <FontAwesome name="bell" size={piattaforma === 'web' ? 24 : 30} color="white" />
                {unreadMessages > 0 && (
                <View style={styles.badge}>
                  <Text style={styles.badgeText}>{unreadMessages}</Text>
                </View>
              )}
            </View>
            <MaterialIcons name="settings" size={piattaforma === 'web' ? 24 : 30} color="white" />
            <MaterialCommunityIcons name="email-send" size={piattaforma === 'web' ? 24 : 30} color="white" />
            <FontAwesome name="user" size={piattaforma === 'web' ? 24 : 30} color="white" />
        </View>
     */}

     {/* 
          <View style={styles.boxMenu}>
              <Pressable onPress={scrollToPreviousItem}  style={styles.arrowButton}>
                <MaterialIcons name="arrow-back-ios-new" size={24} color="black" />
              </Pressable>
              <View style={{height:'60%',  width:'100%',borderColor:'red',borderWidth:0}}>
                  <FlatList
                      ref={flatListRef}
                      data={menuConfig.home}
                      renderItem={({ item }) => <MenuItem item={item}/>}
                      keyExtractor={(item) => item.label}
                      horizontal
                      showsHorizontalScrollIndicator={false}
                      style={Platform.OS === 'web' ? { width: '96%' } : { width: '100%' }}  // Imposta la larghezza della FlatList
                  />
              </View>
            <Pressable onPress={scrollToNextItem}  style={styles.arrowButton}>
                <MaterialIcons name="arrow-forward-ios" size={24} color="black" />
              </Pressable>
          </View>
          */}