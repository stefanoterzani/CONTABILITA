import { StyleSheet, Text, View ,Platform} from 'react-native'
import React, { useState,useEffect} from 'react';
import MenuComponent from '../MenuComponent'
import { useSelector} from 'react-redux';
import { getStileContenitoreColonnaSinistra } from '../../stili/stiliColonne';

const ColonnaSinistra = ({ tipo }) => {
  const { showColonnaSinistra, leftColumnStyles,
    windowHeight, windowWidth, 
    headerHeight, footerHeight,  } = useSelector((state) => state[tipo]);

   

  if (!showColonnaSinistra) {
    return null;
  }
 
     
const stileContenitoreColonnaSinistra = getStileContenitoreColonnaSinistra(leftColumnStyles, windowHeight, windowWidth, headerHeight, footerHeight);
 
  
  return (
    <View style={stileContenitoreColonnaSinistra}>

          <Text>Colonna Sinistra </Text> 

          
      <MenuComponent/>

    </View>
  );
};

export default ColonnaSinistra;

