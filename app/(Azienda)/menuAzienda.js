import { StyleSheet, Text, View ,TouchableOpacity} from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useRouter } from 'expo-router';
const menuAzienda = () => {
    const router = useRouter();
  return (
    <SafeAreaView style={styles.container}>
    <View style={styles.box}>
        <TouchableOpacity 
                onPress={()=> router.push('/(Azienda)/inserimentoAzienda')} 
                style={{marginTop:40}}>
            <Text style={styles.text}>Anagrafica Azienda</Text>
        </TouchableOpacity>
     
    </View>
  </SafeAreaView>
  )
}

export default menuAzienda

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'lightgreen',
    alignItems: 'center', // Centra orizzontalmente
    justifyContent: 'center', // Centra verticalmente
  },
  box: {
    borderColor: 'green',
    borderWidth: 2,
    height: '80%', // Altezza del box in percentuale
    width: '90%', // Larghezza del box in percentuale
    alignItems: 'center', // Centra il contenuto orizzontalmente
    //justifyContent: 'center', // Centra il contenuto verticalmente
  },
  text: {
    fontSize: 18,
    fontWeight: 'bold',
  },  
})