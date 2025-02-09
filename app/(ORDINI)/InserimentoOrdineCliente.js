import { StyleSheet,ScrollView, Text, View,Platform,Keyboard,TouchableOpacity,Button} from 'react-native'
import React, {useState,useEffect} from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { schemaTestata,schemaRighe } from '../schemi/schemiOrdini';
import { useSelector, useDispatch } from 'react-redux';
import { setVariabileFittizia } from '../redux/slice/VariabiliCondivise';
import {  aggiungiPagina as aggiungiPaginaRedux } from '../redux/slice/pagineSlice';
//-----------------IMPORT COMPONENTI FORM DINAMICO------------

import { useForm, FormProvider } from "react-hook-form";

import InputPagineMultiple from '../componenti/componentiPagineScroll/InputPagineMultiple';
import InputPaginaSingola from '../componenti/componentiPagineScroll/InputPaginaSingola';
import {  aggiungiPagina as aggiungiPaginaSchema,eliminaPagina,  valoreAssoluto,
        inizializzaSchemaFormPaginaMultipla,
        inizializzaSchemaFormPagineSingole,
        aggiornaFormState} from '../utilità/FunzioniSchemi';

//----------------   IMPORT HOOKS  e moduli gestione colonne   ---------------------
import useColonneStandard from '../hooks/useColonneStandard ';
import useColonneOpzionali from '../hooks/useColonneOpzionali';
import ColonnaSinistra from '../componenti/componentiSchermate/ColonnaSinistra';
import ColonnaDestra from '../componenti/componentiSchermate/ColonnaDestra';
import {  getStileContenitoreColonnaCentrale, getStileContenitoreBottoniSubmit, getStileBottoniSubmit, getStileTestoBottoniSubmit } from '../stili/stiliColonne';
import Footer from '../componenti/componentiSchermate/Footer';
import Header from '../componenti/componentiSchermate/Header';
import { inizializzaScroll, aggiornaTutteLeProprietaScroll,aggiornaScroll } from '../utilità/FunzioniScroll';



