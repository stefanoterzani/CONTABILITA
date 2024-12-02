// MenuItem.js
import React, { useRef,useState } from 'react';
import { TouchableOpacity, Text, Animated, Platform, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';

const MenuItem = ({ item,onNavigate }) => {
  const scaleValue = useRef(new Animated.Value(1)).current;
  const router = useRouter();
  const [isActive, setIsActive] = useState(false);

  const handleMouseEnter = () => {
    setIsActive(true); // Imposta isActive su true
    Animated.spring(scaleValue, {
      toValue: 1.5,
      useNativeDriver: true,
    }).start();
  };

  const handleMouseLeave = () => {
    setIsActive(false); // Imposta isActive su false
    Animated.spring(scaleValue, {
      toValue: 1,
      useNativeDriver: true,
    }).start();
  };

  const handlePressIn = () => {
    setIsActive(true); // Imposta isActive su true
    Animated.spring(scaleValue, {
      toValue: 1.5,
      useNativeDriver: true,
    }).start();
  };

  const handlePressOut = () => {
    setIsActive(false); // Imposta isActive su fa
    Animated.spring(scaleValue, {
      toValue: 1,
      useNativeDriver: true,
    }).start();
  };
  const handlePress = () => {
    Animated.spring(scaleValue, {
      toValue: 1.1,
      useNativeDriver: true,
    }).start(() => {
      // Naviga dopo che l'animazione è completata
      console.log('Naviga verso', item.route);
      router.push(item.route);
      // Opzionale: resettare lo scale
      Animated.spring(scaleValue, {
        toValue: 1,
        useNativeDriver: true,
      }).start();
    });
  };
  return (
    <Animated.View
      style={[
            styles.menuItemBox, 
            { 
                backgroundColor: isActive ? 'white' : 'rgba(0, 26, 255,0.7)', // Cambia il colore di sfondo quando selezionato
                transform: [{ scale: scaleValue }] ,
                borderWidth: isActive ? 0 : 0, // Rimuove il bordo quando selezionato
                zIndex: isActive ? 1 : 0,
            },
            ]}
      onMouseEnter={Platform.OS === 'web' ? handleMouseEnter : null}
      onMouseLeave={Platform.OS === 'web' ? handleMouseLeave : null}
     
    >
      <TouchableOpacity 
            
            onPress={Platform.OS !== 'web' ? handlePress : () => router.push(item.route)}
            onPressIn={Platform.OS !== 'web' ? handlePressIn : null}
            onPressOut={Platform.OS !== 'web' ? handlePressOut : null}
            style={styles.touchable}>
        <Text style={[
          styles.menuText,
          {
               color: isActive ? 'rgba(0, 26, 255)' : 'white'
          },
        ]}
          >
          {item.label}

          </Text>
      </TouchableOpacity>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  menuItemBox: {
    borderColor: 'orange',
    marginHorizontal: 8,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
    borderRadius: 5,
    height: '100%',
    flex: 1,
    overflow: 'visible', // Permette all'elemento di sovrapporsi senza tagliare l'animazione
  },
  menuText: {
    color: 'blue',
    fontSize: 14,
    fontWeight: 'bold',
    fontFamily: 'Poppins-Medium',
    
  },
  touchable: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default MenuItem;