import { StyleSheet, Text, View ,TouchableOpacity} from 'react-native'
import React from 'react'
import { router } from 'expo-router'

const HomeGenerazione = () => {
  return (
    <View style={{flex:1, backgroundColor:'lightblue', alignItems:'center'}}>
      <View style={{marginTop:50, }}>
        <TouchableOpacity
                onPress={() => router.push('/(CreazioneArchivi)/AggiungeCliente')}
                style={{}}>
                  <Text    style={{color:'blue', fontSize:20, fontFamily:"Poppins-SemiBold"}}>Aggiungi Nuovo Cliente</Text>
        </TouchableOpacity>
      </View>
      <View style={{marginTop:50, }}>
        <TouchableOpacity
                onPress={() => router.push('/(CreazioneArchivi)/GeneraRuolo')}
                style={{}}>
                  <Text    style={{color:'blue', fontSize:20, fontFamily:"Poppins-SemiBold"}}>Genera Ruolo</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}

export default HomeGenerazione

const styles = StyleSheet.create({})