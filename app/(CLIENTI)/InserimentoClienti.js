import { StyleSheet,ScrollView, Text, View,Platform,Keyboard,TouchableOpacity,Button,FlatList} from 'react-native'
import React, {useState,useEffect} from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useForm, FormProvider,} from "react-hook-form";
import DataManager from '../utilità/DataManager/DataManager';
import uuid from 'react-native-uuid'; // Importa uuid per generare ID unici
//import { useLocalSearchParams } from 'expo-router'
import { schemaCliente,schemaSedi } from '../schemi/schemiClienti';
import { useSelector, useDispatch } from 'react-redux';

import {  aggiungiPagina as aggiungiPaginaRedux } from '../redux/slice/pagineSlice';

//-----------------IMPORT COMPONENTI FORM DINAMICO------------
import { showRightColumn, hideRightColumn } from '../redux/slice/SliceColonnaOpzionale'; 


import InputPagineMultiple from '../componenti/componentiPagineScroll/InputPagineMultiple';
import InputPaginaSingola from '../componenti/componentiPagineScroll/InputPaginaSingola';
import {aggiungiPagina as aggiungiPaginaSchema,eliminaPagina,  valoreAssoluto,inizializzaSchemaFormPaginaMultipla,
        inizializzaSchemaFormPagineSingole,aggiornaFormState} from '../utilità/FunzioniSchemi';

import {setTipoContenuto, resetRisposta, setClientiData,aggiornaCache } from '../redux/slice/colonnaDestraSlice'

//----------------   IMPORT HOOKS  e moduli gestione colonne   ---------------------
import useColonneStandard from '../hooks/useColonneStandard ';
import useColonneOpzionali from '../hooks/useColonneOpzionali';
import ColonnaSinistra from '../componenti/componentiSchermate/ColonnaSinistra';
import ColonnaDestra from '../componenti/componentiSchermate/ColonnaDestra';
import {  getStileContenitoreColonnaCentrale, getStileContenitoreBottoniSubmit, getStileBottoniSubmit, getStileTestoBottoniSubmit } from '../stili/stiliColonne';
import Footer from '../componenti/componentiSchermate/Footer';
import Header from '../componenti/componentiSchermate/Header';
import { inizializzaScroll, aggiornaTutteLeProprietaScroll,aggiornaScroll } from '../utilità/FunzioniScroll';
import {leggeDatiCache,salvaDatiCache,aggiornaDatiCache} from '../utilità/FunzioniCache'; 




