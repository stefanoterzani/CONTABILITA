import { StyleSheet, Text, View,TouchableOpacity,Platform } from 'react-native'
import React ,{useRef,useEffect, useState} from 'react'
import AntDesign from '@expo/vector-icons/AntDesign';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';

export const BarraScroll = (
    scrollWidth,
    inserisciEliminaVisibile,
    handleElimina,
    handleFirstPage,
    handlePrevPage,
    handleNextPage,
    handleLastPage,
    handleNuovo,
  // currentPage,
   maxPage  
) => {

 const [currentPage, setCurrentPage] = useState(1);
  console.log('BARRA SCROLL MAX PAGE',maxPage)
  return (
    <View style={[styles.barraContainer,{width:scrollWidth}]}>
                <View style={[styles.barra]}>
                {inserisciEliminaVisibile && 
                  <TouchableOpacity onPress={handleElimina} style={[styles.arrowButton,{paddingRight:Platform.OS ==='web' ? '4%' : '2%' }]}>
                    <MaterialIcons name="cancel" size={24} color="red" />
                  </TouchableOpacity>
                }
                  <View style={styles.pageNumberContainer}>
                      <Text style={styles.pageNumber}>1</Text>
                  </View>
                 
                  <TouchableOpacity onPress={handleFirstPage} style={styles.arrowButton}>
                      <AntDesign name="stepbackward" size={16} color="black" />
                  </TouchableOpacity>
                  <TouchableOpacity onPress={handlePrevPage} style={styles.arrowButton}>
                      <AntDesign name="caretleft" size={16} color="black" />
                  </TouchableOpacity>
                  <View style={styles.pageNumberContainer}>
                      <Text style={styles.currentPageNumber}>{currentPage}</Text>
                  </View>
                  <TouchableOpacity onPress={handleNextPage} style={styles.arrowButton}>
                      <AntDesign name="caretright" size={16} color="black" />
                  </TouchableOpacity>
                  <TouchableOpacity onPress={handleLastPage} style={styles.arrowButton}>
                      <AntDesign name="stepforward" size={16} color="black" />
                  </TouchableOpacity>
                  <View style={styles.pageNumberContainer}>
                      <Text style={styles.pageNumber}>{maxPage}</Text>
                  </View>
                  {inserisciEliminaVisibile && 
                  <TouchableOpacity onPress={handleNuovo} style={[styles.arrowButton,{paddingLeft:Platform.OS ==='web' ? '4%' : '2%' }]}>
                  <MaterialIcons name="add-circle" size={24} color="green" />
                  </TouchableOpacity>
                  }
               
                </View>
            </View>
  )
}

export default BarraScroll
const styles = StyleSheet.create({
    barraContainer: {
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor:'lightgray',
    //  height:30
    
    },
    barra: {
      flexDirection: 'row',
      alignItems: 'center',
      borderColor: 'lightgray',
     
    },
    arrowButton: {
      marginHorizontal: 10,
      paddingHorizontal:7, // Aumenta il padding per aumentare l'area touchable
    },
    pageNumberContainer: {
      backgroundColor: 'gray',
      borderRadius: 15,
      width:20,
      height: 20,
      justifyContent: 'center',
      alignItems: 'center',
    },
    pageNumber: {
      fontSize: 16,
      fontWeight: 'bold',
      color: 'white',
    },
    currentPageNumber: {
      fontSize: 16,
      fontWeight: 'bold',
      color: 'white',
    },
    
  });
