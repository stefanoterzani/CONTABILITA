import { StyleSheet, Text, View } from 'react-native'
import React, { useContext, useState,useEffect} from 'react';
import { useSelector} from 'react-redux';


const ColonnaDestra = () => {
    
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
              showColonnaDestra
                   } = useSelector((state) => state.columnDimensions)

                 //  console.log("showColonnaDestra",showColonnaDestra)
                   
  return (
  <View style={[styles.container,{
          backgroundColor:showColonnaDestra ?  'lightblue' : 'gray',
          right: showColonnaDestra ?  rightColumnLeft :0, 
          top:headerHeight, 
          width:rightColumnWidth, 
          height:windowHeight-footerHeight-headerHeight, 
          borderTopWidth:showColonnaDestra ?  2 :bordoSopraSotto, 
          borderBottomWidth:showColonnaDestra ?  2 :bordoSopraSotto, 
          borderLeftWidth:showColonnaDestra ?  5 : bordoDxColonnaDx,
          borderRightWidth:bordoDxColonnaDx,
          borderTopLeftRadius: showColonnaDestra ?  15 : 0,
          borderBottomLeftRadius: showColonnaDestra ?  15 : 0,
          borderLeftColor: showColonnaDestra ?  'lightgray' : 'white',
          borderBottomColor:showColonnaDestra ?  'lightgray' : 'white',
          }]}>
  
  
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