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
import ColonnaDestra from '../componenti/ColonnaDestra';
import ColonnaSinistra from '../componenti/ColonnaSinistra';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import InputPagineMultiple from '../componenti/componentiPagineScroll/InputPagineMultiple';
import InputPaginaSingola from '../componenti/componentiPagineScroll/InputPaginaSingola';

import { toggleLeftColumnWidth } from '../redux/slice/columnDimensionSlice';
import { toggleRightColumnWidth } from '../redux/slice/columnDimensionSlice';

import { useSelector,useDispatch} from 'react-redux';
import { setFormData, resetFormData, setFieldValue } from '../redux/slice/formSlice';
import { useForm, FormProvider } from "react-hook-form";

const InserimentoClienti = () => {
  const [modalità, setModalità] = useState('NUOVO');

  const dispatch = useDispatch();
  const methodsForm1 = useForm(); 
  const methodsForm2 = useForm();
  const formState = useSelector((state) => state.forms);

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
const [pagineSchemaOrganizzato2, setPagineSchemaOrganizzato2] = useState([]);

const [focusedInput, setFocusedInput] = useState(null);

const [topScrollSchema1,setTopScrollSchema1]=useState(0);
const [topScrollSchema2,setTopScrollSchema2]=useState(0);
const [heightScrollSchema1,setHeightScrollSchema1]=useState(0);
const [heightScrollSchema2,setHeightScrollSchema2]=useState(0);

const [showColonnaDestra, setShowColonnaDestra] = useState(false);
const [showColonnaSinistra, setShowColonnaSinistra] = useState(false);
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
  setHeightScrollSchema1(Platform.OS ==='web' ? windowHeight*0.32: windowHeight*0.42)
  setTopScrollSchema2(Platform.OS ==='web' ? windowHeight*0.37: windowHeight*0.47)
  setHeightScrollSchema2(Platform.OS ==='web' ? windowHeight*0.30: windowHeight*0.25)
  },[windowWidth,windowHeight])


 


  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', () => {
      if (focusedInput && focusedInput.formNumber === 2) {
        setTopScrollSchema1((prevTopScrollSchema1) => prevTopScrollSchema1 -windowHeight); 
        setTopScrollSchema2((prevTopScrollSchema2) => prevTopScrollSchema2 - 200);
      }
    });
  
    const keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', () => {
      if (focusedInput && focusedInput.formNumber === 2) {
        setTopScrollSchema1((prevTopScrollSchema1) => prevTopScrollSchema1 +windowHeight); 
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
              <FormProvider {...methodsForm1}>
              <View style={{flex:1,position:'absolute',top:topScrollSchema1,borderColor:'red',borderWidth:1}}>                                        
                    <InputPagineMultiple 
                        formNumber={1}
                        top={0}
                        altezzaScroll={heightScrollSchema1}
                        larghezzaScroll={centralColumnWidth-bordoSnColonnaCn-bordoDxColonnaCn}
                        barra={true}
                        barraInserisciElimina={false}
                        placeholder={false}
                        etichetta={true}
                        schema={schemaOrganizzato1}
                        initialDataForm={initialDataForm1}
                        handleEvent={handleEvent}
                        />
                </View>
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
                        larghezzaScroll={centralColumnWidth-bordoSnColonnaCn-bordoDxColonnaCn } 
                        barra={true}
                        barraInserisciElimina={true}
                        placeholder={true}
                        etichetta={false}
                        handleAggiungiPagina={handleAggiungiPagina}
                        handleEliminaPagina={handleEliminaPagina}
                        handleEvent={handleEvent} /> 
              </View>            
              </FormProvider>
              <Button title="Submit Form 1" onPress={methodsForm1.handleSubmit(onSubmitForm1)} />
              <Button title="Submit Form 2" onPress={methodsForm2.handleSubmit(onSubmitForm2)} />
        </View>
       {/***************FINE COLONNA CENTRALE ---------------------------------- */}  

    </SafeAreaView>
  )
}

export default InserimentoClienti

