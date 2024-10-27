import React, { useContext, useEffect, useState } from 'react';
import { View, Text, Button, StyleSheet, Pressable, Image } from 'react-native';
import { AuthContext } from '../Context/AuthContext';
import { useRouter } from 'expo-router';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../firebaseConfig';

export default function Home() {
  const { currentUser, logoutUser, loading,azienda,dataUser} = useContext(AuthContext);
  
    const [logoURL, setLogoURL] = useState(null);
    const companyId = azienda.IdAzienda;
     
   const router = useRouter();

   

   useEffect(() => {
     const fetchLogo = async () => {
       const docRef = doc(db, 'aziende', companyId);
       const docSnap = await getDoc(docRef);
       if (docSnap.exists()) {
         setLogoURL(docSnap.data().logoURL);
       } else {
         console.log('No such document!');
       }
     };
 
     fetchLogo();
   }, [companyId]);
 
   

   
  const handleLogout = async () => {
    await logoutUser();

    router.replace('/(Auth)/SignIn'); // Assicurati di usare la rotta corretta
  };

  if (loading) {
    return (
      <View style={{flex:1, alignItems:'center',justifyContent:'center'}}>
        <Text>Caricamento...</Text>
      </View>
    );
  }



const renderAziendaData = (azienda) => (
  <View style={styles.dataContainer}>
    <Text style={styles.dataTitle}>Dati Azienda</Text>
    <Text style={styles.dataText}>Nome: {azienda.IdAzienda}</Text>
    <Text style={styles.dataText}>Id: {azienda.datiPubblici.nome}</Text>
    <Text style={styles.dataText}>Indirizzo: {azienda.datiPrivati.indirizzo}</Text>
    <Text style={styles.dataText}>Partita IVA: {azienda.datiPrivati.partitaIVA}</Text>
  </View>
);





  return (
    <View style={styles.container}>
        <View style={{flexDirection:'row', justifyContent:'space-between', paddingHorizontal:20}}>
            <View >
                <Pressable  onPress={handleLogout} >
                   <MaterialCommunityIcons name="logout" size={30} color="black" />
                </Pressable>
            </View>
            <View >
                <Pressable onPress={()=> { router.push('/(SettingAzienda)/InserisciLogo')   }} >                     
                  <MaterialIcons name="settings" size={30} color="black" />
                </Pressable>
            </View>
        </View>
        <View>
      
          {logoURL ? <Image source={{ uri: logoURL }} style={styles.logo} /> : <Text>Logo non disponibile</Text>}
      </View>
  

     
      {currentUser ? 
        <View style={styles.dati}>
           
            <View>  
            <View style={styles.dataContainer}>
              <Text style={styles.dataTitle}>Dati Utente</Text>
              <Text style={styles.dataText}>Email: {currentUser.email}</Text> 
              <Text style={styles.dataText}>Qualifica: {dataUser.ruolo}</Text>
              <Text style={styles.dataText}>Nome: {dataUser.userNome}</Text>
            </View>
          
            {renderAziendaData(azienda)}

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
      marginVertical: 10,
      padding: 10,
      borderWidth: 1,
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
    marginVertical: 10,
    marginLeft:20,
  },

  });
  

