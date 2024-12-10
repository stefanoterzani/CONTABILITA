import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, FlatList, TouchableOpacity, Pressable } from 'react-native';
import comuni from '../../assets/dati/comuni.json'
import provincie from '../../assets/dati/provincie.json'
import MapView, { Marker } from 'react-native-maps';
import Entypo from '@expo/vector-icons/Entypo';


export default function ComuneAutocomplete() {

  const [query, setQuery] = useState('');
  const [filteredComuni, setFilteredComuni] = useState([]);
  const [isFocused,setIsFocused]=useState(false)
  const [provincia, setProvincia]=useState('')
  const [selectedComune, setSelectedComune]=useState([])
  const [MappaVisible, setMappaVisibile]=useState(false)
  const [mapRegion,setMapRegion]=useState({
  latitude:0,
  longitude:0,
  latitudeDelta:0.079,
  longitudeDelta:0.01,
})

  // Funzione per filtrare i comuni in base al testo digitato
  
  
  const filterComuni = (text) => {
    setQuery(text);
    if (text) {
      const filtered = comuni.filter((comune) =>
        comune.nome.toLowerCase().startsWith(text.toLowerCase())
      );
      setFilteredComuni(filtered);
    } else {
      setFilteredComuni([]);
      setSelectedComune('')
    }
  };

  // Funzione per gestire la selezione di un comune
  const handleSelectComune = (comune) => {
    console.log(comune)
    let prov= trovaProvincia(comune.id_provincia)
    setProvincia(prov)
   
    setSelectedComune(comune)
    setQuery(comune.nome + ' (' +  prov + ')');
          console.log(comune.nome,prov,comune.latitudine,comune.longitudine)
    setFilteredComuni([]); // Nasconde l'elenco quando un comune viene selezionato
    setMapRegion({
      latitude:comune.latitudine,
      longitude:comune.longitudine,
      latitudeDelta:0.079,
      longitudeDelta:0.01,
  })
    setMappaVisibile(true)
  };
    const trovaProvincia=(pr)=> {
  
  const pp = provincie.find((prov)=> prov.id === pr)
  return pp.nome
}

const annullaRicerca = ()=> {
console.log('annulla ricerca')
setMappaVisibile(false)
setSelectedComune([])
setQuery('')
}
  return (

    <>
    <View style={styles.container}>


      <Text style={styles.label}>Cerca il tuo Comune:</Text>

      <View style={{flexDirection:'row'}}>    
          <TextInput
            style={isFocused ? styles.inputFocused :  styles.input }
            placeholder="Inserisci il nome del comune"
            value={query}
            onChangeText={(text) => filterComuni(text)}
            onFocus={()=> { setIsFocused(true),setMappaVisibile(false) }}
            onBlur={()=> setIsFocused(false)}
            
          />
          <TouchableOpacity 
            style={{position:'absolute',marginLeft:'88%',marginTop:'2%'}} 
            onPress={() => annullaRicerca()}>
              <Entypo name="circle-with-cross" size={35} color="blue" />
          </TouchableOpacity>
      </View>


      {/* Visualizza i risultati solo se ci sono risultati da mostrare */}
      {filteredComuni.length > 0 && (
        <FlatList
          data={filteredComuni}
          keyExtractor={(item) => item.nome}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={styles.item}
              onPress={() => handleSelectComune(item)}              
            >
                <Text style={{color:'white', fontSize:15}}>{item.nome}  ({trovaProvincia(item.id_provincia) })</Text>
            </TouchableOpacity>
          )}
          style={styles.autocompleteContainer}
        />
      )}
          
      {MappaVisible &&
         <View style={styles.mapContainer}>
            <MapView
                region={mapRegion}
                style={styles.Wmap} >
                <Marker coordinate={mapRegion} title='Marker'/>
            </MapView>
        </View>
  }

    </View>


  
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    marginTop:20,
    width:'100%',
    height:'10%',
    backgroundColor:'rgba(12, 58, 143, 0.78)'
  },
  label: {
    fontSize: 14,
    marginBottom: 8,
    color:'white',
    fontFamily:'Poppins-Light'
  },
  input: {
    backgroundColor:'white',
    borderWidth:1,
    borderColor:'lightgray',
    height:50,
    borderRadius:25,
    paddingLeft:15,
    shadowColor:'#000',
    shadowOffset:{width:0, height:2},
    shadowOpacity:0.1,
    shadowRadius:3,
    elevation:2,
    width:'100%',
    width:'100%',
    fontFamily:'Poppins-Black',
    fontSize:16
  },
    inputFocused:{
        backgroundColor:'white',
        borderWidth:3,
        borderColor:'rgba(255, 148, 0, 0.91)',
        height:50,
        borderRadius:25,
        paddingLeft:15,
        shadowColor:'#000',
        shadowOffset:{width:0, height:2},
        shadowOpacity:0.1,
        shadowRadius:3,
        elevation:2,
        width:'100%',
        fontFamily:'Poppins-Black'
    },
  autocompleteContainer: {
    marginTop: 10,
    maxHeight: 300, // Limita l'altezza massima dei risultati
   
   
  },
  item: {
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
    
  },

  mapContainer:{
    marginTop:10,
    alignItems:'center',
    borderColor:'rgba(255, 148, 0, 0.91)',
    borderWidth:2,
   borderRadius:10,
    height:'50%',
    width:'100%',
    overflow:'hidden'
  },
  Wmap: {
    width: '100%',
    height: '100%',
   
  },
});

/*npm install react-native-paper
  npx expo install react-native-maps 
  npm install react-native-vector-icons


*/