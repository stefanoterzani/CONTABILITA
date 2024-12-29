import { View,ScrollView, Platform ,Text,StyleSheet,TouchableOpacity} from 'react-native'
import React ,{useRef,useEffect, useState} from 'react'
import AntDesign from '@expo/vector-icons/AntDesign';

const PaginaScroll = ({scrollWidth,scrollHeight,children,barra}) => {
    const scrollViewRef = useRef(null);
    const [scrollPosition, setScrollPosition] = useState(0);
const [isMobile,setIsMobile] = useState(null);
const [currentPage, setCurrentPage] = useState(1);
const [barraVisibile,setBarraVisibile]=useState(false)


useEffect(() => {
 
 if (Platform.OS === 'ios' || Platform.OS === 'android') {
   setIsMobile(true);
 } else {
    setIsMobile(false);
 }

 if(barra=== true){
  setBarraVisibile(true)
 }  else {
  setBarraVisibile(false)
  }
 
},[])


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

      const maxPage = React.Children.count(children);

    return (
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
                    <View key={index} style={{ width: scrollWidth, height: scrollHeight}}> 
                        {child} 
                    </View> 
                ))}
             </ScrollView>
             {barraVisibile && 
             <View style={[styles.barraContainer,{width:scrollWidth}]}>
                <View style={[styles.barra]}>
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
                </View>
            </View>
             }
          </View>
      
       
  )
}
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
    padding: 7, // Aumenta il padding per aumentare l'area touchable
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