const InserimentoClienti = () => {
 
  const [tipo, setTipo] = useState('tipoApp1');
  const formMethods = useForm(); // Inizializziamo useForm nel componente principale
  const dispatch = useDispatch();
 // const [clientiData, setClientiDataState] = useState([]); 
  const [clienteSelezionato,setClienteSelezionato]=useState([]);
  const [titolo, setTitolo] = useState('Lavorazione Clienti'); // Stato per il titolo
  const risposta = useSelector((state) => state.colonnaDestra.risposta);
  const [MODALITA, setMODALITA] = useState('NUOVO');

  



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

const stileContenitoreColonnaCentrale = getStileContenitoreColonnaCentrale(
  standardLeftColumnStyles,standardCentralColumnStyles,standardWindowHeight,  
  standardHeaderHeight, standardFooterHeight
);
const stileContenitoreBottoniSubmit =  getStileContenitoreBottoniSubmit(
  standardCentralColumnStyles.width,standardLeftColumnStyles.width,standardFooterHeight);

 
 
  const [scroll, setScroll] = useState(inizializzaScroll(2));
 
  const [schema_1, setSchema_1] = useState([]);
  const [inizialeSchema_2, setInizialeSchema_2] = useState([]);
  const [schema_2, setSchema_2] = useState([]);

const [focusedInput, setFocusedInput] = useState(null);

const [key, setKey] = useState(1);

 
 //console.log('Definizione schema_2',JSON.stringify(organizzato, null, 2))

 //---------------------GESTIONE SCROLL-------------------------------------
  useEffect(()=>{
      // Aggiornare tutte le proprietà dello stato 1
      setScroll(prevState => aggiornaTutteLeProprietaScroll(prevState, 1, { 
        top: 0, 
        altezza: Platform.OS ==='web' ? standardWindowHeight*0.22: standardWindowHeight*0.42, 
        larghezza: valoreAssoluto(standardWindowWidth,standardCentralColumnStyles.width)
                -standardCentralColumnStyles.borderLeftWidth
                -standardCentralColumnStyles.borderRightWidth
        }));  

  // Aggiornare tutte le proprietà dello stato 2
      setScroll(prevState => aggiornaTutteLeProprietaScroll(prevState, 2, { 
        top: Platform.OS ==='web' ? standardWindowHeight*0.30: standardWindowHeight*0.47, 
        altezza: Platform.OS ==='web' ? standardWindowHeight*0.25: standardWindowHeight*0.25, 
        larghezza: valoreAssoluto(standardWindowWidth,standardCentralColumnStyles.width)
                -standardCentralColumnStyles.borderLeftWidth
                -standardCentralColumnStyles.borderRightWidth
      }));

},[standardWindowHeight,standardWindowWidth])

useEffect(() => {
  console.log('-------------------INIZIO SCHERMATA------------------------')
       inizializzaFormNuovo();
      setClienteSelezionato(null)
      dispatch(setTipoContenuto('ListaClienti'));
}, []);


const inizializzaFormNuovo = () => {
  formMethods.reset(); // Resetta lo stato del form
  setSchema_2({}); // Elimina le pagine successive dello schema
  const nuovoOrganizzato1=inizializzaSchemaFormPaginaMultipla( 0, schemaCliente,setSchema_1, formMethods   )
  const nuovoOrganizzato2=inizializzaSchemaFormPagineSingole(schemaSedi, 1, 1,  setInizialeSchema_2, setSchema_2, formMethods)
  setTitolo('Inserimento Clienti');
}

const inizializzaFormModifica = (cliente) => {
  setTitolo('Modfifica Cliente');
  setSchema_2({}); // Elimina le pagine successive dello schema
  const nuovoOrganizzato1 = inizializzaSchemaFormPaginaMultipla(0, schemaCliente, setSchema_1, formMethods);
    const nuovoOrganizzato2 = inizializzaSchemaFormPagineSingole(schemaSedi, 1, 1, setInizialeSchema_2, setSchema_2, formMethods);
  Object.keys(cliente).forEach((key) => {
    formMethods.setValue(key, cliente[key]);
  });  
    // Determina il numero di pagine necessarie
     let numeroPagine = 1;
     Object.entries(cliente).forEach(([key, value]) => {
       if (typeof value === 'object' && value !== null) {
         Object.keys(value).forEach((subKey) => {
           const keyParts = subKey.split('_');
           if (keyParts.length > 1) {
             const pageIndex = parseInt(keyParts[0], 10);
             if (!isNaN(pageIndex) && pageIndex > numeroPagine) {
               numeroPagine = pageIndex;
             }
           }
         });
       }
     });

 // Aggiungi le pagine necessarie
 for (let i = 2; i <= numeroPagine; i++) {
  setSchema_2((prevPagine) => {
    const newPagine = aggiungiPaginaSchema(prevPagine, inizialeSchema_2);
    setKey((prevKey) => prevKey + 1);
    dispatch(aggiungiPaginaRedux()); // Dispatch dell'azione Redux per aggiungere una nuova pagina
    return newPagine;
  });
}


}


useEffect(() => {  
    if (risposta) {
      setClienteSelezionato(risposta)  
      setMODALITA('MODIFICA');
      inizializzaFormModifica(risposta);
     } else  {     
      setMODALITA('NUOVO'); 
       setClienteSelezionato(null)      
     }
}, [risposta]);




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



   const resetCache = () => {
    DataManager.resetCache();
    console.log('Cache resettata');
  //  setClientiData([]); // Resetta lo stato dei dati dei clienti
  };
  
  
  const onSubmit = async (data) => {
 console.log('il data nel submit ',data);
 console.log('il Cliente selezionato nel submit ',clienteSelezionato);
  //  console.log('Form submitted successfully in modalita:',MODALITA, data);
  
  if (MODALITA === 'MODIFICA') {
      const newId = uuid.v4();
      const formValues = formMethods.getValues();
      formValues[0].id = newId; 
      formMethods.setValue('id', newId); // Riempie il campo id esistente
      await aggiornaDatiCache('clientiData', formValues);
      dispatch(aggiornaCache()); // Dispatch per aggiornare la cache
      //--------------solo per debug----------------------------------
      const datiCache = await DataManager.loadData('clientiData');
      console.log('in submit NUOVO Dati della cache:', datiCache);
      //--------------------------------------------------------------- 
      inizializzaFormNuovo(); // Reinizializza il form per un nuovo inserimento
  } else  {     
      let existingData = DataManager.loadData('clientiData') || [];
      if (!Array.isArray(existingData)) {
        existingData = [];
      }
      const id=clienteSelezionato[0].id
      // Trova l'indice del cliente da modificare
      const clienteIndex = existingData.findIndex((cliente) => cliente[0].id === id);  
      console.log('CLIENTE INDEX',clienteIndex)
      console.log('EXISTING DATA', existingData);
    console.log('CLIENTE SELEZIONATO', clienteSelezionato);
      if (clienteIndex !== -1) {
          const formValues = formMethods.getValues();
          existingData[clienteIndex] = formValues;
          DataManager.saveData('clientiData', existingData);
          //--------------solo per debug----------------------------------
          const datiCache = await DataManager.loadData('clientiData');
          console.log('in submit MODIFICA Dati della cache:', datiCache);
          //---------------------------------------------------------------
        dispatch(aggiornaCache()); // Dispatch per aggiornare la cache
      }
        
      setClienteSelezionato(null)
      inizializzaFormNuovo(); // Reinizializza il form per un nuovo inserimento
}
    
    //  puoi gestire l'invio dei dati a un server o altre operazioni
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


const annulla=()=>{

  console.log('SONO ANNULLA')
  formMethods.reset(); // Resetta lo stato del form
  setClienteSelezionato(null); // Elimina il cliente selezionato
  setTitolo('Lavorazione Clienti'); // Cambia il titolo in "Lavorazione Clienti"
  setMODALITA('NUOVO'); // Imposta la modalità a NUOVO
  inizializzaFormNuovo(); // Reinizializza il form per un nuovo inserimento

}


const handleAnnulla = () => {
  annulla();
};
/*
const handleApriListaClienti = () => {
  console.log('APRI LISTA')
  dispatch(setTipoContenuto('ListaClienti'));
  dispatch(showRightColumn());
};
*/
  return (
    <SafeAreaView style={{flex:1}}>

        <Header windowWidth={standardWindowWidth} 
            headerHeight={standardHeaderHeight} 
            titolo={titolo} 
           />
        <FormProvider {...formMethods}>
        <View style={stileContenitoreColonnaCentrale}>
      {/*
        <SelezioneModal
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
        handleNuovoCliente={handleNuovoCliente}
        handleModificaCliente={handleModificaCliente}
      /> 
      */}
                    <View style={{flex:1, position:'absolute',top:scroll[1].top,
                                  borderColor:'green',borderWidth:0,
                                  backgroundColor:'rgba(173, 216, 230, 0.7)'}}>            
                        <InputPagineMultiple 
                            formId={0}
                            top={scroll[1].top}
                            altezzaScroll={scroll[1].altezza}
                            larghezzaScroll={scroll[1].larghezza}
                            barra={true}
                            barraInserisciElimina={false}
                            placeholder={false}
                            etichetta={true}
                            schema={schema_1}
                            handleEvent={handleEvent}
                            altezzaColonna={standardWindowHeight}
                             
                        />              
                    </View>
   
                    <View style={{position:'absolute', top:scroll[2].top,
                                  borderColor:'red',borderWidth:0,
                                  backgroundColor:'rgba(173, 216, 230, 0.7)'
                                  }}>
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
                            altezzaColonna={standardWindowHeight} /> 
                    </View> 
            </View>
       
        </FormProvider>


        <ColonnaSinistra/>
       <ColonnaDestra />
      
       
        <View style={stileContenitoreBottoniSubmit}>
        {/*
        <TouchableOpacity style={getStileBottoniSubmit(1)}
               onPress={handleApriListaClienti}>
              <Text style={getStileTestoBottoniSubmit(1)}> LISTA CLIENTI</Text>     
          </TouchableOpacity>  
 */}
          <TouchableOpacity style={getStileBottoniSubmit(1)}
               onPress={formMethods.handleSubmit(onSubmit)}>
              <Text style={getStileTestoBottoniSubmit(1)}> SUBMIT</Text>     
          </TouchableOpacity>  

          <TouchableOpacity style={getStileBottoniSubmit(1)}
              onPress={handleAnnulla}>
              <Text style={getStileTestoBottoniSubmit(1)}> ANNULLA</Text>     
          </TouchableOpacity> 

          <TouchableOpacity style={getStileBottoniSubmit(2)}
              onPress={resetCache}> 
              <Text style={getStileTestoBottoniSubmit(2)}> RESET</Text>     
          </TouchableOpacity>
         
        
        </View>
     
       <Footer windowWidth={standardWindowWidth} footerHeight={standardFooterHeight} />
 
    </SafeAreaView>
  )
}


export default InserimentoClienti

/*
    Object.keys(clienteSelezionato).forEach((key) => {
      formMethods.setValue(key, clienteSelezionato[key]);
    });  
    */
   