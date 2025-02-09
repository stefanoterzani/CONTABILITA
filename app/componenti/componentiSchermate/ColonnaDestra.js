import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useContext, useState,useEffect} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getStileContenitoreColonnaDestra } from '../../stili/stiliColonne';
import ListaClienti from '../ListaClienti';
import { setRisposta ,resetRisposta} from '../../redux/slice/colonnaDestraSlice'; 
import { hideRightColumn } from '../../redux/slice/SliceColonnaOpzionale'; // Importa l'azione per nascondere la colonna destra


const ColonnaDestra = () => {
 //console.log('IN COLONNA DESTRA',clientiData)
 const dispatch = useDispatch();
  const standardColumn = useSelector((state) => state.standardColumn);
  const optionalColumn = useSelector((state) => state.optionalColumn);
  const tipoContenuto = useSelector((state) => state.colonnaDestra.tipoContenuto);
 // const clientiData = useSelector((state) => state.colonnaDestra.clientiData); 
const risposta = useSelector((state) => state.colonnaDestra.risposta);

//console.log('IN COLONNA DESTRA',tipoContenuto)


  const isStandardColumnVisible = standardColumn.showColonnaDestra;
  const isOptionalColumnVisible = optionalColumn.showColonnaDestra;
  
  if (!isStandardColumnVisible && !isOptionalColumnVisible) {
    return null;
  }
//console.log('TipoContenuto',tipoContenuto)
//console.log('IN COLONNA DESTRA', 'isStandardColumnVisible',isStandardColumnVisible)
//console.log('IN COLONNA DESTRA', 'isOptionalColumnVisible',isOptionalColumnVisible)
//console.log('IN COLONNA DESTRA style', 'tipo',optionalColumn.rightColumnStyles.tipo)
//console.log('IN COLONNA DESTRA style', 'tipo',optionalColumn.rightColumnStyles)
  const stileContenitoreColonnaDestra = isStandardColumnVisible 
        ? getStileContenitoreColonnaDestra(
                                standardColumn.rightColumnStyles, 
                                standardColumn.windowHeight,standardColumn.windowWidth,                                
                                standardColumn.headerHeight,standardColumn.footerHeight )
        : getStileContenitoreColonnaDestra(
                                optionalColumn.rightColumnStyles, 
                                optionalColumn.windowHeight, optionalColumn.windowWidth,
                                optionalColumn.headerHeight, optionalColumn.footerHeight );
  
 
  const larghezzaColonnaDestra = stileContenitoreColonnaDestra.width;        
 const colonnaStile= isStandardColumnVisible ? `standard ${standardColumn.rightColumnStyles.tipo}` : `optional ${optionalColumn.rightColumnStyles.tipo}`;  
/*
 useEffect(() => {
  console.log('IN COLONNA DESTRA risposta',risposta)
}, []);
*/
const handleSelectCliente = (cliente) => {
  console.log('CLIENTE SCELTO',cliente)
 // dispatch(resetRisposta());
  dispatch(setRisposta(cliente));
 dispatch(hideRightColumn());
};

const handleChiudi = () =>{
  dispatch(setRisposta());
 dispatch(resetRisposta());
  dispatch(hideRightColumn());
}

 const renderComponent = () => {
  switch (tipoContenuto) {
    case 'ListaClienti':
      return (
        <View style={{aligne:'center', marginTop:10}}>         
            <Text style={{fontSize:16, fontFamily:"Roboto-Regular", textAlign:'center'}}> Segli il Cliente per la modifica</Text>
            <View  style={{flexDirection:'row',alignItems:'center',justifyContent:'center'}}>
                <TouchableOpacity onPress={handleChiudi}>
                    <Text  style={{fontSize:16, color:'blue',fontFamily:"Roboto-MediumItalic" }}> chiudi </Text>
                </TouchableOpacity>
                <Text style={{fontSize:16, fontFamily:'Roboto-Regular'}}> per inserire Nuovo</Text>
            </View>      
            <View style={{marginTop:10,alignItems:'center'}}>
                  <Text style={{fontSize:18, fontFamily:'Roboto-Medium',  textAlign:'center'}}> LISTA CLIENTI</Text>
            </View>
            <ListaClienti  onSelectCliente={handleSelectCliente} style={{fontSize:18}} />
        </View>
      )
      break;
    case 'Testo':
      return <Text>Contenuto di esempio</Text>;
    default:
      return null;
  }
};
 
  return (
    <View style={stileContenitoreColonnaDestra}>
     {renderComponent()}
  </View>
  
  )
  
}

export default ColonnaDestra




  
  
     
    
 
 

  
/*
     console.log('IN COLONNA DESTRA', 'windowHeight',windowHeight) 
     console.log('IN COLONNA DESTRA', 'showColonnaDestra',showColonnaDestra)            
     console.log('IN COLONNA DESTRA width:',rightColumnStyles.width, )
     console.log('IN COLONNA DESTRA' , 'styleColonnadESTRA',rightColumnStyles)
     console.log('IN COLONNA DESTRA headerHeight' ,headerHeight)
     console.log('IN COLONNA DESTRA footerHeight' ,footerHeight)
   */