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
import {ScrollSchema} from '../componenti/ScrollSchema'

const Home = () => {
  const { 
    isMobile,
    windowHeight, 
    windowWidth, 
    leftColumnWidth, 
    centralColumnWidth, 
    rightColumnWidth, 
    leftColumnLeft, 
    centralColumnLeft, 
    rightColumnLeft,
    headerHeight ,
    footerHeight} = useContext(ColumnDimensionsContext)

const [schemaOrganizzato, setSchemaOrganizzato] = useState([]);
const [schemaSediOrganizzato, setSchemaSediOrganizzato] = useState([]);
const [posizioni, setPosizioni] = useState({});
const [focusedInput, setFocusedInput] = useState(null);
const [pagineForm2, setPagineForm2] = useState([]);

const [topScrollSchema,setTopScrollSchema]=useState(0);
const [topScrollSedi,setTopScrollSedi]=useState(0);
const [heightScrollSchema,setHeightScrollSchema]=useState(0);
const [heightScrollSedi,setHeightScrollSedi]=useState(0);
const [bordoColonnaCentrale,setBordoColonnaCentrale]=useState(10);
const [larghezzaColonnaCentrale,setLarghezzaColonnaCentrale]=useState();

useEffect(()=>{
  setHeightScrollSchema(Platform.OS ==='web' ? windowHeight*0.32: windowHeight*0.42)
  setTopScrollSchema(0)
  setTopScrollSedi(Platform.OS ==='web' ? windowHeight*0.37: windowHeight*0.47)
  setHeightScrollSedi(Platform.OS ==='web' ? windowHeight*0.30: windowHeight*0.25)

  if (isMobile) {
    setBordoColonnaCentrale(0)
    setLarghezzaColonnaCentrale(centralColumnWidth)
  } else {
    setBordoColonnaCentrale(10)
    setLarghezzaColonnaCentrale(centralColumnWidth-20)
  }
  },[windowWidth,windowHeight])


 useEffect(() => {
  let organizzato=organizzaSchema(schemaCliente);
  setSchemaOrganizzato(organizzato);
  organizzato=organizzaSchema(schemaSedi);
  setSchemaSediOrganizzato(organizzato);
  setPagineForm2(organizzato);
  }, []);

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', () => {
      if (focusedInput && focusedInput.formNumber === 2) {
        setTopScrollSchema((prevTopScrollSchema) => prevTopScrollSchema -windowHeight); 
        setTopScrollSedi((prevTopScrollSedi) => prevTopScrollSedi - 200);
      }
    });
  
    const keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', () => {
      if (focusedInput && focusedInput.formNumber === 2) {
        setTopScrollSchema((prevTopScrollSchema) => prevTopScrollSchema +windowHeight); 
        setTopScrollSedi((prevTopScrollSedi) => prevTopScrollSedi + 200);
      }
    });
    return () => {
      keyboardDidHideListener.remove();
      keyboardDidShowListener.remove();
    };
  }, [focusedInput]);



 const handleFocus = (inputId, formNumber)  => {                                                                                                   
  setFocusedInput({ inputId, formNumber });
};


