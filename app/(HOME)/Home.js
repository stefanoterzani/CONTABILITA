import { StyleSheet, Text, View,Platform,Keyboard,TouchableOpacity} from 'react-native'
import React, { useContext, useState,useEffect} from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { schemaCliente,schemaSedi } from '../schemi/schemiClienti';
import { organizzaSchema,aggiungiPagina,eliminaPagina} from '../schemi/FunzioniSchemi';
//import FormDinamico  from '../componenti/componentiFormDinamico/FormDinamico';
//import { ColumnDimensionsContext } from '../context/ColumnDimensionsContext';
import ColonnaSinistra from '../componenti/ColonnaSinistra';
import ColonnaDestra from '../componenti/ColonnaDestra';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';

import { useSelector} from 'react-redux';

const Home = () => {

 
  const { 
    windowHeight, windowWidth,
    headerHeight, footerHeight,
    leftColumnWidth, centralColumnWidth, rightColumnWidth, 
    leftColumnLeft, centralColumnLeft, rightColumnLeft ,
    bordoSopraSotto,
    bordoSnColonnaSn,bordoDxColonnaSn,
    bordoSnColonnaDx,bordoDxColonnaDx,
    bordoDxColonnaCn,bordoSnColonnaCn,
    colonnaSnVisibile,colonnaDxVisibile,
    isMobile,
    setLeftColumnWidth,setRightColumnWidth
        }= useSelector((state) => state.columnDimensions);

const [showColonnaDestra, setShowColonnaDestra] = useState(false);
const [showColonnaSinistra, setShowColonnaSinistra] = useState(false);


  return (

    
    <SafeAreaView style={{flex:1}}>


   {/****************** HEADER  ---------------------------------- */}  

  
        <View 
            style={{position: 'absolute', 
              backgroundColor:'blue',
              top:0,
              left: 0,
              width:windowWidth,
              height: headerHeight,                 
              flexDirection:'row'}}>
                 <View style={{width:'15%',height:'100%',borderColor:'red',borderWidth:1,justifyContent:'center',alignItems:'center'}}>
                 {isMobile && (
                 <TouchableOpacity
                      onPress={()=>{
                        setLeftColumnWidth((prevWidth) => (prevWidth === 0 ? 200 : 0)) 
                        setShowColonnaSinistra((prevShow) => !prevShow)
                        } }>
                     <MaterialIcons name="menu" size={30} color="white" />
                 </TouchableOpacity>
                 )}
                  </View>
                 
                  <View style={{width:'70%',height:'100%',borderColor:'red',borderWidth:1,alignItems:'center',justifyContent:'center'}}>
                      <Text style={{textAlign:'center' ,  color:'white'}}>{windowWidth.toFixed(2)} x {windowHeight.toFixed(2)}</Text>
                      <Text style={{textAlign:'center' ,  color:'white'}}>HOME</Text>
                  </View>   
                  <View style={{width:'15%',height:'100%',borderColor:'red',borderWidth:1,justifyContent:'center',alignItems:'center'}}>
             
                 <TouchableOpacity
                      onPress={()=>{
                        setRightColumnWidth((prevWidth) => (prevWidth === 0 ? 200 : 0)) 
                        setShowColonnaDestra((prevShow) => !prevShow)
                        } }>
                     <Text style={{color:'white',textAlign:'center', fontSize:20}}>2</Text> 
                 </TouchableOpacity>
               
                  </View>


                </View>
    
               

      {/****************** FOOTER  ---------------------------------- */}  

     
        <View 
            style={{position: 'absolute', borderColo: 'blue', borderWidth:0,backgroundColor:'blue',
                    top:windowHeight- footerHeight,
                    left: 0,
                    width:windowWidth,
                    height: footerHeight,
                }}>
                <View style={{alignItems:'center'}}>
                  <Text style={{color:'white'}}>POSTO FOOTER</Text>
                  
                </View>
        </View>




<ColonnaSinistra showColonnaSinistra={showColonnaSinistra} />

<ColonnaDestra showColonnaDestra={showColonnaDestra}  />
 

{/******************COLONNA CENTRALE ---------------------------------- */}
        
        <View style={{ position:'absolute',  
        flex:1,
                  top: headerHeight, 
                  left: centralColumnLeft, 
                  width:centralColumnWidth, 
                  height: windowHeight-footerHeight-headerHeight, 
                  borderColor:'white',
                  borderTopWidth: bordoSopraSotto,
                  borderBottomWidth:bordoSopraSotto,
                  borderLeftWidth: bordoSnColonnaCn,
                  borderRightWidth: bordoDxColonnaCn,
                  backgroundColor:'white'}}>

         
            

        </View>
       
      
    </SafeAreaView>
  )
}

export default Home

