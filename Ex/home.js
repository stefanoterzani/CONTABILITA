import React, { useEffect } from 'react';
import { View, Text, Button, SafeAreaView, StyleSheet,  } from 'react-native';
import { useAuth } from '../Context/AuthContext'; // Assicurati che il percorso sia corretto
import { useRouter } from 'expo-router';
import { TouchableOpacity } from 'react-native';

export default function home() {
  const { currentUser, azienda, ruolo,loading ,loadingOut} = useAuth();
 const router = useRouter();

//console.log('HOME LOADING OUT=',loadingOut)

 useEffect(() => {
  if (loadingOut) { // Controlla se il caricamento è completo
    if (!currentUser) {
    //  console.log('sono HOME')
      router.replace('/(Auth)/SignIn'); // Reindirizza a SignIn se non autenticato
      return null; // Prevenire il rendering
    }
}
 },[loadingOut])
 
// },[currentUser])
  return (
    <SafeAreaView style={styles.container}>

    {/* */}
      <View style={styles.header}>
          <View style={{alignItems:'center', marginTop:5}}>
            <Text style={{fontSize:20, fontFamily:'Poppins-Medium' }}>Benvenuto nella Home!</Text>
          </View>

         
          <View style={{marginTop:20,marginLeft:10}}>
            <View style={{flexDirection:'row'}}>
                <Text style={{fontSize:18, fontFamily:"Poppins-Regular"}}>Email: </Text>
                <Text style={{fontSize:18,fontFamily:"Poppins-Bold"}}>{currentUser.email}</Text>
            </View>
            <View style={{flexDirection:'row'}}>
                <Text style={{fontSize:18, fontFamily:"Poppins-Regular"}}>Azienda: </Text>
                <Text style={{fontSize:18,fontFamily:"Poppins-Bold"}}>{azienda || 'N/A'}</Text>
            </View>
            <View style={{flexDirection:'row'}}>
                <Text style={{fontSize:18, fontFamily:"Poppins-Regular"}}>Ruolo: </Text>
                <Text style={{fontSize:18,fontFamily:"Poppins-Bold"}}>{ruolo || 'N/A'}</Text>
            </View>
           
          </View>

      </View>

      <View style={styles.box}>
           
        <View style={styles.buttonContainer}>
             
            <TouchableOpacity
                onPress={() => router.push('/(CreazioneArchivi)/HomeGenerazione')}
                style={styles.button}>
            
                 
              <Text    style={styles.buttonText}>Creazione Archivi Azienda</Text>
              
            </TouchableOpacity>


            <TouchableOpacity
                onPress={() => router.push('/(Auth)/SignOut')}
                style={styles.button}>
            
              <Text   style={styles.buttonText}>Logout</Text>
                 
            </TouchableOpacity>   

        </View>
     </View>
     
   </SafeAreaView>
  );

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between', // Distribuisce lo spazio tra header e box in fondo
  },
  header: {
    padding: 20,
  },
  headerText: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  box: {
    width: '90%',
    height: 100,
   
    justifyContent: 'center', // Centra verticalmente il contenuto del box
    alignItems: 'center', // Centra orizzontalmente il contenuto del box
    alignSelf: 'center', // Centra il box orizzontalmente
    marginBottom: 20, // Assicura che il box sia in fondo alla pagina con margine inferiore
  },
  buttonContainer: {
    flexDirection: 'row', // Dispone i bottoni in una riga
    justifyContent: 'space-evenly', // Spazia equamente i bottoni
    width: '100%',
  },
  button: {
    width: '40%', // Imposta la larghezza uguale dei bottoni
    padding: 10,
    backgroundColor: '#007BFF',
    alignItems: 'center',
    borderRadius: 5,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
  },
});



/*
      <View  style={{flexDirection:'row', gap:10, }} >
          <View  style={{width:'45%'}}>
              <Button   title="Aggiungi Utente" onPress={() => router.push('/(Auth)/AddUser')} />
          </View>
          <View  style={{width:'45%'}}>
            <Button   title="Logout" onPress={() => router.push('/(Auth)/SignOut')} /> 
          </View>
      </View>
*/
/*

import { View, Text, Button } from 'react-native';
import { useAuth } from '../Context/AuthContext';
import { useRouter } from 'expo-router';

export default function home() {
  const { user, nomeAzienda, logout ,ruolo} = useAuth();
  const router = useRouter();

  const handleLogout = async () => {
    await logout(); // Logout dall'utente
    router.replace('/SignIn'); // Torna alla schermata di login
  };



  return (
    <View>
        <View style={{marginTop:30, marginLeft:30}}>
            <Text>Bentornato, {user ? user.email : 'Guest'}</Text>
            {nomeAzienda && <Text>Azienda: {nomeAzienda}</Text>} 
            {ruolo && <Text>Ruolo: {ruolo}</Text>} 
        </View>
        <View style={{marginTop:30}}>
            <Button title="Logout" onPress={handleLogout} />
        
      
        </View>
        {ruolo === 'amministratore' &&
            <View style={{marginTop:30}}>
                <Button title="crea Ruolo" onPress={() => router.push('/ManageRoles')}  />
            </View>
        }
    </View>
  );
}

*/

