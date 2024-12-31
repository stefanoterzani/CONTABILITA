import { ScrollView, StyleSheet, Text, View,Platform,Keyboard,TouchableOpacity} from 'react-native'
import React, { useContext, useState,useEffect} from 'react';
import WindowDimensionsContext from '../context/WindowDimensionsContext';
import { SafeAreaView } from 'react-native-safe-area-context';
import PaginaScroll from '../componenti/PaginaScroll';
import { schemaCliente,schemaSedi } from '../schemi/schemiClienti';
import { organizzaSchema,aggiungiPagina,eliminaPagina} from '../schemi/FunzioniSchemi';
import FormDinamico  from '../componenti/FormDinamico';

const Home = () => {
const { width, height } = useContext(WindowDimensionsContext);


//console.log('Dimensioni window', width, 'x', height, 'Dimensioni container', containerWidth, 'x', containerHeight);
const [schemaOrganizzato, setSchemaOrganizzato] = useState([]);
const [schemaSediOrganizzato, setSchemaSediOrganizzato] = useState([]);
const [posizioni, setPosizioni] = useState({});
const [focusedInput, setFocusedInput] = useState(null);
const [pagineForm2, setPagineForm2] = useState([]);

  // console.log('SCHEMA',JSON.stringify(schemaCliente, null, 2))
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
                top: prevPosizioni.finestraScroll.top-height, 
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
          top: prevPosizioni.finestraScroll.top+height, // Modifica il valore di top come desiderato
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

 useEffect(()=>{
  const posizioniIniziali={
    header:{
      top:height*0.01,
      left:0 ,
      bottom:0,
      width:width,
      height:height*0.07,
    },
    footer:{
      top:height*0.93,
      left: 0,
      bottom:0,
      width:width,
      height:height*0.07,
    },
    finestraScroll:{
      top:height*0.10,
      left: width*0.02,
      bottom:0,
      width:width-(( width*0.02))*2,
      height:Platform.OS ==='web' ? height*0.32: height*0.42,
    },
  finestraScrollSedi:{
      top:Platform.OS ==='web' ? height*0.48: height*0.58,
      left: width*0.02,
      bottom:0,
      width:width-(( width*0.02))*2,
      height:Platform.OS ==='web' ? height*0.32: height*0.25,
    },
  }

  setPosizioni(posizioniIniziali)
 },[width,height])

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
                  <Text style={{fontSize:16,color:'white'}}>Window {width.toFixed(1)} 'x' {height.toFixed(1)}/Contenitore: {posizioni.finestraScroll.width.toFixed(1)}  x  {posizioni.finestraScroll.height.toFixed(1)}</Text>
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
                    width:posizioni.finestraScroll.width, height: posizioni.finestraScroll.height, }}>
                    {/* borderColor:'red',  borderWidth:2,  */}                                            
               
                <PaginaScroll 
                    top={posizioni.finestraScroll.top}
                    scrollWidth={posizioni.finestraScroll.width}  
                    scrollHeight={posizioni.finestraScroll.height} 
                    barra={true}
                    barraInserisciElimina={false}
                    placeholder={false} >
                 
                    {Object.keys(schemaOrganizzato).map((pagina, index) => (
                        <View key={index}  
                              style={{ marginTop:10,  width: posizioni.finestraScroll.width, height: posizioni.finestraScroll.height }}>            
                              <FormDinamico 
                                  schemaPagina={schemaOrganizzato[pagina]} 
                                  containerWidth={posizioni.finestraScroll.width} 
                                  containerHeight={posizioni.finestraScroll.height} 
                                  etichetta={true} 
                                  formNumber={1}
                                  handleFocus={handleFocus}  />               
                        </View>
                     ))}
                </PaginaScroll>         
            </View>
        )}

        {posizioni.finestraScrollSedi && (
            <View style={{position:'absolute', flex:1,  
                    top:posizioni.finestraScrollSedi.top,
                    left: posizioni.finestraScrollSedi.left,
                    width:posizioni.finestraScrollSedi.width,
                    height: posizioni.finestraScrollSedi.height,
                    //borderColor:'red',
                    //borderWidth:2,
                }}>
                <PaginaScroll 
                    top={posizioni.finestraScroll.top}
                    scrollWidth={posizioni.finestraScrollSedi.width}  
                    scrollHeight={posizioni.finestraScrollSedi.height} 
                    barra={true}
                    barraInserisciElimina={true}
                    onNuovo={handleAggiungiPagina}
                    onElimina={handleEliminaPagina}   >
             
                    {Object.keys(pagineForm2).map((pagina, index) => (
                        <View key={index} 
                              style={{ marginTop:10, width: posizioni.finestraScrollSedi.width, height: posizioni.finestraScrollSedi.height }}>
                              <FormDinamico 
                                  schemaPagina={pagineForm2[pagina]}
                                  containerWidth={posizioni.finestraScrollSedi.width} 
                                  containerHeight={posizioni.finestraScrollSedi.height}  
                                  etichetta={true}
                                  formNumber={2} 
                                  handleFocus={handleFocus} />
                        </View>
                     ))}
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

