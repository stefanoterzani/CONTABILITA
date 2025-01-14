import { StyleSheet, Text, View } from 'react-native'
import React, { useState,useEffect} from 'react';
import MenuComponent from './MenuComponent'
import { useSelector} from 'react-redux';

const ColonnaSinistra = () => {
    

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
          showColonnaSinistra
               }= useSelector((state) => state.columnDimensions)
              

     console.log("showColonnaSinistra",showColonnaSinistra)
        
       
       
    
  return (
    
    <View style={[styles.container,{
        left:leftColumnLeft, 
        top:headerHeight, 
        backgroundColor:showColonnaSinistra ? 'yellow' :'gray',
        width:leftColumnWidth, 
        height:windowHeight-footerHeight-headerHeight, 
        borderTopWidth:showColonnaSinistra ?  2 :bordoSopraSotto, 
        borderBottomWidth:showColonnaSinistra ?  2 :bordoSopraSotto, 
        borderLeftWidth:bordoSnColonnaSn,
        borderRightWidth:showColonnaSinistra ?  5 : bordoDxColonnaSn,
        borderTopRightRadius: showColonnaSinistra ?  15 : 0,
        borderBottomRightRadius: showColonnaSinistra ?  15 : 0,
        borderRightColor: showColonnaSinistra ?  'lightgray' : 'white',
        borderBottomColor:showColonnaSinistra ?  'lightgray' : 'white',
        }]}>

<MenuComponent/>

</View>
  )
}

export default ColonnaSinistra

const styles = StyleSheet.create({
 container:{
position:'absolute',

borderLeftColor:'white',
borderRightColor:'white',
borderTopColor:'white',
borderBottomColor:'white',
zIndex:10,
 }
});