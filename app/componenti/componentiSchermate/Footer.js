
// components/Footer.js
import React from 'react';
import { View, Text } from 'react-native';

const Footer = ({ windowWidth, footerHeight }) => (
  <View style={{
    position: 'absolute', 
    backgroundColor:'blue',
    bottom: 0,
    left: 0,
    width: windowWidth,
    height: footerHeight,
    alignItems:'center',
    justifyContent:'center',
    borderBottomLeftRadius:20,
    borderBottomRightRadius:20
  }}>
    <Text style={{color:'white'}}>POSTO FOOTER</Text>
  </View>
);

export default Footer;
