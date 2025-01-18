// components/Header.js
import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { useDispatch, useSelector } from 'react-redux';
import { toggleLeftColumn ,showRightColumn,hideRightColumn} from '../../redux/slice/SliceColonnaOpzionale';


const Header = ({ windowWidth, headerHeight }) => {
  const dispatch = useDispatch();

const handleShowRightColumn = () => { 
 console.log('APRO DESTRA');
  dispatch(showRightColumn()); // Simula un evento che termina dopo 5 secondi e chiude la colonna destra setTimeout(() => { dispatch(hideRightColumn()); }, 5000); };
  setTimeout(() => { 
    console.log('CHIUDO DESTRA');
    dispatch(hideRightColumn()); 
  }, 5000); 

};
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
        width:'15%',
        height:'100%',
        justifyContent:'center',
        alignItems:'center'
      }}>
        { windowWidth < 768 && (
          <TouchableOpacity onPress={() => dispatch(toggleLeftColumn())}>
            <MaterialIcons name="menu" size={30} color="white" />
          </TouchableOpacity>
        )}
      </View>
      <View style={{
        width:'70%',
        height:'100%',
        justifyContent:'center',
        alignItems:'center'
      }}>
      <Text style={{ textAlign:'center', color:'white' }}> {windowWidth.toFixed(2)} </Text>
        <Text style={{ textAlign:'center', color:'white' }}>
          HOME
        </Text>
      </View>   
      <View style={{
        width:'15%',
        height:'100%',
        justifyContent:'center',
        alignItems:'center'
      }}>                  
        <TouchableOpacity onPress={ handleShowRightColumn }>
          <Text style={{ color:'white', textAlign:'center', fontSize:16 }}>
            Apriti Sesamo
          </Text> 
        </TouchableOpacity>                
      </View>
    </View>
  );
};

export default Header;

