import { ScrollView, StyleSheet, Text, View,Platform} from 'react-native'
import React, { useContext, useState,useEffect} from 'react';
import WindowDimensionsContext from '../context/WindowDimensionsContext';
import { SafeAreaView } from 'react-native-safe-area-context';
import PaginaScroll from '../componenti/PaginaScroll';
import { schemaCliente } from '../schemi/schemiClienti';
import { organizzaSchema } from '../schemi/FunzioniSchemi';
import FormFinamico  from '../componenti/FormDinamico';

const Home = () => {
const { width, height } = useContext(WindowDimensionsContext);


//console.log('Dimensioni window', width, 'x', height, 'Dimensioni container', containerWidth, 'x', containerHeight);
const [schemaOrganizzato, setSchemaOrganizzato] = useState([]);
const [posizioni, setPosizioni] = useState({});

  // console.log('SCHEMA',JSON.stringify(schemaCliente, null, 2))
 useEffect(() => {
  const organizzato=organizzaSchema(schemaCliente);
  setSchemaOrganizzato(organizzato);

console.log('SCHEMA',JSON.stringify(organizzato, null, 2))
 }, []);

 useEffect(()=>{
  const posizioniIniziali={
    header:{
      top:height*0.01,
      left: width*0.02,
      bottom:0,
      width:width-(( width*0.02))*2,
      height:height*0.07,
    },
    
    finestraScroll:{
      top:height*0.10,
      left: width*0.02,
      bottom:0,
      width:width-(( width*0.02))*2,
      height:Platform.OS ==='web' ? height*0.32: height*0.42,
    },
  
  }

setPosizioni(posizioniIniziali)
 // console.log("POSIZIONI", posizioniIniziali.header.top)
 },[width,height])

  return (
    <SafeAreaView style={{flex:1}}>
        {posizioni.header && (
              <View 
                style={{position: 'absolute', borderColo: 'blue', borderWidth:2,
                    top:posizioni.header.top,
                    left: posizioni.header.left,
                    width:posizioni.header.width,
                    height: posizioni.header.height,
                }}>
                <View style={{alignItems:'center'}}>
                  <Text>POSTO HEADER</Text>
                  <Text style={{fontSize:16}}>Window {width.toFixed(1)} 'x' {height.toFixed(1)}/Contenitore: {posizioni.finestraScroll.width.toFixed(1)}  x  {posizioni.finestraScroll.height.toFixed(1)}</Text>
                </View>
              </View>
        )}

        {posizioni.finestraScroll && (
            <View 
                style={{position:'absolute', flex:1,  
                    top:posizioni.finestraScroll.top,
                    left: posizioni.finestraScroll.left,
                    width:posizioni.finestraScroll.width,
                    height: posizioni.finestraScroll.height,
                           
                }}>
                <PaginaScroll 
                    scrollWidth={posizioni.finestraScroll.width}  
                    scrollHeight={posizioni.finestraScroll.height} 
                    barra={true}
                >
                    {Object.keys(schemaOrganizzato).map((pagina, index) => (
                        <View key={index} 
                              style={{ marginTop:10,                      
                                  width: posizioni.finestraScroll.width, 
                                  height: posizioni.finestraScroll.height ,                      
                              }}>
                              <FormFinamico 
                                  schemaPagina={schemaOrganizzato[pagina]} 
                                  containerWidth={posizioni.finestraScroll.width} 
                                  containerHeight={posizioni.finestraScroll.height}                         
                              />
                        </View>
                     ))}
                </PaginaScroll>         
            </View>
        )}
       
  {/*
    <View style={{ flex: 1, alignItems: 'center'}}>
        <View style={{ width:containerWidth }}>
            <PaginaScroll  scrollWidth={containerWidth}  scrollHeight={containerHeight}  >

                {data.map((item, index) => ( 
                  <MioComponente 
                     key={index} 
                     backgroundColor={item.color} 
                     borderColor={item.borderColor} 
                     borderWidth={item.borderWidth} 
                   > 
                  {item.key} 
                 </MioComponente>
                ))}


            </PaginaScroll>
          
        </View>
    </View>

 */}
    </SafeAreaView>
  )
}

export default Home

const styles = StyleSheet.create({
 
  
})

 {/*          
            {Object.keys(schemaOrganizzato).map((pagina, index) => (
             
              <VisualizzaSchema 
               key={index} 
                  schemaPagina={schemaOrganizzato[pagina]} 
                  containerWidth={containerWidth} 
                  containerHeight={containerHeight} 
                  borderColor='gray'
                  borderWidth={1}
                  />
            
            ))}

*/}