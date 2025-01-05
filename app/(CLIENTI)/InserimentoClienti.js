import { StyleSheet, Text, View,Platform,Keyboard,TouchableOpacity} from 'react-native'
import React, { useContext, useState,useEffect} from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import PaginaScroll from '../componenti/PaginaScroll';
import { schemaCliente,schemaSedi } from '../schemi/schemiClienti';
import { organizzaSchema,aggiungiPagina,eliminaPagina} from '../schemi/FunzioniSchemi';
import FormDinamico  from '../componenti/FormDinamico';
import { ColumnDimensionsContext } from '../context/ColumnDimensionsContext';
import ColonnaSinistra from '../componenti/ColonnaSinistra';
import ColonnaDestra from '../componenti/ColonnaDestra';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';

const Home = () => {
  const { 
    windowHeight, windowWidth,
    headerHeight, footerHeight,
    leftColumnWidth, centralColumnWidth, rightColumnWidth, 
    leftColumnLeft, centralColumnLeft, rightColumnLeft ,
    bordoSopraSotto,
    bordoSnColonnaSn,bordoDxColonnaSn,
    bordoSnColonnaDx,bordoDxColonnaDx,
    bordoDxColonnaCn,bordoSnColonnaCn,
    colonnaSnVisibile,colonnaDxVisibile,
    isMobile,
    setLeftColumnWidth,setRightColumnWidth
        } = useContext(ColumnDimensionsContext)

const [schemaOrganizzato, setSchemaOrganizzato] = useState([]);
const [schemaSediOrganizzato, setSchemaSediOrganizzato] = useState([]);
const [focusedInput, setFocusedInput] = useState(null);
const [pagineForm2, setPagineForm2] = useState([]);
const [topScrollSchema,setTopScrollSchema]=useState(0);
const [topScrollSedi,setTopScrollSedi]=useState(0);
const [heightScrollSchema,setHeightScrollSchema]=useState(0);
const [heightScrollSedi,setHeightScrollSedi]=useState(0);

const [showColonnaDestra, setShowColonnaDestra] = useState(false);
const [showColonnaSinistra, setShowColonnaSinistra] = useState(false);

// Organizza gli schemi in modo da avere un array di pagine
useEffect(() => {
  let organizzato=organizzaSchema(schemaCliente);
  setSchemaOrganizzato(organizzato);
  organizzato=organizzaSchema(schemaSedi);
  setSchemaSediOrganizzato(organizzato);
  setPagineForm2(organizzato);

  setShowColonnaSinistra(false)
  setShowColonnaDestra(false)
  setLeftColumnWidth(leftColumnLeft)

  }, []);


  // Aggiorna le dimensioni dei contenitori scroll in base alla grandezza della finestra
useEffect(()=>{

  setTopScrollSchema(0)
  setHeightScrollSchema(Platform.OS ==='web' ? windowHeight*0.32: windowHeight*0.42)

  setTopScrollSedi(Platform.OS ==='web' ? windowHeight*0.37: windowHeight*0.47)
  setHeightScrollSedi(Platform.OS ==='web' ? windowHeight*0.30: windowHeight*0.25)

  },[windowWidth,windowHeight])


 


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
   {/****************** HEADER  ---------------------------------- */}  
        <View 
            style={{position: 'absolute', 
              backgroundColor:'blue',
              top:0,
              left: 0,
              width:windowWidth,
              height: headerHeight,                 
              flexDirection:'row'}}>
                 <View style={{width:'15%',height:'100%',borderColor:'red',borderWidth:1,justifyContent:'center',alignItems:'center'}}>
                 {isMobile && (
                 <TouchableOpacity
                      onPress={()=>{
                        setLeftColumnWidth((prevWidth) => (prevWidth === 0 ? 200 : 0)) 
                        setShowColonnaSinistra((prevShowSn) => !prevShowSn)
                        } }>
                     <MaterialIcons name="menu" size={30} color="white" />
                 </TouchableOpacity>
                 )}
                  </View>
                 
                  <View style={{width:'70%',height:'100%',borderColor:'red',borderWidth:1,alignItems:'center',justifyContent:'center'}}>
                      <Text style={{textAlign:'center' ,  color:'white'}}>{windowWidth.toFixed(2)} x {windowHeight.toFixed(2)}</Text>
                  </View>   
                  <View style={{width:'15%',height:'100%',borderColor:'red',borderWidth:1,justifyContent:'center',alignItems:'center'}}>
             
                 <TouchableOpacity
                      onPress={()=>{
                        setRightColumnWidth((prevWidth) => (prevWidth === 0 ? 200 : 0)) 
                        setShowColonnaDestra((prevShowDx) => !prevShowDx)
                        } }>
                     <Text style={{color:'white',textAlign:'center', fontSize:20}}>2</Text> 
                 </TouchableOpacity>
               
                  </View>


                </View>
    
               

      {/****************** FOOTER  ---------------------------------- */}  
        <View 
            style={{position: 'absolute', borderColor: 'blue', borderWidth:0,backgroundColor:'blue',
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

<ColonnaSinistra showColonnaSinistra={showColonnaSinistra} />

{/******************COLONNA DESTRA  ---------------------------------- */}

<ColonnaDestra showColonnaDestra={showColonnaDestra}  />

{/******************COLONNA CENTRALE ---------------------------------- */}
       
        <View style={{ position:'absolute',  
        flex:1,
                  top: headerHeight, 
                  left: centralColumnLeft, 
                  width:centralColumnWidth, 
                  height: windowHeight-footerHeight-headerHeight, 
                  borderColor:'white',
                  borderTopWidth: bordoSopraSotto,
                  borderBottomWidth:bordoSopraSotto,
                  borderLeftWidth: bordoSnColonnaCn,
                  borderRightWidth: bordoDxColonnaCn,
                  backgroundColor:'white'}}>

         
            
 {/******************CONTENITORE SCROLL 1 ---------------------------------- */}
              <View style={{flex:1,position:'absolute',top:topScrollSchema,borderColor:'red',borderWidth:1}}>                                        
             
                  <PaginaScroll 
                   // top={0}
                    scrollWidth={centralColumnWidth-bordoSnColonnaCn-bordoDxColonnaCn}  
                   // scrollHeight={heightScrollSchema} 
                    barra={true}
                    barraInserisciElimina={false}
                    placeholder={false} >
                  {/* */}
                          {Object.keys(schemaOrganizzato).map((pagina, index) =>{
                              const numeroRighe = Object.keys(schemaOrganizzato[pagina]).length;
                              return (
                                  <View key={index} >  
                                        <FormDinamico 
                                            schemaPagina={schemaOrganizzato[pagina]} 
                                            containerWidth={centralColumnWidth-bordoSnColonnaCn-bordoDxColonnaCn} 
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

       
              <View style={{position:'absolute', top:topScrollSedi,borderColor:'red',borderWidth:1}}>
                <PaginaScroll 
                  //  top={topScrollSedi}
                   // scrollWidth={centralColumnWidth}    
                  //  scrollHeight={heightScrollSedi} 
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
                                  containerWidth={centralColumnWidth-bordoSnColonnaCn-bordoDxColonnaCn } 
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
       {/***************FINE COLONNA CENTRALE ---------------------------------- */}  

    </SafeAreaView>
  )
}

export default Home

const styles=(windowHeight, 
              windowWidth,
              headerHeight,
              footerHeight,
              centralColumnLeft,
              centralColumnWidth,
              bordoSopraSotto,
              bordoSnColonnaCn,
              bordoDxColonnaCn
            ) => StyleSheet.create({
              
  colonnaCentraleContainer:{
    position:'absolute',  
    top: headerHeight, 
    left: centralColumnLeft, 
    width:centralColumnWidth,
    height: windowHeight-footerHeight-headerHeight, 
    borderColor:'white',
    borderTopWidth: bordoSopraSotto,
    borderBottomWidth:bordoSopraSotto,
    borderLeftWidth: bordoSnColonnaCn,
    borderRightWidth: bordoDxColonnaCn,
  },
  headerContainer:{
    position: 'absolute', 
    backgroundColor:'blue',
    top:0,
    left: 0,
    width:windowWidth,
    height: headerHeight,                 
    flexDirection:'row',
  },
    
  })
/*
position: 'absolute', 
              backgroundColor:'blue',
              top:0,
              left: 0,
              width:windowWidth,
              height: headerHeight,                 
              flexDirection:'row'
              */