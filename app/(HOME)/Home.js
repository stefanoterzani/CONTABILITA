import {Text, View,TouchableOpacity} from 'react-native'
import React, {useState} from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';

import ColonnaSinistra from '../componenti/ColonnaSinistra';
import ColonnaDestra from '../componenti/ColonnaDestra';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';

import { useSelector,useDispatch} from 'react-redux';
import { toggleLeftColumnWidth } from '../redux/slice/columnDimensionSlice';
import { toggleRightColumnWidth } from '../redux/slice/columnDimensionSlice';

const Home = () => {
  const dispatch = useDispatch();

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
    isMobile,
    setLeftColumnWidth,setRightColumnWidth,
    showColonnaSinistra,
        }= useSelector((state) => state.columnDimensions);

      
const [showColonnaDestra, setShowColonnaDestra] = useState(false);
//const [showColonnaSinistra, setShowColonnaSinistra] = useState(false);


  return (

    
    <SafeAreaView style={{flex:1}}>



  
        <View 
            style={{position: 'absolute', 
              backgroundColor:'blue',
              top:0,
              left: 0,
              width:windowWidth,
              height: headerHeight,                 
              flexDirection:'row'}}>
                 <View style={{width:'15%',height:'100%',borderColor:'red',borderWidth:1,justifyContent:'center',alignItems:'center'}}>
                        { windowWidth < 768 && (
                          <TouchableOpacity
                              onPress={()=>{ dispatch(toggleLeftColumnWidth())} } >
                              <MaterialIcons name="menu" size={30} color="white" />
                          </TouchableOpacity>
                       )}
                  </View>
                 
                  <View style={{width:'70%',height:'100%',borderColor:'red',borderWidth:1,alignItems:'center',justifyContent:'center'}}>
                      <Text style={{textAlign:'center' ,  color:'white'}}>{windowWidth.toFixed(2)} x {windowHeight.toFixed(2)}</Text>
                      <Text style={{textAlign:'center' ,  color:'white'}}>HOME</Text>
                  </View>   

                  <View style={{width:'15%',height:'100%',borderColor:'red',borderWidth:1,justifyContent:'center',alignItems:'center'}}>
                       
                          <TouchableOpacity onPress={()=>{ dispatch(toggleRightColumnWidth())} }>
                              <Text style={{color:'white',textAlign:'center', fontSize:16}}>Apriti Sesamo</Text> 
                          </TouchableOpacity>
                     
                  </View>


                </View>
    
               

   

     
        <View 
            style={{position: 'absolute', borderColo: 'blue', borderWidth:0,backgroundColor:'blue',
                    top:windowHeight- footerHeight,
                    left: 0,
                    width:windowWidth,
                    height: footerHeight,
                }}>
                <View style={{alignItems:'center'}}>
                  <Text style={{color:'white'}}>POSTO FOOTER</Text>
                  
                </View>
        </View>



<ColonnaSinistra  />


<ColonnaDestra  />
 



        
        <View style={{ position:'absolute',  
        flex:1,
                  top: headerHeight, 
                  left: centralColumnLeft, 
                  width:centralColumnWidth, 
                  height: windowHeight-footerHeight-headerHeight, 
                  borderColor:'white',
                  borderTopWidth: bordoSopraSotto,
                  borderBottomWidth:bordoSopraSotto,
                  borderLeftWidth: bordoSnColonnaCn,
                  borderRightWidth: bordoDxColonnaCn,
                  backgroundColor:'white'}}>

         
            

        </View>
       
      
    </SafeAreaView>
  )
}

export default Home

