import {Text, View} from 'react-native'
import React, {useState,useEffect} from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import ColonnaSinistra from '../componenti/componentiSchermate/ColonnaSinistra';
import ColonnaDestra from '../componenti/componentiSchermate/ColonnaDestra';
import Footer from '../componenti/componentiSchermate/Footer';
import Header from '../componenti/componentiSchermate/Header';
import { getStileContenitoreColonnaCentrale} from '../stili/stiliColonne';
import useColonneStandard from '../hooks/useColonneStandard ';
import useColonneOpzionali from '../hooks/useColonneOpzionali';


const Home = () => {

  const [tipo, setTipo] = useState('tipoApp1');

  const {
    windowHeight: standardWindowHeight, 
    windowWidth: standardWindowWidth, 
    headerHeight: standardHeaderHeight, 
    footerHeight: standardFooterHeight, 
    leftColumnStyles: standardLeftColumnStyles, 
    centralColumnStyles: standardCentralColumnStyles, 
    showColonnaSinistra: showStandardColonnaSinistra, 
    showColonnaDestra: showStandardColonnaDestra
  } = useColonneStandard(tipo);

  const {
    windowHeight: optionalWindowHeight, 
    windowWidth: optionalWindowWidth, 
    headerHeight: optionalHeaderHeight, 
    footerHeight: optionalFooterHeight, 
    leftColumnStyles: optionalLeftColumnStyles, 
    centralColumnStyles: optionalCentralColumnStyles, 
    showColonnaSinistra: showOptionalColonnaSinistra, 
    showColonnaDestra: showOptionalColonnaDestra,
    showWarningMessage
  } = useColonneOpzionali(tipo);  


  const stileContenitoreColonnaCentrale = getStileContenitoreColonnaCentrale(
    standardLeftColumnStyles,
    standardCentralColumnStyles,             
    standardWindowHeight,  
    standardHeaderHeight, 
    standardFooterHeight
  );



  return (
    <SafeAreaView style={{flex:1}}>
       
        <Header windowWidth={standardWindowWidth} headerHeight={standardHeaderHeight} />
   
        <ColonnaSinistra />
        <ColonnaDestra  />    
 
        <View style={stileContenitoreColonnaCentrale}>
          <Text>Colonna CENTRALE</Text> 
        </View>

        <Footer windowWidth={standardWindowWidth} footerHeight={standardFooterHeight} />
 
</SafeAreaView>
    
  )
}

export default Home

