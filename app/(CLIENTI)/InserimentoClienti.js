import { StyleSheet, Text, View,Platform,Keyboard,TouchableOpacity} from 'react-native'
import React, { useContext, useState,useEffect} from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { schemaCliente,schemaSedi } from '../schemi/schemiClienti';
import { organizzaSchema,aggiungiPagina,eliminaPagina} from '../schemi/FunzioniSchemi';
import ColonnaDestra from '../componenti/ColonnaDestra';
import ColonnaSinistra from '../componenti/ColonnaSinistra';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import InputPagineMultiple from '../componenti/componentiPagineScroll/InputPagineMultiple';
import InputPaginaSingola from '../componenti/componentiPagineScroll/InputPaginaSingola';
import { useSelector,useDispatch} from 'react-redux';
import { toggleLeftColumnWidth } from '../redux/slice/columnDimensionSlice';
import { toggleRightColumnWidth } from '../redux/slice/columnDimensionSlice';
const InserimentoClienti = () => {
  const dispatch = useDispatch();
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
        }= useSelector((state) => state.columnDimensions);

const [schemaOrganizzato1, setSchemaOrganizzato1] = useState([]);
const [schemaOrganizzato2, setSchemaOrganizzato2] = useState([]);
const [focusedInput, setFocusedInput] = useState(null);
const [pagineSchemaOrganizzato2, setPagineSchemaOrganizzato2] = useState([]);
const [topScrollSchema,setTopScrollSchema]=useState(0);
const [topScrollSedi,setTopScrollSedi]=useState(0);
const [heightScrollSchema,setHeightScrollSchema]=useState(0);
const [heightScrollSedi,setHeightScrollSedi]=useState(0);

const [showColonnaDestra, setShowColonnaDestra] = useState(false);
const [showColonnaSinistra, setShowColonnaSinistra] = useState(false);
const [key, setKey] = useState(0);

// Organizza gli schemi in modo da avere un array di pagine
useEffect(() => {
  let organizzato=organizzaSchema(schemaCliente);
  setSchemaOrganizzato1(organizzato);

  organizzato=organizzaSchema(schemaSedi);
  setSchemaOrganizzato2(organizzato);
  setPagineSchemaOrganizzato2(organizzato);

 

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
  console.log("inputId",inputId,"formNumber",formNumber)
};


const handleEliminaPagina = (pageNumber) => {
  console.log("ELIMINA PAGINA",pageNumber)
  setPagineSchemaOrganizzato2((prevPagine) => {
    const newPagine=eliminaPagina(prevPagine, pageNumber)
    setKey((prevKey) => prevKey + 1); 
    return{...newPagine}
  });
};

 const handleAggiungiPagina = () => {
  setPagineSchemaOrganizzato2((prevPagine) => {
    const newPagine=  aggiungiPagina(prevPagine, schemaOrganizzato2)
    setKey((prevKey) => prevKey + 1); 
    return newPagine;
  });
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
                 { windowWidth < 768 && (
                          <TouchableOpacity
                              onPress={()=>{ dispatch(toggleLeftColumnWidth())} } >
                              <MaterialIcons name="menu" size={30} color="white" />
                          </TouchableOpacity>
                       )}
                  </View>
                 
                  <View style={{width:'70%',height:'100%',borderColor:'red',borderWidth:1,alignItems:'center',justifyContent:'center'}}>
                      <Text style={{textAlign:'center' ,  color:'white'}}>{windowWidth.toFixed(2)} x {windowHeight.toFixed(2)}</Text>
                      <Text style={{textAlign:'center' ,  color:'white'}}>HOME</Text>
                  </View>   

                  <View style={{width:'15%',height:'100%',borderColor:'red',borderWidth:1,justifyContent:'center',alignItems:'center'}}>
                       
                          <TouchableOpacity onPress={()=>{ dispatch(toggleRightColumnWidth())} }>
                              <Text style={{color:'white',textAlign:'center', fontSize:16}}>Apriti Sesamo</Text> 
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




<ColonnaSinistra  />



<ColonnaDestra   />

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

         
            
 {/******* SCROLL 1 ---------------------------------- */}
              <View style={{flex:1,position:'absolute',top:topScrollSchema,borderColor:'red',borderWidth:1}}>                                        
                    <InputPagineMultiple 
                        formNumber={1}
                        top={0}
                        altezzaScroll={heightScrollSchema}
                        larghezzaScroll={centralColumnWidth-bordoSnColonnaCn-bordoDxColonnaCn}
                        barra={true}
                        barraInserisciElimina={false}
                        placeholder={false}
                        etichetta={true}
                        schema={schemaOrganizzato1}
                        handleFocus ={handleFocus}/>
                </View>
        
                 

 {/******** SCROLL 2 ---------------------------------- */}
              <View style={{position:'absolute', top:topScrollSedi,borderColor:'red',borderWidth:1}}>
                    <InputPaginaSingola 
                        key={key} 
                        formNumber={2} 
                        schema={pagineSchemaOrganizzato2}
                        top={topScrollSedi}
                        altezzaScroll={heightScrollSedi}
                        larghezzaScroll={centralColumnWidth-bordoSnColonnaCn-bordoDxColonnaCn } 
                        barra={true}
                        barraInserisciElimina={true}
                        placeholder={true}
                        etichetta={false}
                        handleFocus={handleFocus} 
                        handleAggiungiPagina={handleAggiungiPagina}
                        handleEliminaPagina={handleEliminaPagina} /> 
              </View>            
    

        </View>
       {/***************FINE COLONNA CENTRALE ---------------------------------- */}  

    </SafeAreaView>
  )
}

export default InserimentoClienti

