import React, { useEffect, useContext, useRef,useState ,Platform} from 'react';
import { useRouter } from 'expo-router';
import { AuthContext } from '../context/AuthContext';
import {Animated, View, Text, Image, StyleSheet,ActivityIndicator, TouchableOpacity } from 'react-native';
import {colori} from '../costanti/colori';


export default function Index() {
 
 const { currentUser, loading,  dataUser} = useContext(AuthContext);
  const router = useRouter();


const BlinkingText = ({ children, style }) => {
  const opacity = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const blink = Animated.loop(
      Animated.sequence([
        Animated.timing(opacity, {
          toValue: 1,
          duration: 500,
          useNativeDriver: true,
        }),
        Animated.timing(opacity, {
          toValue: 0,
          duration: 500,
          useNativeDriver: true,
        }),
      ])
    );
    blink.start();
    return () => blink.stop();
  }, [opacity]);

  return (
    <Animated.Text style={{ ...style, opacity }}>
      {children}
    </Animated.Text>
  );
};
  
useEffect(() => {
 // console.log('INDEX loading=',loading, "USER",currentUser)
    if (!loading && currentUser) {        
         
         router.replace('/home')          
      }
   }, [currentUser, loading]);


if (loading ) {
      return (
          <View style={styles.container}>
              <ActivityIndicator size="large" color="red" />
              <Text style={{ fontSize: 20, color: 'red' }}>Sto caricando...</Text>
          </View>
      );
  }

  return (
      <View style={styles.container}>
     
      {!currentUser  && (
          <View style={{marginTop:'20%'}}>
              <Text style={{color:'white', fontSize:40, fontFamily:'Poppins-Bold', textAlign:'center'}} >Benvenuto nella tua app!</Text>
          
           <View style={{alignItems:'center',marginTop:'10%'}}>
              <Image source={require('../assets/images/business.jpg')} style={{ borderRadius:10, borderColor:'white', borderWidth:2,width:'100%', height:'70%', }}/>
           </View>
         
           <TouchableOpacity
              onPress={() => router.replace('/(Auth)/SignIn')}
              style={{borderColor:'blue', borderWidth:2, borderRadius:10,  alignItems:'center'}} >
              
              <BlinkingText>
              <Text style={{fontFamily:'Poppins-Bold', fontSize:30,color:'white'}}> Vai al Login</Text>
              </BlinkingText>
          </TouchableOpacity>

          </View>
        )}    
      </View>
 

  );

  
}

const styles = StyleSheet.create({
  container: {
      flex: 1,
     // justifyContent: 'center',
      alignItems: 'center',
    backgroundColor: colori.index.background,
  },
})

