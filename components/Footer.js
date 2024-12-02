// src/components/Footer.js
import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

const Footer = ({ icons }) => {
  return (
    <View style={styles.footer}>
      {icons.map((icon, index) => (
        <TouchableOpacity 
          key={index} 
          onPress={icon.onPress} 
          style={styles.iconContainer}
        >
          <MaterialCommunityIcons
            name={icon.name}
            size={icon.size}
            color={icon.color}
          />
          {icon.badge > 0 && (
            <View style={styles.badge}>
              <Text style={styles.badgeText}>{icon.badge}</Text>
            </View>
          )}
        </TouchableOpacity>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
    footer: {
        position: 'absolute',
        bottom: 0,
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
        height:'7%',
       // marginTop:10,
      // gap:'30%',
        paddingHorizontal: 20, // Aggiungi padding orizzontale per spostare le icone verso il centro
        borderColor:'blue',
        borderWidth:1,
        backgroundColor:'rgb(0, 26, 255)',
        
      },
  iconContainer: {
    position: 'relative',
  },
  badge: {
    position: 'absolute',
    right: -6,
    top: -3,
    backgroundColor: 'red',
    borderRadius: 6,
    width: 12,
    height: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  badgeText: {
    color: 'white',
    fontSize: 8,
    fontWeight: 'bold',
  },
});

export default Footer;