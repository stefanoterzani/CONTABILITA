import React, {useContext, useEffect } from 'react';
import { View, Text,  StyleSheet} from 'react-native';
import { useRouter } from 'expo-router';
import { AuthContext } from '../../Context/AuthContext';
import { TouchableOpacity } from 'react-native';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';

const menuStartAzienda = () => {
    const {dataUser, logoutUser,datiAzienda} = useContext(AuthContext);
    const router = useRouter();

const handleLogout= async ()=>{
    await logoutUser();
    router.replace('/');

}

useEffect(()=>{
console.log('MENU START', datiAzienda)
},[])

  return (
    <View style={{flex:1, backgroundColor:'lightgreen'}}>
            <View style={{alignItems:'flex-end', marginRight:20,marginTop:20}}>
                <TouchableOpacity  onPress={handleLogout} >
                   <MaterialCommunityIcons name="logout" size={30} color="black" />
                </TouchableOpacity>
            </View>
         <View style={{alignItems:'center', marginTop:40}}>
            <View style={{flexDirection:'row'}}>
                 <Text style={{fontSize:25}}>Benvenuto </Text>
                 <Text style={{fontSize:25, fontWeight:'bold'}}>{dataUser.nome}</Text>
            </View>
            <View>
                 <Text style={{fontSize:25}}>Ora devi creare la tua Azienda </Text>
            </View>
            <TouchableOpacity style={{marginTop:50}}
                onPress={()=> router.push('/anagraficaAzienda')}>
                <Text style={{color:'blue', fontSize:25,fontWeight:'bold'}}> (1) Crea la tua anagrafica</Text>
            </TouchableOpacity>
        </View>
    </View>
  )
}

export default menuStartAzienda

const styles = StyleSheet.create({})