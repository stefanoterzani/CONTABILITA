import { StyleSheet, Text, View,Platform ,Pressable} from 'react-native'
import React, { useState, useContext, useRef } from 'react';
import { AuthContext } from '../context/AuthContext';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import Tooltip from '../components/Tooltip';

const Header = ({ screenName, icon, onIconPress }) => {
    const [piattaforma,setPiattaforma] = useState(Platform.OS);
    const { logoutUser, loading,dataUser,aziendaId} = useContext(AuthContext);
    const [tooltipVisible, setTooltipVisible] = useState(false);
  const [tooltipPosition, setTooltipPosition] = useState({});
  const [tooltipArrowPosition, setTooltipArrowPosition] = useState('left');
  const iconRef = useRef(null);

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
         <View style={[styles.snHeader,piattaforma==='web' ? {width:'10%'} : {width:'22%'}]}>
            <Text style={{}}>logo</Text>
         </View>

         <View style={[styles.centroHeader,piattaforma==='web' ? {width:'77%'} : {width:'53%'}]}>
              <Text style={{fontSize:20,fontFamily:'Poppins-Bold',marginBottom:0,lineHeight: 30}}>{screenName}</Text>
         <Text style={{fontSize:18,fontFamily:'Poppins-Regular',marginTop:0,lineHeight: 18}}>{dataUser?.nome}</Text>
         </View>

         <View style={[styles.dxHeader,piattaforma==='web' ? {width:'10%'} : {width:'22%'}]}>
            <Pressable  
                onPress={onIconPress} 
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
                style={{justifyContent:'center',alignItems:'center'}} 
                >
                <MaterialCommunityIcons name={icon} size={30} color="black" style={{marginRight:10}} />
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

export default Header

const styles = StyleSheet.create({ 
    header:{
    width: '100%',
    height: '7%',
   // backgroundColor:'grey',
   // flexDirection: 'row',
   // justifyContent: 'space-between',
   
    borderColor:'grey',
    borderBottomWidth:1,
    flexDirection:'row',
    justifyContent:'space-between',
    height:'10%'
  },
    dxHeader:{
      height:'100%',
      borderColor:'blue',
      borderWidth:0,
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
    //  backgroundColor:'blue'
    },
    centroHeader:{
      height:'100%',
      borderColor:'blue',
      borderWidth:0,
      justifyContent:'center',
      alignItems:'center',
     
    
    },
})