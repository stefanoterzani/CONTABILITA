// MenuComponent.js
import React, { useState } from 'react';
import { StyleSheet, Text, View, FlatList, TouchableOpacity } from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';
import { schemaMenu } from '../schemi/schemaMenu';
import { useRouter } from 'expo-router';
import { useSelector, useDispatch } from 'react-redux';

const MenuComponent = () => {
  const [expandedSection, setExpandedSection] = useState(null);
  const [expandedSubSection, setExpandedSubSection] = useState(null);
  const router = useRouter(); 

  const toggleSection = (section) => {
    setExpandedSection((prev) => (prev === section ? null : section));
    setExpandedSubSection(null); // Reset sub-section when a new section is expanded
  };

  const toggleSubSection = (subSection) => {
    setExpandedSubSection((prev) => (prev === subSection ? null : subSection));
  };

  const handlePress = (menuItem) => {
    if (menuItem.permesso) {
     // console.log('Navigazione verso:', menuItem.route);
     // console.log('Parametri prima di passare:', { modalita: menuItem.modalita });

      router.push(`/${menuItem.route}?modalita=${menuItem.modalita}`);
    }
  };

  const renderSubMenuItem = (subItem) => (
    <View key={subItem.label} style={styles.subMenuSection}>
      <TouchableOpacity onPress={() => toggleSubSection(subItem.label)} style={styles.subSection}>
        <Text style={styles.subSectionLabel}>{subItem.label}</Text>
        <FontAwesome5
          name="chevron-down"
          size={12}
          color="blue"
          style={{
            marginLeft: 5,
            transform: expandedSubSection === subItem.label ? [{ rotate: '180deg' }] : [{ rotate: '0deg' }],
          }}
        />
      </TouchableOpacity>
      {expandedSubSection === subItem.label &&
        Object.keys(subItem).map((key) => {
          if (key !== 'label') {
            const menuItem = subItem[key];
            return (
              <TouchableOpacity key={key} style={styles.menuItem}
                 onPress={() => handlePress(menuItem)}
              >
              {/*
                <FontAwesome5 name={menuItem.icona} size={16} color="black" />
                */}
                <Text style={styles.menuItemLabel}>{menuItem.label}</Text>
              </TouchableOpacity>
            );
          }
        })}
    </View>
  );

  const renderMenuItem = ({ item }) => (
    <View style={styles.menuSection}>
      <TouchableOpacity onPress={() => toggleSection(item.label)} style={styles.section}>
        <Text style={styles.sectionLabel}>{item.label}</Text>
        <FontAwesome5
          name="chevron-down"
          
          size={12}
          color="blue"
          style={{
            marginLeft: 5,
            transform: expandedSection === item.label ? [{ rotate: '180deg' }] : [{ rotate: '0deg' }],
          }}
        />
      </TouchableOpacity>
      {expandedSection === item.label &&
        Object.keys(item).map((key) => {
          if (key !== 'label') {
            return renderSubMenuItem(item[key]);
          }
        })}
    </View>
  );

  return (
    <FlatList
      data={Object.values(schemaMenu)}
      renderItem={renderMenuItem}
      keyExtractor={(item) => item.label}
    />
  );
};

export default MenuComponent;

const styles = StyleSheet.create({
  menuSection: {
    marginTop: 20,
    marginBottom: 20,
    marginLeft: 20,
  },
  section: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  sectionLabel: {
    fontSize: 16,
    //fontWeight: '700',
    fontFamily:'Roboto-Medium',
    marginBottom: 0,
    color: 'blue',
  },
  subMenuSection: {
    marginLeft: 20,
    marginBottom: 0,
  },
  subSection: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  subSectionLabel: {
    fontSize: 14,
    fontFamily:'Roboto-Medium',
  //  fontWeight: '700',
    marginBottom: 5,
    color: 'blue',
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
    paddingLeft: 20, // Rientro per le voci dei sottomenu
  },
  menuItemLabel: {
    marginLeft: 5,
    fontSize: 14, // Font più piccolo per le voci dei sottomenu
    color: 'blue',
    fontFamily:'Roboto-Regular',
   // fontWeight: '700',
  },
});