const InserimentoOrdineCliente = () => {

 
  const [modalità, setModalità] = useState('NUOVO');
  const [tipo, setTipo] = useState('tipoApp1');
  const formMethods = useForm(); // Inizializziamo useForm nel componente principale
  const dispatch = useDispatch();
  const variabile = useSelector((state) => state.variabiliCondivise.variabile);

  useEffect(() => {
    console.log('Per Debug -----------------------INIZIO SCHERMATA---------------------------------------------')
  }, []);

  useEffect(() => {
    dispatch(setVariabileFittizia("Nuovo Valore"));
  }, [dispatch]);

  //-------------------------GESTONE COLONNE------------------------------------- 
// import useColonneStandard from '../hooks/useColonneStandard ';
// import useColonneOpzionali from '../hooks/useColonneOpzionali';
// import ColonnaSinistra from '../componenti/componentiSchermate/ColonnaSinistra'
// import ColonnaDestra from '../componenti/componentiSchermate/ColonnaDestra';
// import Footer from '../componenti/componentiSchermate/Footer';
// import Header from '../componenti/componentiSchermate/Header';
// <ColonnaSinistra />    ---- componente per la gestione delle colonnaSinistra
// <ColonnaDestra />    ---- componente per la gestione delle colonnaDestra
// <Header windowWidth={standardWindowWidth} headerHeight={standardHeaderHeight} titolo='Inserimento Clienti'/>
// <Footer windowWidth={standardWindowWidth} footerHeight={standardFooterHeight} />
// <View style={stileContenitoreColonnaCentrale}>  ---- stile per il contenitore della colonna centrale
// const stileContenitoreColonnaCentrale = getStileContenitoreColonnaCentrale(
 // standardLeftColumnStyles,
 // standardCentralColumnStyles,             
//  standardWindowHeight,  
//  standardHeaderHeight, 
//  standardFooterHeight
//);

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



  const [scroll, setScroll] = useState(inizializzaScroll(2));
 
  const [schema_1, setSchema_1] = useState([]);
  const [inizialeSchema_2, setInizialeSchema_2] = useState([]);
  const [schema_2, setSchema_2] = useState([]);

  
  const stileContenitoreColonnaCentrale = getStileContenitoreColonnaCentrale(
  standardLeftColumnStyles,standardCentralColumnStyles,standardWindowHeight,  
  standardHeaderHeight, standardFooterHeight
);

const stileContenitoreBottoniSubmit =  getStileContenitoreBottoniSubmit(
  standardCentralColumnStyles.width,standardLeftColumnStyles.width,standardFooterHeight);

 
const [focusedInput, setFocusedInput] = useState(null);

const [key, setKey] = useState(1);

 
 //console.log('Definizione schema_2',JSON.stringify(organizzato, null, 2))

 useEffect(() => {
  console.log('---------------------Inizio inizializzazioni schemi e formState ----------------------------')

  const nuovoOrganizzato1=inizializzaSchemaFormPaginaMultipla(
    0,    // Numero Schema
    schemaTestata,setSchema_1, // Schema e funzione per settare lo schema
    formMethods   // formMethods
  )
  
  const nuovoOrganizzato2=inizializzaSchemaFormPagineSingole(
    schemaRighe,  // Schema 
     1,  // Numero Schema
     1,  // Numero Pagina
     setInizialeSchema_2, setSchema_2, // Stati iniziale e organizzato
     formMethods)

console.log('Definizione schema_1 (per InputPagineMultiple)',nuovoOrganizzato1)
console.log('Definizione SchemaOrganizzato2 (per InputPagineSingole)',nuovoOrganizzato2)


formMethods.register( "0.nome");
formMethods.setValue("0.nome","Mario Rossi");
formMethods.setValue("0.codice","0001");
formMethods.setValue("0.partitaIva","12345678901");
/*
formMethods.register( "1.1_indirizzo");
formMethods.setValue( "1.1_indirizzo","Via di Vattelapesca");
formMethods.setValue( "1.1_comune","Roma");
formMethods.setValue( "1.1_cap","00100");
formMethods.setValue( "1.1_provincia","RM");
formMethods.setValue( "1.1_nazione","ITALIA");
*/
console.log('Form State Definizione:', formMethods.getValues());
console.log('---------------------Fine inizializzazioni schemi e formState ----------------------------')


}, [modalità]);


  
 
useEffect(()=>{
  //---------------------GESTIONE SCROLL-------------------------------------
  // Aggiornare tutte le proprietà dello stato 1
  setScroll(prevState => aggiornaTutteLeProprietaScroll(prevState, 1, { 
    top: 0, 
    altezza: Platform.OS ==='web' ? standardWindowHeight*0.20: standardWindowHeight*0.42, 
    larghezza: valoreAssoluto(standardWindowWidth,standardCentralColumnStyles.width)
                -standardCentralColumnStyles.borderLeftWidth
                -standardCentralColumnStyles.borderRightWidth
  }));

  // Aggiornare tutte le proprietà dello stato 2
  setScroll(prevState => aggiornaTutteLeProprietaScroll(prevState, 2, { 
    top: Platform.OS ==='web' ? standardWindowHeight*0.26: standardWindowHeight*0.47, 
    altezza: Platform.OS ==='web' ? standardWindowHeight*0.15: standardWindowHeight*0.25, 
    larghezza: valoreAssoluto(standardWindowWidth,standardCentralColumnStyles.width)
                -standardCentralColumnStyles.borderLeftWidth
                -standardCentralColumnStyles.borderRightWidth
  }));
},[standardWindowHeight,standardWindowWidth])




  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', () => {
      if (focusedInput && focusedInput.formNumber === 2) {
        setScroll(prevState => aggiornaScroll(prevState, 1, 'top', prevState[1].top - standardWindowHeight));
        setScroll(prevState => aggiornaScroll(prevState, 2, 'top', prevState[2].top - 200));
      }
    });
  
    const keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', () => {
      if (focusedInput && focusedInput.formNumber === 2) {
        setScroll(prevState => aggiornaScroll(prevState, 1, 'top', prevState[1].top + standardWindowHeight));
        setScroll(prevState => aggiornaScroll(prevState, 2, 'top', prevState[2].top + 200));
      }
    });
    return () => {
      keyboardDidHideListener.remove();
      keyboardDidShowListener.remove();
    };
  }, [focusedInput]);



  useEffect(() => {
  
  }, [formMethods]);



  const onSubmit = (data) => {
    console.log('---------------------------- il data nel submit ------------------------------');
    console.log('Form submitted successfully:', data);
    // Qui puoi gestire l'invio dei dati a un server o altre operazioni
  };
  const handleEvent = (event, formId, field, value, item) => {
  //  console.log(`Evento: ${event} , Form ID: ${formId}, Campo: ${field}, Valore: ${value}, Item:`, item);
  switch (event) { 
    case 'focus': 
    break;

    case 'change': 
    break; 

    case 'blur': 
    break; 

    default: 
        break; 
  } 

   
  };


 