const handleEliminaPagina = (pageNumber) => {
  setPagineForm2((prevPagine) => eliminaPagina(prevPagine, pageNumber));
};

 const handleAggiungiPagina = () => {
  setPagineForm2((prevPagine) => aggiungiPagina(prevPagine, schemaSediOrganizzato));
};


  return (
    <SafeAreaView style={{flex:1}}>
     
        <View 
            style={{position: 'absolute', borderColo: 'blue', borderWidth:0,backgroundColor:'blue',
                    top:0,
                    left: 0,
                    width:windowWidth,
                    height: headerHeight,
                }}>
                <View style={{alignItems:'center'}}>
                  <Text style={{color:'white'}}>POSTO HEADER</Text>               
                </View>
        </View>
       

   
        <View 
            style={{position: 'absolute', borderColo: 'blue', borderWidth:0,backgroundColor:'blue',
                    top:windowHeight- footerHeight,
                    left: 0,
                    width:windowWidth,
                    height: footerHeight,
                }}>
                <View style={{alignItems:'center'}}>
                  <Text style={{color:'white'}}>POSTO FOOTER</Text>
                  
                </View>
        </View>
      
{/******************COLONNA SINISTRA  ---------------------------------- */}
{!isMobile && (
<View style={{position:'absolute',left:leftColumnLeft, 
              top:headerHeight, 
              width:leftColumnWidth, 
              height:windowHeight-footerHeight-headerHeight, 
              borderColor:'white',  borderWidth:bordoColonnaCentrale,}}>


</View>
)}
{/******************COLONNA DESTRA  ---------------------------------- */}
{!isMobile && (
<View style={{position:'absolute',left:rightColumnLeft, 
              top:headerHeight, 
              width:  rightColumnWidth, 
              height:windowHeight-footerHeight-headerHeight, 
              borderColor:'white',  borderWidth:bordoColonnaCentrale,}}>


</View>

)}


{/******************CONTENITORE SCROLL ---------------------------------- */}
       
        <View style={{position:'absolute',  
              top:headerHeight, 
              left: centralColumnLeft, 
              width:centralColumnWidth,
              height: windowHeight-footerHeight-headerHeight, 
              borderColor:'white',borderWidth: bordoColonnaCentrale}}>

         
            
 {/******************CONTENITORE SCROLL 1 ---------------------------------- */}
              <View 
                  style={{flex:1, position:'absolute',
                          top:topScrollSchema,
                          height: heightScrollSchema,
                          borderColor:'red',  borderWidth:1,
                          width: larghezzaColonnaCentrale,
                          }}>                                        
             
                  <PaginaScroll 
                    top={0}
                    scrollWidth={larghezzaColonnaCentrale}  
                    scrollHeight={heightScrollSchema} 
                    barra={true}
                    barraInserisciElimina={false}
                    placeholder={false} >
                  
                          {Object.keys(schemaOrganizzato).map((pagina, index) =>{
                              const numeroRighe = Object.keys(schemaOrganizzato[pagina]).length;
                              return (
                                  <View key={index} >  
                                        <FormDinamico 
                                            schemaPagina={schemaOrganizzato[pagina]} 
                                            containerWidth={larghezzaColonnaCentrale} 
                                            containerHeight={heightScrollSchema} 
                                            etichetta={true} 
                                            formNumber={1}
                                            handleFocus={handleFocus}  
                                            numeroRighe={numeroRighe}  />      
                                    </View>
                               )
                            })}                      
                    </PaginaScroll>                   
                </View>
        
                 

 {/******************CONTENITORE SCROLL 2 ---------------------------------- */}

       
              <View style={{position:'absolute', flex:1,  
                    top:topScrollSedi,
                    height: heightScrollSedi,
                    borderColor:'blue',
                    borderWidth:1,
                    width: larghezzaColonnaCentrale,
                }}>
                <PaginaScroll 
                    top={topScrollSedi}
                    scrollWidth={larghezzaColonnaCentrale}    
                    scrollHeight={heightScrollSedi} 
                    barra={true}
                    barraInserisciElimina={true}
                    onNuovo={handleAggiungiPagina}
                    onElimina={handleEliminaPagina}   >
             
                    {Object.keys(pagineForm2).map((pagina, index) => {
                      const numeroRighe = Object.keys(pagineForm2[pagina]).length;
                      return (
                        <View key={index} >
                              <FormDinamico 
                                  schemaPagina={pagineForm2[pagina]}
                                  containerWidth={ larghezzaColonnaCentrale } 
                                  containerHeight={heightScrollSedi}  
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
     {/***************FINE CONTENITORE SCROLL 2 ---------------------------------- */}

        </View>
       {/***************FINE CONTENITORE SCROLL ---------------------------------- */}  

    </SafeAreaView>
  )
}

export default Home

const styles = StyleSheet.create({
 
  
})

