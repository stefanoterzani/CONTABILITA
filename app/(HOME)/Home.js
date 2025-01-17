import {Text, View,TouchableOpacity,Dimensions} from 'react-native'
import React, {useState,useEffect} from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';


import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { setWindowDimensions as setStandardWindowDimensions, 
          setHeaderHeight, setFooterHeight, 
          setTipoApp as setStandardTipoApp, 
          toggleLeftColumn as toggleStandardLeftColumn, 
          toggleRightColumn as toggleStandardRightColumn, 
          updateColumnStyles as  updateStandardColumnStyles } from '../redux/slice/SliceColonnaStandard';


import { setWindowDimensions as setOptionalWindowDimensions, 
          setTipoApp as setOptionalTipoApp, 
          toggleLeftColumn as toggleOptionalLeftColumn, 
          showRightColumn, 
          hideRightColumn, 
          toggleWarningMessage, 
          updateColumnStyles as updateOptionalColumnStyles } from '../redux/slice/SliceColonnaOpzionale';

import ColonnaSinistra from '../componenti/ColonnaSinistra';
import ColonnaDestra from '../componenti/ColonnaDestra';
import { useSelector,useDispatch} from 'react-redux';


const Home = () => {
  const dispatch = useDispatch();
 
  const { windowHeight, windowWidth, 
          headerHeight, footerHeight, 
          leftColumnStyles, centralColumnStyles, rightColumnStyles, 
          showColonnaSinistra, showColonnaDestra
        } = useSelector((state) => state.standardColumn);
  
        const { showColonnaSinistra: showOptionalColonnaSinistra, 
              showColonnaDestra: showOptionalColonnaDestra } = useSelector((state) => state.optionalColumn
            );
 
useEffect(() => { 
  dispatch(setStandardTipoApp('tipoApp1')); 
  dispatch(setOptionalTipoApp('tipoApp1'));
  dispatch(updateStandardColumnStyles());
  dispatch(updateOptionalColumnStyles());

}, [dispatch,windowWidth,windowHeight]);
 
const handleToggleLeftColumn = () => { 
  dispatch(toggleStandardLeftColumn());
 }
 
 
    /*
useEffect(() => {
   dispatch(setStandardTipoApp('tipoApp1')); // Imposta il tipo di app iniziale dispatch(setOptionalTipoApp('tipoApp1'));
   dispatch(setOptionalTipoApp('tipoApp1'));

   const handleResize = () => { 
      dispatch(setStandardWindowDimensions()); 
      dispatch(setOptionalWindowDimensions()); 
      dispatch(updateStandardColumnStyles()); 
      dispatch(updateOptionalColumnStyles()); 
  
    };

    Dimensions.addEventListener('change',handleResize);

    handleResize(); // Chiamalo subito per impostare i valori iniziali

  return () => Dimensions.removeEventListener('change', handleResize); 

}, [dispatch]);
*/

const handleShowRightColumn = () => { 
 console.log('APRO DESTRA');
  dispatch(showRightColumn()); // Simula un evento che termina dopo 5 secondi e chiude la colonna destra setTimeout(() => { dispatch(hideRightColumn()); }, 5000); };
  setTimeout(() => { 
    console.log('CHIUDO DESTRA');
    dispatch(hideRightColumn()); 
  }, 5000); 
};

  return (
    <SafeAreaView style={{flex:1}}>

 {/*********************HEADER**************************************/}
    <View 
        style={{position: 'absolute', 
          backgroundColor:'blue',
          top:0,
          left: 0,
          width:windowWidth,
          height: headerHeight,                 
          flexDirection:'row',
          borderTopLeftRadius:20,
          borderTopRightRadius:20
          }}>


             <View style={{
                            width:'15%',
                            height:'100%',
                            borderColor:'red',
                            borderWidth:0,
                            justifyContent:'center',
                            alignItems:'center'}}>
                  { windowWidth < 768 && (
                    <TouchableOpacity onPress={() => dispatch(toggleOptionalLeftColumn())}>
                        <MaterialIcons name="menu" size={30} color="white" />
                    </TouchableOpacity>
                   )}
              </View>
             
              <View style={{width:'70%',height:'100%',borderColor:'red',borderWidth:0,alignItems:'center',justifyContent:'center'}}>
                  <Text style={{textAlign:'center' ,  color:'white'}}>{windowWidth.toFixed(2)} x {windowHeight.toFixed(2)}</Text>
                  <Text style={{textAlign:'center' ,  color:'white'}}>HOME</Text>
              </View>   

              <View style={{width:'15%',height:'100%',borderColor:'red',borderWidth:0,justifyContent:'center',alignItems:'center'}}>                  
              <TouchableOpacity onPress={handleShowRightColumn}>
                      <Text style={{color:'white',textAlign:'center', fontSize:16}}>Apriti Sesamo</Text> 
                  </TouchableOpacity>                
              </View>
    </View>
   
   
  
   {showColonnaSinistra ? <ColonnaSinistra tipo="standardColumn" /> : 
              showOptionalColonnaSinistra && <ColonnaSinistra tipo="optionalColumn" />} 
   
   {showColonnaDestra ? <ColonnaDestra tipo="standardColumn" /> : 
       showOptionalColonnaDestra && <ColonnaDestra tipo="optionalColumn" />}    
 


    
    {/*********************CENTRAL COLUMN**************************************/}
    <View style={{ 
              position:'absolute',  
              //flex:1,
              top: headerHeight, 
              left: leftColumnStyles.width, 
              width:centralColumnStyles.width, 
              height: windowHeight-footerHeight-headerHeight, 
              backgroundColor: centralColumnStyles.background, 
              borderTopColor: centralColumnStyles.borderTopColor, 
              borderTopWidth: centralColumnStyles.borderTopWidth, 
              borderBottomColor: centralColumnStyles.borderBottomColor, 
              borderBottomWidth: centralColumnStyles.borderBottomWidth, 
              borderLeftColor: centralColumnStyles.borderLeftColor, 
              borderLeftWidth: centralColumnStyles.borderLeftWidth, 
              borderRightColor: centralColumnStyles.borderRightColor, 
              borderRightWidth: centralColumnStyles.borderRightWidth,
              
              }}>

     
        

    </View>
   {/*********************FOOTER ****************************************/}
    <View 
          style={{
                position: 'absolute', 
                borderColor: 'blue', 
                borderWidth:0,
                backgroundColor:'blue',
                bottom: 0,
                left: 0,
                width:windowWidth,
                height: footerHeight,
                alignItems:'center',
                justifyContent:'center',
                borderBottomLeftRadius:20,
                borderBottomRightRadius:20
            }}>
           
        <Text style={{color:'white'}}>POSTO FOOTER</Text>
              
    </View>
  
</SafeAreaView>
    
  )
}

export default Home

/*

{console.log("windowHeight",windowHeight, 'winwsWidth',windowWidth)}
    {console.log('left:',centralColumnLeft)}
    {console.log('width:',centralColumnWidth, 'height:', windowHeight-footerHeight-headerHeight)}
    {console.log('styleColonnaSinistra',leftColumnStyles)}
    {console.log('styleColonnaDestra',rightColumnStyles)}




  {showColonnaDestra ? <ColonnaDestra tipo="standardColumn" /> : 
              showOptionalColonnaDestra && <ColonnaDestra tipo="optionalColumn" />}

 {console.log('HOME WINDOWS Width',windowWidth, ' Height',windowHeight)}
    {console.log('HOME SINISTRA showColonnaSinistra',showColonnaSinistra, ' showOptionalColonnaSinistra',showOptionalColonnaSinistra)}
    {console.log('HOME DESTRA showColonnaDestra',showColonnaDestra, ' showOptionalColonnaDestra',showOptionalColonnaDestra)}
    {console.log('HOME STILE COLONNA CENTRALE',centralColumnStyles)}
   {console.log('HOME STILE COLONNA SINISTRA',leftColumnStyles)}
  { console.log('HOME STILE COLONNA DESTRA',rightColumnStyles)}

*/