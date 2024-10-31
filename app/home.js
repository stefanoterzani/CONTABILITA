import React, { useContext, useEffect, useState } from 'react';
import { View, Text, Button, StyleSheet, Pressable, Image } from 'react-native';
import { AuthContext } from '../Context/AuthContext';
import { useRouter } from 'expo-router';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../firebaseConfig';

export default function Home() {
  const { currentUser, logoutUser, loading,datiAzienda,dataUser} = useContext(AuthContext);
  
    const [logoURL, setLogoURL] = useState(null);
   
     
   const router = useRouter();
 //  console.log('-----HOME loading=',loading,'--- AziendaId =',azienda.IdAzienda, '----- DataUserNome=', dataUser.nome)

/*
useEffect(()=> {
 // console.log('-----HOME loading=',loading,'--- Azienda =',azienda, '----- DataUserNome=', dataUser)
},[loading,azienda,dataUser])
*/


   useEffect(() => {
     const fetchLogo = async () => {
     
       const docRef = doc(db, 'aziende', datiAzienda.id);
       const docSnap = await getDoc(docRef);
       if (docSnap.exists()) {
         setLogoURL(docSnap.data().logoURL);
       } else {
         console.log('No such document!');
       }
     };
   
    
     fetchLogo();
   }, [datiAzienda.id]);
 
   
//  router.replace('/(Auth)/SignIn'); // Assicurati di usare la rotta corretta
   
  const handleLogout = async () => {
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



const renderAziendaData = (datiAzienda) => (
  <View style={styles.dataContainer}>
    
    <Text style={styles.dataText}>Nome: {datiAzienda.nome}</Text>
    <Text style={styles.dataText}>Id: {datiAzienda.id}</Text> 
    <Text style={styles.dataText}>Partita IVA: {datiAzienda.partitaIva}</Text>
     <Text style={styles.dataText}>Indirizzo: {datiAzienda.indirizzo}</Text>
     <Text style={styles.dataText}>Città: {datiAzienda.citta}</Text>
     <Text style={styles.dataText}>Cap: {datiAzienda.cap}</Text>
     <Text style={styles.dataText}>Provincia: {datiAzienda.provincia}</Text>
  </View>
)
// <Text style={styles.dataText}>Indirizzo: {azienda.Anagrafica.SedeLegale.Indirizzo}</Text>

const renderDataUser = (ciccio) => (
  <View style={styles.dataContainer}>
    <Text style={styles.dataTitle}>Dati Utente</Text>
    <Text style={styles.dataText}>Email: {ciccio.email}</Text> 
    <Text style={styles.dataText}>Nome: {ciccio.nome}</Text>
    <Text style={styles.dataText}>Qualifica: {ciccio.qualifica}</Text>
</View>
)






  return (
    <View style={styles.container}>
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
          <View style={{}}>
              {renderAziendaData(datiAzienda)}
          </View>

        </View>
  


 
  
      {currentUser ? 
        <View style={styles.dati}>
            <View>
              {renderDataUser(dataUser)}  
            </View>
        </View>
         
       : (
        <View style={{alignItems:'center',justifyContent:'center'}}>
           <Text style={{fontSize:20, fontFamily:'Poppins-Bold'}}>Per favore, effettua il login</Text>
        </View>
      )}
  


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
    welcomeText: {
      fontSize: 18,
      fontWeight: 'bold',
    },
    dataContainer: {
      marginVertical: 20,
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
  

