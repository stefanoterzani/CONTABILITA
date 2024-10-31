import React, { useEffect, useContext, useState } from 'react';
import { useRouter } from 'expo-router';
import { AuthContext } from '../Context/AuthContext';
import { View, Text, Button, StyleSheet,Alert,ActivityIndicator } from 'react-native';

export default function Index() {
 // const { currentUser, loading,azienda,dataUser} = useContext(AuthContext);
 const { currentUser, loading} = useContext(AuthContext);
  const router = useRouter();
//  const [isRedirecting, setIsRedirecting] = useState(false);

 
  
  useEffect(() => {
  
    if (!loading && currentUser) {        
           //   setIsRedirecting(true);
              router.replace('/home');             
      }
   }, [currentUser, loading]);


if (loading ) {
      return (
          <View style={styles.container}>
              <ActivityIndicator size="large" color="red" />
              <Text style={{ fontSize: 20, color: 'red' }}>Sto caricando...</Text>
          </View>
      );
  }

  return (
      <View style={styles.container}>
     
      {!currentUser  && (
          <View>
          <Text>Benvenuto nella tua app!</Text>
          <Button title="Vai al Login" onPress={() => router.replace('/(Auth)/SignIn')} />
          </View>
        )}    
      </View>
 

  );

  
}

const styles = StyleSheet.create({
  container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#fff',
  },
})
  




  /*
import React, { useEffect, useContext, useState } from 'react';
import { useRouter } from 'expo-router';
import { AuthContext } from '../Context/AuthContext';
import { View, Text, Button, StyleSheet,Alert,ActivityIndicator } from 'react-native';

export default function Index() {
 // const { currentUser, loading,azienda,dataUser} = useContext(AuthContext);
 const { currentUser, loading} = useContext(AuthContext);
  const router = useRouter();
//  const [isRedirecting, setIsRedirecting] = useState(false);

 
  
  useEffect(() => {
  
 //   const hasCompleteData = currentUser && azienda?.idAzienda && dataUser?.nome;
  // console.log("INDEX----Loading:", loading,"-----AZIENDA=",azienda, "-------DATA USER=",dataUser, "--- COMPLETE=",hasCompleteData, "REDIR=",isRedirecting);
    
  //  setIsRedirecting(false)
    if (!loading && hasCompleteData && !isRedirecting) {        
           //   setIsRedirecting(true);
              router.replace('/home');             
      }
   }, [currentUser, loading, azienda, dataUser, isRedirecting]);


if (loading || isRedirecting) {
      return (
          <View style={styles.container}>
              <ActivityIndicator size="large" color="red" />
              <Text style={{ fontSize: 20, color: 'red' }}>Sto caricando...</Text>
          </View>
      );
  }

  return (
      <View style={styles.container}>
      {console.log('REDIRECTING', isRedirecting)}
      {!isRedirecting  && (
          <View>
          <Text>Benvenuto nella tua app!</Text>
          <Button title="Vai al Login" onPress={() => router.replace('/(Auth)/SignIn')} />
          </View>
        )}    
      </View>
 

  );

  
}

const styles = {
  container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#fff',
  },
};



  */