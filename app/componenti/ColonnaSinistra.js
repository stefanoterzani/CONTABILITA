import { StyleSheet, Text, View ,Platform} from 'react-native'
import React, { useState,useEffect} from 'react';
import MenuComponent from './MenuComponent'
import { useSelector} from 'react-redux';

const ColonnaSinistra = ({ tipo }) => {
  const { showColonnaSinistra, leftColumnStyles,
    windowHeight, windowWidth, 
    headerHeight, footerHeight,  } = useSelector((state) => state[tipo]);

    const [larghezzaColonna, setLarghezzaColonna] = useState(0);
 
/*
    console.log('SINISTRA headerHeight:',headerHeight, )
  console.log('SINISTRA width:',leftColumnStyles.width, )
  console.log('SINISTRA styleColonnaSinistra',leftColumnStyles)
  console.log('SINISTRA showColonnaSinistra',showColonnaSinistra)
  console.log('SINISTRA windowHeight',windowHeight, )
  console.log('SINISTRA windowWidth',windowWidth, )
*/


  if (!showColonnaSinistra) {
    return null;
  }
  console.log('SINISTRA styleColonnaSinistra',leftColumnStyles,tipo)

  useEffect(() => {
   
      Platform.OS === 'web' ? 
      setLarghezzaColonna (leftColumnStyles.width ) :
      setLarghezzaColonna('45%') 
  }, [showColonnaSinistra]);
 
    

 
  
  return (
    <View style={{ 
  
        width: leftColumnStyles.width, 
        backgroundColor: leftColumnStyles.background, 
        borderTopColor: leftColumnStyles.borderTopColor, 
        borderTopWidth: leftColumnStyles.borderTopWidth, 
        borderBottomColor: leftColumnStyles.borderBottomColor, 
        borderBottomWidth: leftColumnStyles.borderBottomWidth, 
        borderLeftColor: leftColumnStyles.borderLeftColor, 
        borderLeftWidth: leftColumnStyles.borderLeftWidth, 
        borderRightColor: leftColumnStyles.borderRightColor, 
        borderRightWidth: leftColumnStyles.borderRightWidth,
        borderTopRightRadius: leftColumnStyles.borderTopRightRadius,
        borderBottomRightRadius: leftColumnStyles.borderBottomRightRadius,
        height: windowHeight-headerHeight-footerHeight-(leftColumnStyles.margineSopraSotto*2), // Altezza 100% per coprire l'intera altezza disponibile 
        position: 'absolute', 
        top: headerHeight+leftColumnStyles.margineSopraSotto, 
        left: 0, 
        zIndex:10,
    }}>

          <Text>Colonna Sinistra </Text> 

          
      <MenuComponent/>

    </View>
  );
};

export default ColonnaSinistra;

