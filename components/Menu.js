// src/components/Menu.js
import React, { useRef, useState } from 'react';
import { View, FlatList, Pressable, StyleSheet, Platform } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import MenuItem from './MenuItem'; // Assicurati che il percorso sia corretto

const Menu = ({ menuItems }) => {
  const flatListRef = useRef(null);
  const [currentIndex, setCurrentIndex] = useState(0);

 
  const scrollToNextItem = () => {
    const nextIndex = Math.min(currentIndex + 1, menuItems.length - 1);
    flatListRef.current.scrollToIndex({ animated: true, index: nextIndex });
    setCurrentIndex(nextIndex);
  };

  const scrollToPreviousItem = () => {
    const prevIndex = Math.max(currentIndex - 1, 0);
    flatListRef.current.scrollToIndex({ animated: true, index: prevIndex });
    setCurrentIndex(prevIndex);
  };
/*
  const handleScrollToIndexFailed = (info) => {
    const wait = new Promise(resolve => setTimeout(resolve, 500));
    wait.then(() => {
      flatListRef.current?.scrollToIndex({ index: info.index, animated: true });
    });
  };
*/
  return (
    <View style={styles.boxMenu}>
    {Platform.OS === 'web' && (
      <Pressable onPress={scrollToPreviousItem} >
     
      <MaterialCommunityIcons name="arrow-left-bold-box" size={40} color="blue" />
      
      </Pressable>
    )}
      <View style={styles.flatListContainer}>
        <FlatList
          ref={flatListRef}
          data={menuItems}
          renderItem={({ item }) => <MenuItem item={item} />}
          keyExtractor={(item) => item.label}
          horizontal
          showsHorizontalScrollIndicator={false}        
          style={Platform.OS === 'web' ? { width: '96%' } : { width: '100%' }}
        
        />
      </View>
      {Platform.OS === 'web' && (
      <Pressable onPress={scrollToNextItem} >
       
        <MaterialCommunityIcons name="arrow-right-bold-box" size={40} color="blue" />
        
      </Pressable>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
    boxMenu: {
        flexDirection: 'row',
        marginTop:20,
         alignItems: 'center',
        justifyContent: 'center',
         width: '90%',
      //  marginBottom: 10, // Aggiungi margine inferiore per separare il riquadro dei menu dalle icone
       height:'8%',
       borderColor:'green',
       borderWidth:0,
      
       },
    flatListContainer: {
    height:'60%', 
    width:'100%',
    alignItems: 'center',
    borderColor:'red',
    borderWidth:0
  },
 
});

export default Menu;