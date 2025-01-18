import { StyleSheet, Text, View,Platform,Keyboard,TouchableOpacity,Button} from 'react-native'
import React, {useState,useEffect} from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { schemaCliente,schemaSedi } from '../schemi/schemiClienti';
import { organizzaSchema,
          aggiungiPagina,
          eliminaPagina,
          inizializzaFormDataVuoto,
          inizializzaFormDataVuotoConPagina,
          aggiungiPrefissoAllaKey,
        } from '../schemi/FunzioniSchemi';
import { useSelector, useDispatch } from 'react-redux';
import ColonnaSinistra from '../componenti/componentiSchermate/ColonnaSinistra';
import ColonnaDestra from '../componenti/componentiSchermate/ColonnaDestra';
import Footer from '../componenti/componentiSchermate/Footer';
import Header from '../componenti/componentiSchermate/Header';
import { getStileContenitoreColonnaCentrale} from '../stili/stiliColonne';
import useColonneStandard from '../hooks/useColonneStandard ';
import useColonneOpzionali from '../hooks/useColonneOpzionali';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import InputPagineMultiple from '../componenti/componentiPagineScroll/InputPagineMultiple';
import InputPaginaSingola from '../componenti/componentiPagineScroll/InputPaginaSingola';


import { setFormData, resetFormData, setFieldValue } from '../redux/slice/formSlice';
import { useForm, FormProvider } from "react-hook-form";