const handleEliminaPagina = (pageNumber) => {

  console.log("ELIMINA PAGINA",pageNumber)
 
  const newPagine=eliminaPagina(schema_2, pageNumber,inizialeSchema_2,setSchema_2)
 // indice=1;   dovrebbe essere il formId
  const newFormState = aggiornaFormState(formMethods, pageNumber,1);
  formMethods.reset(newFormState);
  setKey((prevKey) => prevKey + 1); 
  return newPagine
  
};

 const handleAggiungiPagina = () => {
  
  setSchema_2((prevPagine) => {
    const newPageId = Object.keys(prevPagine).length + 1;
    const newPagine=  aggiungiPaginaSchema(prevPagine, inizialeSchema_2)
    setKey((prevKey) => prevKey + 1); 

    console.log('Aggiunta schema_2',newPagine)
    dispatch(aggiungiPaginaRedux()); // Dispatch dell'azione Redux per aggiungere una nuova pagina
   // INUTILE REGISTRARE I NUOVI CAMPI NEL FORM (LI PRENDE DA SOLO) 
     return newPagine;
  });
  
};
 
  return (
    <SafeAreaView style={{flex:1}}>

        <Header windowWidth={standardWindowWidth} headerHeight={standardHeaderHeight} titolo='Inserimento Ordine Cliente'/>
        <FormProvider {...formMethods}>
        <View style={stileContenitoreColonnaCentrale}>
            
                    <View style={{flex:1, position:'absolute',top:scroll[1].top,borderColor:'green',borderWidth:1}}>            
                        <InputPagineMultiple 
                            formId={0}
                            top={scroll[1].top}
                            altezzaScroll={scroll[1].altezza}
                            larghezzaScroll={scroll[1].larghezza}
                            barra={false}
                            barraInserisciElimina={false}
                            placeholder={false}
                            etichetta={true}
                            schema={schema_1}
                            handleEvent={handleEvent}
                           
                        />              
                    </View>
                    <View style={{position:'absolute', top:scroll[2].top-25,width:scroll[2].larghezza,alignItems:'center'}}>
                        <Text style={{fontFamily:'Roboto-Medium',fontSize:20}}> Righe Ordine</Text>
                    </View>
    {/*      */}
                    <View style={{position:'absolute', top:scroll[2].top,borderColor:'red',borderWidth:1}}>
                        <InputPaginaSingola 
                            key={key} 
                            formId={1}
                            top={scroll[2].top}
                            altezzaScroll={scroll[2].altezza}
                            larghezzaScroll={scroll[2].larghezza} 
                            barra={true}
                            barraInserisciElimina={true}
                            placeholder={true}
                            etichetta={false}
                            schema={schema_2}
                            handleAggiungiPagina={handleAggiungiPagina}
                            handleEliminaPagina={handleEliminaPagina}
                            handleEvent={handleEvent}
                          
                             /> 
                    </View> 
                     
         </View>
       
        </FormProvider>


        <ColonnaSinistra/>
        <ColonnaDestra />
       
        <View style={stileContenitoreBottoniSubmit}>
            
          <TouchableOpacity style={getStileBottoniSubmit(1)}
               onPress={formMethods.handleSubmit(onSubmit)} >
              <Text style={getStileTestoBottoniSubmit(1)}> SUBMIT</Text>     
          </TouchableOpacity>    
              
          <TouchableOpacity style={getStileBottoniSubmit(2)}
              onPress={()=> handleEvent('reset','form1')}> 
              <Text style={getStileTestoBottoniSubmit(2)}> RESET</Text>     
          </TouchableOpacity>
         
        
        </View>
     
       <Footer windowWidth={standardWindowWidth} footerHeight={standardFooterHeight} />
 
    </SafeAreaView>
  )
}


export default InserimentoOrdineCliente