import React from 'react';
import { TouchableOpacity, Text, View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

const ModernButton = ({ title,coloreTesto, onPress, colors, width, height }) => {
  return (
    <TouchableOpacity onPress={onPress} style={{
      marginVertical: 10,
      borderRadius: 25,
      overflow: 'hidden',
     // elevation: 5, // For Android shadow
      borderWidth: 2, // Cornice intorno al bottone
      borderColor: '#3b5998', // Colore della cornice
    // elevation: 5, // Per l'ombra su Android
      backgroundColor: '#fff', // Colore di sfondo per l'effetto pannello
      width: width || 200, // Larghezza del bottone
      height: height || 50, // Altezza del bottone
    }}>
      <LinearGradient
        colors={colors || ['#4c669f', '#3b5998', '#192f6a']}
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
          borderRadius: 25,
        }}
      >
        <Text style={{
          color: coloreTesto,
          fontSize: 18,
          fontWeight: 'bold',
          textTransform: 'uppercase',
        }}>{title}</Text>
      </LinearGradient>
    </TouchableOpacity>
  );
};

export default ModernButton;