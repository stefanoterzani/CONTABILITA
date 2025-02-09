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

  
 
  const colonnaStile= isStandardColumnVisible ? `standard ${standardColumn.leftColumnStyles.tipo}` : `optional ${optionalColumn.leftColumnStyles.tipo}`;
 
  return (
    <View style={[stileContenitoreColonnaSinistra,{alignItems:'center'}]}>

        <Text style={{color:'blue',fontSize:16,fontFamily:'Roboto-Medium'}} > Colonna Sinistra </Text>
        <Text style={{color:'blue',fontSize:14,fontFamily:'Roboto-Medium'}} >({colonnaStile})</Text>
          
      <MenuComponent/>

    </View>
  );
};

export default ColonnaSinistra;

