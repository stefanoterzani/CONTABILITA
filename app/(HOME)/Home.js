import { ScrollView, StyleSheet, Text, View,Platform,Keyboard,TouchableOpacity} from 'react-native'
import React, { useContext, useState,useEffect} from 'react';
import WindowDimensionsContext from '../context/WindowDimensionsContext';
import { SafeAreaView } from 'react-native-safe-area-context';
import PaginaScroll from '../componenti/PaginaScroll';
import { schemaCliente,schemaSedi } from '../schemi/schemiClienti';
import { organizzaSchema,aggiungiPagina,eliminaPagina} from '../schemi/FunzioniSchemi';
import FormDinamico  from '../componenti/FormDinamico';
////import { ZoomAndColumnsContext } from '../context/ZoomAndColumnsContext';
import { ColumnDimensionsContext } from '../context/ColumnDimensionsContext';

const Home = () => {
  const { 
    windowHeight, 
    windowWidth, 
    leftColumnWidth, 
    centralColumnWidth, 
    rightColumnWidth, 
    leftColumnLeft, 
    centralColumnLeft, 
    rightColumnLeft } = useContext(ColumnDimensionsContext)

const [schemaOrganizzato, setSchemaOrganizzato] = useState([]);
const [schemaSediOrganizzato, setSchemaSediOrganizzato] = useState([]);
const [posizioni, setPosizioni] = useState({});
const [focusedInput, setFocusedInput] = useState(null);
const [pagineForm2, setPagineForm2] = useState([]);

useEffect(()=>{
  const posizioniIniziali={
    header:{
      top:0,
      left:0 ,
      bottom:0,
      width:windowWidth,
      height:windowHeight*0.07,
    },
    footer:{
      top:windowHeight*0.93,
      left: 0,
      bottom:0,
      width:windowWidth,
      height:windowHeight*0.07,
    },
    finestraScroll:{
      top:windowHeight*0.08,
      left: centralColumnLeft,
      bottom:0,
      width:centralColumnWidth,
      height:Platform.OS ==='web' ? windowHeight*0.30: windowHeight*0.42,
    },
  finestraScrollSedi:{
      top:Platform.OS ==='web' ? windowHeight*0.48: windowHeight*0.56,
      left: centralColumnLeft,
      bottom:0,
      width:centralColumnWidth,
      height:Platform.OS ==='web' ? windowHeight*0.33: windowHeight*0.25,
    },
  }

  setPosizioni(posizioniIniziali)
 },[windowWidth,windowHeight])


 useEffect(() => {
  let organizzato=organizzaSchema(schemaCliente);
  setSchemaOrganizzato(organizzato);
  organizzato=organizzaSchema(schemaSedi);
  setSchemaSediOrganizzato(organizzato);
  setPagineForm2(organizzato);
  //console.log('SCHEMA',JSON.stringify(organizzato, null, 2))
 }, []);

 const handleFocus = (inputId, formNumber)  => {
  console.log('Focused input:', inputId, 'Form number:', formNumber);                                                                                                     
  setFocusedInput({ inputId, formNumber });
};


const handleEliminaPagina = (pageNumber) => {
  setPagineForm2((prevPagine) => eliminaPagina(prevPagine, pageNumber));
};

 const handleAggiungiPagina = () => {
  setPagineForm2((prevPagine) => aggiungiPagina(prevPagine, schemaSediOrganizzato));
};

useEffect(() => {
  const keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', () => {
    if (focusedInput && focusedInput.formNumber === 2) {
    setPosizioni((prevPosizioni) => ({      
          ...prevPosizioni,
          finestraScroll: {
              ...prevPosizioni.finestraScroll,
              top: prevPosizioni.finestraScroll.top-windowHeight, 
            //  height: prevPosizioni.finestraScroll.height-200,
          },       
          finestraScrollSedi: {
              ...prevPosizioni.finestraScrollSedi,
              top: prevPosizioni.finestraScrollSedi.top - 200, 
          }
    }));  
  }
  });

  const keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', () => {
    if (focusedInput && focusedInput.formNumber === 2) {
    setPosizioni((prevPosizioni) => ({        
      ...prevPosizioni,
      finestraScroll: {
        ...prevPosizioni.finestraScroll,
        top: prevPosizioni.finestraScroll.top+windowHeight, // Modifica il valore di top come desiderato
       // height: prevPosizioni.finestraScroll.height+500,
      },
      finestraScrollSedi: {
        ...prevPosizioni.finestraScrollSedi,
        top: prevPosizioni.finestraScrollSedi.top +200, // Modifica il valore di top come desiderato
      },
    }));  
    }
  });
  return () => {
    keyboardDidHideListener.remove();
    keyboardDidShowListener.remove();
  };
}, [focusedInput]);




  return (
    <SafeAreaView style={{flex:1}}>
        {posizioni.header && (
              <View 
                style={{position: 'absolute', borderColo: 'blue', borderWidth:0,backgroundColor:'blue',
                    top:posizioni.header.top,
                    left: posizioni.header.left,
                    width:posizioni.header.width,
                    height: posizioni.header.height,
                }}>
                <View style={{alignItems:'center'}}>
                  <Text style={{color:'white'}}>POSTO HEADER</Text>
               
                </View>
              </View>
        )}

        {posizioni.footer && (
              <View 
                style={{position: 'absolute', borderColo: 'blue', borderWidth:0,backgroundColor:'blue',
                    top:posizioni.footer.top,
                    left: posizioni.footer.left,
                    width:posizioni.footer.width,
                    height: posizioni.footer.height,
                }}>
                <View style={{alignItems:'center'}}>
                  <Text style={{color:'white'}}>POSTO FOOTER</Text>
                  
                </View>
              </View>
        )}
       
      <View style={{ flex:1,}}>
        {posizioni.finestraScroll && (
            <View 
                style={{position:'absolute', flex:1, top:posizioni.finestraScroll.top, left: posizioni.finestraScroll.left,
                    width:posizioni.finestraScroll.width, height: posizioni.finestraScroll.height,
                  //  borderColor:'red',  borderWidth:2,
                    }}>
                    {/* borderColor:'red',  borderWidth:2,  */}                                            
             
                <PaginaScroll 
                    top={posizioni.finestraScroll.top}
                    scrollWidth={posizioni.finestraScroll.width}  
                    scrollHeight={posizioni.finestraScroll.height} 
                    barra={true}
                    barraInserisciElimina={false}
                    placeholder={false} >
                  
                    {Object.keys(schemaOrganizzato).map((pagina, index) =>{
                      const numeroRighe = Object.keys(schemaOrganizzato[pagina]).length;
                       return (
                        <View key={index}  
                              style={{  width: posizioni.finestraScroll.width, height: posizioni.finestraScroll.height }}>  
 {/*  */}  
                              <FormDinamico 
                                  schemaPagina={schemaOrganizzato[pagina]} 
                                  containerWidth={posizioni.finestraScroll.width} 
                                  containerHeight={posizioni.finestraScroll.height} 
                                  etichetta={true} 
                                  formNumber={1}
                                  handleFocus={handleFocus}  
                                  numeroRighe={numeroRighe} 
                                  />      
 
                        </View>
                      )
                      })}
                      
                </PaginaScroll>   
                 
            </View>
        )}

        {posizioni.finestraScrollSedi && (
            <View style={{position:'absolute', flex:1,  
                    top:posizioni.finestraScrollSedi.top,
                    left: posizioni.finestraScrollSedi.left,
                    width:posizioni.finestraScrollSedi.width,
                    height: posizioni.finestraScrollSedi.height,
                    borderColor:'blue',
                    borderWidth:2,
                }}>
                <PaginaScroll 
                    top={posizioni.finestraScrollSedi.top}
                    scrollWidth={posizioni.finestraScrollSedi.width}  
                    scrollHeight={posizioni.finestraScrollSedi.height} 
                    barra={true}
                    barraInserisciElimina={true}
                    onNuovo={handleAggiungiPagina}
                    onElimina={handleEliminaPagina}   >
             
                    {Object.keys(pagineForm2).map((pagina, index) => {
                      const numeroRighe = Object.keys(pagineForm2[pagina]).length;
                      return (
                        <View key={index} 
                              style={{ width: posizioni.finestraScrollSedi.width, height: posizioni.finestraScrollSedi.height }}>
                              <FormDinamico 
                                  schemaPagina={pagineForm2[pagina]}
                                  containerWidth={posizioni.finestraScrollSedi.width} 
                                  containerHeight={posizioni.finestraScrollSedi.height}  
                                  etichetta={false}
                                  formNumber={2} 
                                  handleFocus={handleFocus} 
                                  numeroRighe={numeroRighe} // Passa il numero di righe 
                                  />
                        </View>
                     )
                    })}
                </PaginaScroll>               
            </View>
        )}

       
    </View>

    </SafeAreaView>
  )
}

export default Home

const styles = StyleSheet.create({
 
  
})

