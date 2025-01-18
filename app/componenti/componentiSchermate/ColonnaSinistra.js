import { StyleSheet, Text, View ,Platform} from 'react-native'
import React from 'react';
import MenuComponent from '../MenuComponent'
import { useSelector} from 'react-redux';
import { getStileContenitoreColonnaSinistra } from '../../stili/stiliColonne';

const ColonnaSinistra = () => {

  const standardColumn = useSelector((state) => state.standardColumn);
  const optionalColumn = useSelector((state) => state.optionalColumn);

  const isStandardColumnVisible = standardColumn.showColonnaSinistra;
  const isOptionalColumnVisible = optionalColumn.showColonnaSinistra;

  if (!isStandardColumnVisible && !isOptionalColumnVisible) {
    return null;
  }

  const stileContenitoreColonnaSinistra = isStandardColumnVisible 
      ? getStileContenitoreColonnaSinistra(
                  standardColumn.leftColumnStyles, 
                  standardColumn.windowHeight, standardColumn.windowWidth,
                  standardColumn.headerHeight, standardColumn.footerHeight)
      : getStileContenitoreColonnaSinistra(
                  optionalColumn.leftColumnStyles, 
                  optionalColumn.windowHeight, optionalColumn.windowWidth,
                  optionalColumn.headerHeight, optionalColumn.footerHeight, );

  
  const colonnaTipo = isStandardColumnVisible ? 'standardColumn' : 'optionalColumn';
  
  return (
    <View style={stileContenitoreColonnaSinistra}>

        <Text>Colonna Sinistra ({colonnaTipo})</Text>

          
      <MenuComponent/>

    </View>
  );
};

export default ColonnaSinistra;

