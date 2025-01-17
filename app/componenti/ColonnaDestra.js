import { StyleSheet, Text, View } from 'react-native'
import React, { useContext, useState,useEffect} from 'react';
import { useSelector} from 'react-redux';


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

     console.log('DESTRA  styleColonna destra',rightColumnStyles,tipo)
 return (

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

 
  )
}

export default ColonnaDestra

const styles = StyleSheet.create({
  container:{
 position:'absolute',
 backgroundColor:'gray',
 borderLeftColor:'white',
 borderRightColor:'white',
 borderTopColor:'white',
 borderBottomColor:'white',
 zIndex:10,
  }
 });


 /*
 
 
    <View style={{ 
        width: rightColumnStyles.width, 
        backgroundColor: rightColumnStyles.background,
       borderTopColor: rightColumnStyles.borderTopColor, 
       borderTopWidth: rightColumnStyles.borderTopWidth, 
       borderBottomColor: rightColumnStyles.borderBottomColor, 
       borderBottomWidth: rightColumnStyles.borderBottomWidth, 
       borderLeftColor: rightColumnStyles.borderLeftColor, 
       borderLeftWidth: rightColumnStyles.borderLeftWidth, 
       borderRightColor: rightColumnStyles.borderRightColor, 
       borderRightWidth: rightColumnStyles.borderRightWidth, 
       height: windowHeight - headerHeight - footerHeight, // Altezza calcolata 
       top: headerHeight, // Posizione calcolata 
       position: 'absolute', 
       right:0,
    }}>
  
     
       <Text>COLONNA DESTRA </Text>
            </View>
 
 
 */