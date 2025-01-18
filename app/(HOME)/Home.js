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

import ColonnaSinistra from '../componenti/componentiSchermate/ColonnaSinistra';
import ColonnaDestra from '../componenti/componentiSchermate/ColonnaDestra';
import Footer from '../componenti/componentiSchermate/Footer';
import Header from '../componenti/componentiSchermate/Header';

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
       
        <Header windowWidth={windowWidth} headerHeight={headerHeight} />
    
        {showColonnaSinistra ? <ColonnaSinistra tipo="standardColumn" /> : showOptionalColonnaSinistra && <ColonnaSinistra tipo="optionalColumn" />}  
        {showColonnaDestra ? <ColonnaDestra tipo="standardColumn" /> :  showOptionalColonnaDestra && <ColonnaDestra tipo="optionalColumn" />}    
 


    
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
  <Footer windowWidth={windowWidth} footerHeight={footerHeight} />
  
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