const InserimentoClienti = () => {
  const [modalità, setModalità] = useState('NUOVO');
  const [tipo, setTipo] = useState('tipoApp1');
  const dispatch = useDispatch();
  const methodsForm1 = useForm(); 
  const methodsForm2 = useForm();
  const formState = useSelector((state) => state.forms);

  const {
    windowHeight: standardWindowHeight, 
    windowWidth: standardWindowWidth, 
    headerHeight: standardHeaderHeight, 
    footerHeight: standardFooterHeight, 
    leftColumnStyles: standardLeftColumnStyles, 
    centralColumnStyles: standardCentralColumnStyles, 
    showColonnaSinistra: showStandardColonnaSinistra, 
    showColonnaDestra: showStandardColonnaDestra
  } = useColonneStandard(tipo);

  const {
    windowHeight: optionalWindowHeight, 
    windowWidth: optionalWindowWidth, 
    headerHeight: optionalHeaderHeight, 
    footerHeight: optionalFooterHeight, 
    leftColumnStyles: optionalLeftColumnStyles, 
    centralColumnStyles: optionalCentralColumnStyles, 
    showColonnaSinistra: showOptionalColonnaSinistra, 
    showColonnaDestra: showOptionalColonnaDestra,
    showWarningMessage
  } = useColonneOpzionali(tipo);  

  

 

const [schemaOrganizzato1, setSchemaOrganizzato1] = useState([]);
const [schemaOrganizzato2, setSchemaOrganizzato2] = useState([]);
const [pagineSchemaOrganizzato2, setPagineSchemaOrganizzato2] = useState([]);

const [focusedInput, setFocusedInput] = useState(null);

const [topScrollSchema1,setTopScrollSchema1]=useState(0);
const [topScrollSchema2,setTopScrollSchema2]=useState(0);
const [heightScrollSchema1,setHeightScrollSchema1]=useState(0);
const [heightScrollSchema2,setHeightScrollSchema2]=useState(0);
const [larghezzaScroll1,setLarghezzaScroll1]=useState(0);
const [larghezzaScroll2,setLarghezzaScroll2]=useState(0);
const [key, setKey] = useState(0);


// Organizza gli schemi in modo da avere un array di pagine
const [initialDataForm1, setInitialDataForm1] = useState({}); 
const [initialDataForm2, setInitialDataForm2] = useState({});


useEffect(() => {
  let organizzato=organizzaSchema(schemaCliente);
  setSchemaOrganizzato1(organizzato);
 let dataForm1=inizializzaFormDataVuoto(organizzato);
 setInitialDataForm1(dataForm1);
  organizzato=organizzaSchema(schemaSedi);
  setSchemaOrganizzato2(organizzato);
 //console.log('SchemaOrganizzato2',JSON.stringify(organizzato, null, 2))
 const organizzato2= aggiungiPrefissoAllaKey(organizzato)
//console.log('SchemaOrganizzato2',JSON.stringify(organizzato2, null, 2))
  setPagineSchemaOrganizzato2(organizzato2);
  let dataForm2=inizializzaFormDataVuotoConPagina(organizzato,1);
  setInitialDataForm2(dataForm2);
  console.log('DATA FORM 2',dataForm2)
  }, [modalità]);

  
  // Aggiorna le dimensioni dei contenitori scroll in base alla grandezza della finestra
useEffect(()=>{
  setTopScrollSchema1(0)
  setHeightScrollSchema1(Platform.OS ==='web' ? standardWindowHeight*0.32: standardWindowHeight*0.42)
  setTopScrollSchema2(Platform.OS ==='web' ? standardWindowHeight*0.37: standardWindowHeight*0.47)
  setHeightScrollSchema2(Platform.OS ==='web' ? standardWindowHeight*0.30: standardWindowHeight*0.25)
 
},[standardWindowHeight])

useEffect(() => {
  const percentValue = parseFloat(standardCentralColumnStyles.width) / 100
  const ll=(percentValue * standardWindowWidth ) //-standardCentralColumnStyles.borderLeftWidth-standardCentralColumnStyles.borderRightWidth

  setLarghezzaScroll1(ll-standardCentralColumnStyles.borderLeftWidth-standardCentralColumnStyles.borderRightWidth)
  setLarghezzaScroll2(ll-standardCentralColumnStyles.borderLeftWidth-standardCentralColumnStyles.borderRightWidth)

}, [standardWindowWidth]);
 


  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', () => {
      if (focusedInput && focusedInput.formNumber === 2) {
        setTopScrollSchema1((prevTopScrollSchema1) => prevTopScrollSchema1 -standardWindowHeight); 
        setTopScrollSchema2((prevTopScrollSchema2) => prevTopScrollSchema2 - 200);
      }
    });
  
    const keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', () => {
      if (focusedInput && focusedInput.formNumber === 2) {
        setTopScrollSchema1((prevTopScrollSchema1) => prevTopScrollSchema1 +standardWindowHeight); 
        setTopScrollSchema2((prevTopScrollSchema2) => prevTopScrollSchema2 + 200);
      }
    });
    return () => {
      keyboardDidHideListener.remove();
      keyboardDidShowListener.remove();
    };
  }, [focusedInput]);

  const onSubmitForm1 = (data) => { 
    console.log('Form 1 Data:', data); 
  }; 
    
  const onSubmitForm2 = (data) => { 
    console.log('Form 2 Data:', data);
   }



  const handleEvent = (formNumber, event, name, value) => {
    console.log(`Event ${event} on field ${name} in form ${formNumber} with value ${value}`);
   
    }


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

   // console.log('SchemaOrganizzato2',JSON.stringify(newPagine, null, 2))
    return newPagine;
  });
};
 const stileContenitoreColonnaCentrale = getStileContenitoreColonnaCentrale(
    standardLeftColumnStyles,
    standardCentralColumnStyles,             
    standardWindowHeight,  
    standardHeaderHeight, 
    standardFooterHeight
  );


  return (
    <SafeAreaView style={{flex:1}}>
   {/****************** HEADER  ---------------------------------- */}  
        <Header windowWidth={standardWindowWidth} headerHeight={standardHeaderHeight} />
               
        <ColonnaSinistra/>
        <ColonnaDestra />
     




{/******************COLONNA CENTRALE ---------------------------------- */}
       
        <View style={stileContenitoreColonnaCentrale}>

      {console.log('AlezzaScrollSchema1',heightScrollSchema1)}   
      {console.log('topScrollSchema1',topScrollSchema1)} 
      {console.log('standardCentralColumnStyles.width',parseFloat(standardCentralColumnStyles.width) / 100 * standardWindowWidth)} 
      {console.log('standardCentralColumnStyles',standardCentralColumnStyles)} 
      {console.log('larghezzaScroll1',larghezzaScroll1)} 
      {console.log('larghezzaScroll2',larghezzaScroll2)} 
 {/******* SCROLL 1 ---------------------------------- */}
              <FormProvider {...methodsForm1}>
              {/* 
              <View style={{flex:1,
                            position:'absolute',
                            top:topScrollSchema1,borderColor:'red',borderWidth:1}}>   
*/}

                    <InputPagineMultiple 
                        formNumber={1}
                        top={0}
                        altezzaScroll={heightScrollSchema1}
                        larghezzaScroll={larghezzaScroll1}
                        barra={true}
                        barraInserisciElimina={false}
                        placeholder={false}
                        etichetta={true}
                        schema={schemaOrganizzato1}
                        initialDataForm={initialDataForm1}
                        handleEvent={handleEvent}
                        />
                {/*
                </View>
                */}
                </FormProvider>
                 

 {/******** SCROLL 2 ---------------------------------- */}
            <FormProvider {...methodsForm2}>
              <View style={{position:'absolute', top:topScrollSchema2,borderColor:'red',borderWidth:1}}>
                    <InputPaginaSingola 
                        key={key} 
                        formNumber={2} 
                        schema={pagineSchemaOrganizzato2}
                         initialDataForm={initialDataForm2}
                        top={topScrollSchema2}
                        altezzaScroll={heightScrollSchema2}
                        larghezzaScroll={larghezzaScroll2} 
                        barra={true}
                        barraInserisciElimina={true}
                        placeholder={true}
                        etichetta={false}
                        handleAggiungiPagina={handleAggiungiPagina}
                        handleEliminaPagina={handleEliminaPagina}
                        handleEvent={handleEvent} /> 
              </View>            
              </FormProvider>
             
        </View>
       {/***************FINE COLONNA CENTRALE ---------------------------------- */}  

    </SafeAreaView>
  )
}

export default InserimentoClienti

/*
 <Button title="Submit Form 1" onPress={methodsForm1.handleSubmit(onSubmitForm1)} />
              <Button title="Submit Form 2" onPress={methodsForm2.handleSubmit(onSubmitForm2)} />
*/