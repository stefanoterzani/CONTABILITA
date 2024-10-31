import { StyleSheet, Text, View,TouchableOpacity } from 'react-native'
import React from 'react'
import { router } from 'expo-router'

const MenuSetting = () => {
  return (
    <View style={styles.container}>
        <TouchableOpacity 
                style={{marginTop:30}}
                onPress={()=> router.push('/InserisciLogo')}>
            <Text style={styles.testo}>Carica Logo Azienda</Text>
        </TouchableOpacity>

        <TouchableOpacity 
                style={{marginTop:30}}
                onPress={()=> router.push('/CreaNuovoUtente')}>
            <Text style={styles.testo}>Crea Utente in membershipProvvisorio</Text>
        </TouchableOpacity>
        <TouchableOpacity 
                style={{marginTop:30}}
                onPress={()=> router.push('/AnagraficaAzienda')}>
            <Text style={styles.testo}>Crea/Modifica Anagrafica Azienda</Text>
        </TouchableOpacity>
    </View>
  )
}

export default MenuSetting

const styles = StyleSheet.create({
    container:{
        flex:1,
        width:'100%',
        height:'100%',
        borderColor:'red',
        borderWidth:2,
        alignItems:'center'

    },
    testo:{
        color:'blue',
        fontSize:20,
        fontFamily:"Poppins-SemiBold",
        textAlign:'center'
    }
})