import {SafeAreaView, Text, TouchableOpacity, View , Platform,Button} from "react-native";
import React, { useContext, useState,useEffect} from 'react';
import {useRouter } from "expo-router";
import { ColumnDimensionsContext } from './context/ColumnDimensionsContext';


const Index=() =>{
  const router = useRouter();

  const { windowHeight, windowWidth, leftColumnWidth, centralColumnWidth, rightColumnWidth } = useContext(ColumnDimensionsContext);
    return ( 
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}> 
    <TouchableOpacity onPress={() => router.push('Home')}>
        <Text style={{fontSize:30}}>vai alla home </Text> 
        </TouchableOpacity>
     </View> 
     ); 
     }; 
     
     export default Index;
  
