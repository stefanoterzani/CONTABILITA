import { StyleSheet, Text, View } from 'react-native'
import React, { useContext, useState,useEffect} from 'react';
import { useSelector} from 'react-redux';
import { getStileContenitoreColonnaDestra } from '../../stili/stiliColonne';

const ColonnaDestra = () => {
    
  const standardColumn = useSelector((state) => state.standardColumn);
  const optionalColumn = useSelector((state) => state.optionalColumn);
   
  const isStandardColumnVisible = standardColumn.showColonnaDestra;
  const isOptionalColumnVisible = optionalColumn.showColonnaDestra;
  
  if (!isStandardColumnVisible && !isOptionalColumnVisible) {
    return null;
  }


  const stileContenitoreColonnaDestra = isStandardColumnVisible 
        ? getStileContenitoreColonnaDestra(
                                standardColumn.rightColumnStyles, 
                                standardColumn.windowHeight,standardColumn.windowWidth,                                
                                standardColumn.headerHeight,standardColumn.footerHeight )
        : getStileContenitoreColonnaDestra(
                                optionalColumn.rightColumnStyles, 
                                optionalColumn.windowHeight, optionalColumn.windowWidth,
                                optionalColumn.headerHeight, optionalColumn.footerHeight );
  
  
  const colonnaTipo = isStandardColumnVisible ? 'standardColumn' : 'optionalColumn';
      
 return (
  <View style={stileContenitoreColonnaDestra}>

      <Text>Colonna Destra ({colonnaTipo})</Text>

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
  
/*
     console.log('IN COLONNA DESTRA', 'windowHeight',windowHeight) 
     console.log('IN COLONNA DESTRA', 'showColonnaDestra',showColonnaDestra)            
     console.log('IN COLONNA DESTRA width:',rightColumnStyles.width, )
     console.log('IN COLONNA DESTRA' , 'styleColonnadESTRA',rightColumnStyles)
     console.log('IN COLONNA DESTRA headerHeight' ,headerHeight)
     console.log('IN COLONNA DESTRA footerHeight' ,footerHeight)
   */