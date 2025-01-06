import { StyleSheet, Text, View,Platform,Keyboard,TouchableOpacity,Button} from 'react-native'
import React, { useContext, useState,useEffect} from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
//import PaginaScroll from '../componenti/componentiPagineScroll/PaginaScroll';
import { schemaCliente,schemaSedi } from '../schemi/schemiClienti';
import { organizzaSchema,aggiungiPagina,eliminaPagina} from '../schemi/FunzioniSchemi';
import { useForm, Controller } from 'react-hook-form'; 
import { ColumnDimensionsContext } from '../context/ColumnDimensionsContext';
import ColonnaSinistra from '../componenti/ColonnaSinistra';
import ColonnaDestra from '../componenti/ColonnaDestra';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import InputPagineMultiple from '../componenti/componentiPagineScroll/InputPagineMultiple';
import InputPaginaSingola from '../componenti/componentiPagineScroll/InputPaginaSingola';

const InserimentoClienti = () => {
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

const { control: controlAnagrafica, handleSubmit: handleSubmitAnagrafica, setValue: setValueAnagrafica, getValues: getValuesAnagrafica, reset: resetAnagrafica, formState: { errors: errorsAnagrafica } } = useForm();
const { control: controlSedi, handleSubmit: handleSubmitSedi, setValue: setValueSedi, getValues: getValuesSedi, reset: resetSedi, formState: { errors: errorsSedi } } = useForm();


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

const [key, setKey] = useState(0);


useEffect(() => {
  let organizzato = organizzaSchema(schemaCliente);
  setSchemaOrganizzato(organizzato);
  organizzato = organizzaSchema(schemaSedi);
  setSchemaSediOrganizzato(organizzato);

  let pagineIniziali = {};
  pagineIniziali = aggiungiPagina(pagineIniziali, organizzato);

  setPagineForm2(pagineIniziali);
 
  setShowColonnaSinistra(false);
  setShowColonnaDestra(false);
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
  console.log("inputId",inputId,"formNumber",formNumber)
};


const handleEliminaPagina = (pageNumber) => {
  setPagineForm2((prevPagine) => {
    const newPagine=eliminaPagina(prevPagine, pageNumber)
    setKey((prevKey) => prevKey + 1); 
    return{...newPagine}
  });
};

 const handleAggiungiPagina = () => {
  setPagineForm2((prevPagine) => {
    const newPagine=  aggiungiPagina(prevPagine, schemaSediOrganizzato)
    setKey((prevKey) => prevKey + 1); 
 
    return newPagine;
  });
};

const onSubmitAnagrafica = (data) => {
  console.log('Anagrafica:', data);
};

const onSubmitSedi = (data) => {
  console.log("Sedi:", JSON.stringify(data, null, 2));
  resetSedi();
  // Imposta pagineForm2 con un solo oggetto vuoto
  let pagineIniziali = {};
  pagineIniziali = aggiungiPagina(pagineIniziali, schemaSediOrganizzato);
  setPagineForm2(pagineIniziali);
  setKey((prevKey) => prevKey + 1);
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




<ColonnaSinistra showColonnaSinistra={showColonnaSinistra} />



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
                        schema={schemaOrganizzato}
                        handleFocus ={handleFocus}
                        control={controlAnagrafica}
                        errors={errorsAnagrafica}
                        />
                </View>
        
                 
    {/*console.log("Pagine Form 2 (prima dell imputPaginaSingola):", JSON.stringify(pagineForm2, null, 2))*/}
 {/******** SCROLL 2 ---------------------------------- */}
              <View style={{position:'absolute', top:topScrollSedi,borderColor:'red',borderWidth:1}}>
                    <InputPaginaSingola 
                        key={key} 
                        formNumber={2} 
                        schema={pagineForm2}
                        top={topScrollSedi}
                        altezzaScroll={heightScrollSedi}
                        larghezzaScroll={centralColumnWidth-bordoSnColonnaCn-bordoDxColonnaCn } 
                        barra={true}
                        barraInserisciElimina={true}
                        placeholder={true}
                        etichetta={false}
                        handleFocus={handleFocus} 
                        handleAggiungiPagina={handleAggiungiPagina}
                        handleEliminaPagina={handleEliminaPagina}
                        control={controlSedi}
                        errors={errorsSedi} 
                          /> 
              </View>            
    

        </View>
       {/***************FINE COLONNA CENTRALE ---------------------------------- */}  
       <View style={{position:'absolute',top:windowHeight-50,left:0,width:windowWidth,height:50,backgroundColor:'red',flexDirection:'row',justifyContent:'space-around',alignItems:'center'}}>
       <Button title="Submit Anagrafica" onPress={handleSubmitAnagrafica(onSubmitAnagrafica)} />
       <Button title="Submit Sedi" onPress={handleSubmitSedi(onSubmitSedi)} />
        </View>
    </SafeAreaView>
  )
}

export default InserimentoClienti

