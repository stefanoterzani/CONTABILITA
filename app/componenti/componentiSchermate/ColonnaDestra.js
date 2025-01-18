import { StyleSheet, Text, View } from 'react-native'
import React, { useContext, useState,useEffect} from 'react';
import { useSelector} from 'react-redux';
import { getStileContenitoreColonnaDestra } from '../../stili/stiliColonne';

const ColonnaDestra = ({tipo}) => {
    
 // console.log('IN COLONNA DESTRA', 'tipo',tipo)       

                 //  console.log("showColonnaDestra",showColonnaDestra)
   const { showColonnaDestra, 
    rightColumnStyles, 
    windowHeight, windowWidth,
    headerHeight, 
    footerHeight } = useSelector((state) => state[tipo]);


  
/*
     console.log('IN COLONNA DESTRA', 'windowHeight',windowHeight) 
     console.log('IN COLONNA DESTRA', 'showColonnaDestra',showColonnaDestra)            
     console.log('IN COLONNA DESTRA width:',rightColumnStyles.width, )
     console.log('IN COLONNA DESTRA' , 'styleColonnadESTRA',rightColumnStyles)
     console.log('IN COLONNA DESTRA headerHeight' ,headerHeight)
     console.log('IN COLONNA DESTRA footerHeight' ,footerHeight)
   */
     if (!showColonnaDestra) { return null; }

    const stileContenitoreColonnaDestra = getStileContenitoreColonnaDestra(rightColumnStyles, windowHeight, windowWidth, headerHeight, footerHeight);
 return (
  <View style={stileContenitoreColonnaDestra}>

  <Text>Colonna DESTRA </Text> 



</View>
  

 
  )
}

export default ColonnaDestra



 /*
 
 <View style={{
    position:'absolute',
    backgroundColor:rightColumnStyles.background,
    width: rightColumnStyles.width, 
    height:windowHeight - headerHeight - footerHeight-(rightColumnStyles.margineSopraSotto*2),
    top: headerHeight+rightColumnStyles.margineSopraSotto,
    right:0,
      borderTopColor: rightColumnStyles.borderTopColor, 
       borderTopWidth: rightColumnStyles.borderTopWidth, 
       borderBottomColor: rightColumnStyles.borderBottomColor, 
       borderBottomWidth: rightColumnStyles.borderBottomWidth, 
       borderLeftColor: rightColumnStyles.borderLeftColor, 
       borderLeftWidth: rightColumnStyles.borderLeftWidth, 
       borderRightColor: rightColumnStyles.borderRightColor, 
       borderRightWidth: rightColumnStyles.borderRightWidth, 
       borderTopLeftRadius: rightColumnStyles.borderTopLeftRadius,
       borderBottomLeftRadius: rightColumnStyles.borderBottomLeftRadius,
    zIndex:9,
  }}>

  </View>
    
  
  
     
    
 
 
 */