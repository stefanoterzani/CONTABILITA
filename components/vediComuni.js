import { StyleSheet, Text, View,Pressable,Modal } from 'react-native'
import React, { useState,useRef,useEffect } from 'react'

import InputComuni from '../../../components/InputComuni'




const VediComuni = ({onData}) => {
    const [selectedComune,setSelectedComune]=useState('')
    const [modalVisibleComuni, setModalVisibleComuni] = useState(false);
   
  
    const handleSceltaComune = (nome, longitudine, latitudine) => {
    console.log('scelta comune',nome, longitudine, latitudine)
        setSelectedComune(nome)
      dataset={
        nome:nome,
        longitudine:longitudine,
        latitudine:latitudine
      }
      onData(dataset)
     //   setForm({...form, domicilioComune: nome, domicilioLongitudine: longitudine,domicilioLatitudine: latitudine}) 
        
        setModalVisibleComuni(false)
       
      }



  return (
    <View   style={{borderRightWidth:4, borderBottomWidth:2,  borderRadius: 10,height:40,width:'90%',
        backgroundColor:'white',paddingHorizontal:5,justifyContent:'center'}}>
   
        <Pressable                   
             onPress={()=> setModalVisibleComuni(true)}>   
                <View   style={{justifyContent:'center'}}>               
                    <Text style={{fontSize:18, fontFamily:'Poppins-Medium'}}>{selectedComune}</Text>
                </View> 
        </Pressable>  

        <Modal
            animationType="slide"
            transparent={true}
            visible={modalVisibleComuni} >
            <View style={{alignItems:'center',top:70}}>
                <View style={{width:'90%',height:'90%'}}>
                    <InputComuni 
                        style={{}}
                        handleSceltaComune={handleSceltaComune}>
                    </InputComuni>     
                    <Text style={{fontSize:20,color:'white'}}>Ritorna</Text>   
                </View>
                
            </View>
           
    </Modal>


</View>
  )
}

export default VediComuni

const styles = StyleSheet.create({})