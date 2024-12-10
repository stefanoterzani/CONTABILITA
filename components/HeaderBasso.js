import { StyleSheet, Text, View,Platform ,Pressable} from 'react-native'
import React, { useState, useContext, useRef } from 'react';
import { AuthContext } from '../context/AuthContext';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import Tooltip from './Tooltip';

const HeaderBasso = ({ screenName, icon, onIconPress }) => {
    const [piattaforma,setPiattaforma] = useState(Platform.OS);
    const { logoutUser, loading,dataUser,aziendaId} = useContext(AuthContext);
    const [tooltipVisible, setTooltipVisible] = useState(false);
  const [tooltipPosition, setTooltipPosition] = useState({});
  const [tooltipArrowPosition, setTooltipArrowPosition] = useState('left');
  const iconRef = useRef(null);
//console.log('SONO HEADER BASSO')
  const handleMouseEnter = () => {
    if (iconRef.current) {
      iconRef.current.measure((fx, fy, width, height, px, py) => {
        setTooltipPosition({ top: py - height - 10, left: px + width / 2 - 10 });
        setTooltipArrowPosition(px < window.innerWidth / 2 ? 'left' : 'right');
        setTooltipVisible(true);
      });
    }
  };
    const handleMouseLeave = () => {
      setTooltipVisible(false);
    };
  
    return (
    <View style={styles.header}>
         <View style={[styles.snHeader,piattaforma==='web' ? {width:'20%'} : {width:'25%'}]}>
           
            <Text style={{fontFamily:'Poppins-Bold',color:'white'}}>{dataUser?.nome}</Text>
         </View>

         <View style={[styles.centroHeader]}>
         
              <Text style={{fontSize:20,color:'white',fontFamily:'Poppins-SemiBold',marginBottom:0,lineHeight: 30}}>{screenName}</Text>
      
         </View>

         <View style={[styles.dxHeader,piattaforma==='web' ? {width:'20%'} : {width:'25%'}]}>
            <Pressable  
                onPress={onIconPress} 
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
                style={{justifyContent:'center',alignItems:'center'}} 
                >
                <MaterialCommunityIcons name={icon} size={30} color='white' style={{marginRight:10}} />
            </Pressable>
            <Tooltip
             visible={tooltipVisible}
              onClose={() => setTooltipVisible(false)}
              posizione={tooltipPosition}
              posizioneFreccia={tooltipArrowPosition}
              testo="Premendo questa icona disconnetti l utente"
      />
        </View>
        </View>
  )
}

export default HeaderBasso

const styles = StyleSheet.create({ 
header:{
    width: '100%',
    //height: '5%',
  backgroundColor:'rgb(0, 26, 255)',
   // flexDirection: 'row',
   // justifyContent: 'space-between',
   
    borderColor:'blue',
    borderWidth:2,
    flexDirection:'row',
    justifyContent:'space-between',
    height:'5%'
  },
    dxHeader:{
      height:'100%',
      borderColor:'blue',
      borderWidth:1,
      justifyContent:'center',
      alignItems:'center',
      flexDirection:'column'
     // backgroundColor:'blue'
    },
    snHeader:{
      height:'100%',
      borderColor:'blue',
      borderWidth:0,
      justifyContent:'center',
     alignItems:'center',
      borderColor:'blue',
      borderWidth:1,
    //  backgroundColor:'blue'
    },
    centroHeader:{
      height:'100%',
      borderColor:'blue',
      borderWidth:1,
      justifyContent:'center',
      alignItems:'center',
     
    
    },
})