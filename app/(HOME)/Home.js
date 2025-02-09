import {Text, View} from 'react-native'
import React, {useState,useEffect,useCallback} from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import ColonnaSinistra from '../componenti/componentiSchermate/ColonnaSinistra';
import ColonnaDestra from '../componenti/componentiSchermate/ColonnaDestra';
import Footer from '../componenti/componentiSchermate/Footer';
import Header from '../componenti/componentiSchermate/Header';
import { getStileContenitoreColonnaCentrale} from '../stili/stiliColonne';
import useColonneStandard from '../hooks/useColonneStandard ';
import useColonneOpzionali from '../hooks/useColonneOpzionali';
import { useDispatch, useSelector } from 'react-redux';
import {resetTipoContenuto,resetRisposta} from '../redux/slice/colonnaDestraSlice'
import { useFocusEffect } from '@react-navigation/native';
import { updateTime } from '../redux/slice/timeSlice'; 

const Home = () => {
  const dispatch = useDispatch();
  const currentTime = useSelector((state) => state.time.currentTime);
  const [tipo, setTipo] = useState('tipoApp1');

  useFocusEffect(
   useCallback(() => {
      // Dispatch per pulire tipoContenuto e risposta quando il componente diventa attivo
      dispatch(resetTipoContenuto());
      dispatch(resetRisposta());
    }, [dispatch])
  );

  useEffect(() => {
    const timer = setInterval(() => {
      dispatch(updateTime());
    }, 1000); // Aggiorna ogni secondo

    return () => clearInterval(timer); // Pulisci il timer quando il componente viene smontato
  }, [dispatch]);

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
       
        <Header windowWidth={standardWindowWidth} headerHeight={standardHeaderHeight} titolo='Home' />
      
        <ColonnaSinistra />
        <ColonnaDestra  />    
 
        <View style={[stileContenitoreColonnaCentrale,{alignItems:'center',justifyContent:'center'}]}>
          <Text style={{color:'orange',fontSize:30,fontFamily:'Roboto-Medium'}}>Colonna CENTRALE</Text> 
        </View>
 
        <Footer windowWidth={standardWindowWidth} footerHeight={standardFooterHeight} />

</SafeAreaView>
    
  )
}

export default Home

