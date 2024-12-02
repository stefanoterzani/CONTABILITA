import React from 'react';
import { View, Text, StyleSheet, Modal, TouchableOpacity } from 'react-native';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';

const Tooltip = ({ visible, onClose, posizione, testo, posizioneFreccia }) => {
  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}
    >
      <View style={styles.overlay}>
        <View style={[styles.tooltipContainer, posizione]}>
          <View style={[styles.tooltipArrow, posizioneFreccia === 'left' ? styles.tooltipArrowLeft : styles.tooltipArrowRight]} />
          <View style={styles.tooltipContent}>
            <Text style={styles.tooltipText}>{testo}</Text>
           
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default Tooltip;

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  tooltipContainer: {
    position: 'absolute',
    backgroundColor: 'yellow',
    borderRadius: 5,
    padding: 10,
    borderWidth: 1,
    borderColor: 'black',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  tooltipArrow: {
    position: 'absolute',
    top: -10, // Distanza dal tooltip
    width: 0,
    height: 0,
    borderLeftWidth: 10, // Larghezza della freccia
    borderRightWidth: 10, // Larghezza della freccia
    borderBottomWidth: 10, // Altezza della freccia
    borderStyle: 'solid',
    borderLeftColor: 'transparent',
    borderRightColor: 'transparent',
    borderBottomColor: 'yellow', // Colore della freccia
  },
  tooltipArrowLeft: {
    left: 10, // Posiziona la freccia a sinistra
  },
  tooltipArrowRight: {
    right: 10, // Posiziona la freccia a destra
  },
  tooltipContent: {
    alignItems: 'center',
  },
  tooltipText: {
    fontSize: 14,
    color: 'black',
  },
  closeIcon: {
    position: 'absolute',
    top: 5,
    right: 5,
  },
});