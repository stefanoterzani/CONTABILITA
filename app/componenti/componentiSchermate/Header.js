// components/Header.js
import React,{useState,useEffect} from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { useDispatch, useSelector } from 'react-redux';
import { toggleLeftColumn ,toggleRightColumn} from '../../redux/slice/SliceColonnaOpzionale';
import { useRouter } from 'expo-router';


const Header = ({ windowWidth, headerHeight,titolo }) => {

const router = useRouter(); 
const dispatch = useDispatch();
const currentTime = useSelector((state) => state.time.currentTime);
const currentDate = useSelector((state) => state.time.currentDate);
const currentDay = useSelector((state) => state.time.currentDay);
const isRightColumnVisible = useSelector((state) => state.optionalColumn.showColonnaDestra);


  return (
    <View style={{
      position: 'absolute', 
      backgroundColor:'blue',
      top:0,
      left: 0,
      width: windowWidth,
      height: headerHeight,                 
      flexDirection:'row',
      borderTopLeftRadius:20,
      borderTopRightRadius:20
    }}>

      <View style={{
        width:'8%',
        height:'100%',
        justifyContent:'center',
        alignItems:'center',
        borderColor:'white',
        borderWidth:1
      }}>
       
          <TouchableOpacity onPress={() => router.back() }>
            <MaterialIcons name="home" size={30} color="white" />
          </TouchableOpacity>
     
      
      </View>

      <View style={{
        width:'8%',
        height:'100%',
        justifyContent:'center',
        alignItems:'center',
        borderColor:'white',
        borderWidth:1
      }}>
        { windowWidth < 768 && (
          <TouchableOpacity onPress={() => dispatch(toggleLeftColumn())}>
            <MaterialIcons name="menu" size={30} color="white" />
          </TouchableOpacity>
        )}
      
      </View>

      <View style={{
        width:'68%',
        height:'100%',
        justifyContent:'center',
        alignItems:'center',
        borderColor:'white',
        borderWidth:1
      }}>
      <Text style={{ textAlign:'center', color:'white' ,fontSize:12}}>Window: {' '}  {windowWidth.toFixed(2)} 
      {'    '} {currentDay} {currentDate}  ({currentTime})</Text>
        <Text style={{ textAlign:'center', color:'white', fontSize:20,fontFamily:'Roboto-Medium' }}>
         {titolo}
        </Text>
      </View>  
       


      <View style={{
        width:'8%',
        height:'100%',
        justifyContent:'center',
        alignItems:'center',
        borderColor:'white',
        borderWidth:1
      }}>                  
         <Text style={{ color:'white', textAlign:'center', fontSize:18 }}>X</Text>            
      </View>




      <View style={{
        width:'8%',
        height:'100%',
        justifyContent:'center',
        alignItems:'center',
        borderColor:'white',
        borderWidth:1
      }}>                  
          <TouchableOpacity onPress={() => dispatch(toggleRightColumn())}>
          <Text style={{ color:'white', textAlign:'center', fontSize:18 }}>
            DX
          </Text> 
        </TouchableOpacity>                
      </View>



    </View>
  );
};

export default Header;

