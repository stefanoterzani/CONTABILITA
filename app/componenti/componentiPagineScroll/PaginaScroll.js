import { View,ScrollView, Platform ,Text,StyleSheet,TouchableOpacity} from 'react-native'
import React ,{useRef,useEffect, useState} from 'react'
import AntDesign from '@expo/vector-icons/AntDesign';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { useSelector, useDispatch } from 'react-redux';
import BarraScroll from '../componentiPagineScroll/BarraScroll';

const PaginaScroll =  ({scrollWidth,scrollHeight,children,barra,barraInserisciElimina,onNuovo, onElimina}) => {
    const scrollViewRef = useRef(null);
    const dispatch = useDispatch();
    const [scrollPosition, setScrollPosition] = useState(0);
    const [isMobile,setIsMobile] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [barraVisibile,setBarraVisibile]=useState(false)
    const [inserisciEliminaVisibile,setInserisciEliminaVisibile]=useState(false)
    const pagine = useSelector((state) => state.pagine);
    const [maxPage, setMaxPage] = useState(0); // Utilizza useState per gestire maxPage
    const [barraOpacity, setBarraOpacity] = useState(0.2); 

// console.log('BARRA',barra,barraInserisciElimina)

 const handleMouseEnter = () => {
//  console.log('MOUSE ENTER')
  setBarraOpacity(1); // Imposta l'opacità a 1 quando il mouse entra
};

const handleMouseLeave = () => {
//  console.log('MOUSE leave')
  setBarraOpacity(0.5); // Imposta l'opacità a 0.5 quando il mouse esce
};

const handleTouchStart = () => {
//  console.log('MOUSE touch')
  setBarraOpacity(1); // Imposta l'opacità a 1 quando il touch inizia
};

const handleTouchEnd = () => {
//  console.log('MOUSE touchend')
  setBarraOpacity(0.5); // Imposta l'opacità a 0.5 quando il touch finisce
};

useEffect(() => {
 
 if (Platform.OS === 'ios' || Platform.OS === 'android') {
   setIsMobile(true);
 } else {
    setIsMobile(false);
 }
//console.log("barra",barra)
 if(barra=== true){
  setBarraVisibile(true)
  if (barraInserisciElimina===true) {
    setInserisciEliminaVisibile(true)
  } else {
    setInserisciEliminaVisibile(false)
  }

 }  else {
  setBarraVisibile(false)
  }
 

},[barra])

useEffect(() => {
  const max=React.Children.count(children) - 1
 // console.log('MAX',max)
  setMaxPage(React.Children.count(children) - 1); // Aggiorna maxPage quando children cambia
}, [children]);

useEffect(() => {
  if (pagine.length > 0) {
    scrollViewRef.current?.scrollToEnd({ animated: true });
  }
}, [pagine]);

const handleScroll = (event) => {
  const contentOffsetX = event.nativeEvent.contentOffset.x;
  setScrollPosition(contentOffsetX);
   const pageWidth = scrollWidth;
  const newCurrentPage = Math.round(contentOffsetX / pageWidth) + 1;
  setCurrentPage(newCurrentPage);
};;

const handleScrollEndDrag = () => {
  const pageWidth = scrollWidth;
  let currentPage = Math.round(scrollPosition / pageWidth);
  const offset = scrollPosition - currentPage * pageWidth;

  const maxPage = React.Children.count(children) - 1;
  if (currentPage < 0) {
    currentPage = 0;
  } else if (currentPage > maxPage) {
    currentPage = maxPage;
  }

  if (scrollViewRef.current) {
    if (offset > pageWidth * 0.2) {
      scrollViewRef.current.scrollTo({ x: (currentPage + 1) * pageWidth, animated: true });
    } else {
      scrollViewRef.current.scrollTo({ x: currentPage * pageWidth, animated: true });
    }
  }
};
    
const handlePageJump = (pageIndex) => {
  if (scrollViewRef.current) {
    scrollViewRef.current.scrollTo({ x: pageIndex * scrollWidth, animated: true });
    setCurrentPage(pageIndex + 1);
  }
};
    
const handleNextPage = () => {
  const pageWidth = scrollWidth;
  let currentPage = Math.round(scrollPosition / pageWidth);
  const maxPage = React.Children.count(children) - 1;
  if (currentPage < maxPage) {
    handlePageJump(currentPage + 1);
  }
};
    
const handlePrevPage = () => {
  const pageWidth = scrollWidth;
  let currentPage = Math.round(scrollPosition / pageWidth);
  if (currentPage > 0) {
    handlePageJump(currentPage - 1);
  }
};
    
      const handleFirstPage = () => {
        handlePageJump(0);
      };
    
      const handleLastPage = () => {
        const maxPage = React.Children.count(children) - 1;
        handlePageJump(maxPage);
      };

      const handleNuovo = () => {
        if (onNuovo) {
          onNuovo();
        }
      };
    
      const handleElimina = () => {
        if (onElimina) {
          onElimina(currentPage);
        }
      };


   

    return (
      
      <View >
          <View>
             <ScrollView
                    ref={scrollViewRef}
                    horizontal
                    pagingEnabled={!isMobile}
                    showsHorizontalScrollIndicator={false}  
                    style={{width:scrollWidth,height:scrollHeight}}
                    onMomentumScrollEnd={handleScrollEndDrag}
                    onScroll={handleScroll}
                    onScrollEndDrag={handleScrollEndDrag}
                    scrollEventThrottle={16}
                >
                {React.Children.map(children, (child, index) =>  ( 
                    <View key={index} style={{
                    }}> 
                        {child} 
                    </View> 
                ))}
             </ScrollView>
           
           </View>
           {barraVisibile && (
           <View style={[styles.barraContainer,{width:scrollWidth, opacity: barraOpacity }]}
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
              onTouchStart={handleTouchStart}
              onTouchEnd={handleTouchEnd}
           >
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
           )}


       </View>   
          
      
   
          
        
       
  )
}
const styles = StyleSheet.create({
  barraContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor:'rgba(173, 216, 230, 0.18)',
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
export default PaginaScroll