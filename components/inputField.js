import React, { useEffect,useState,useRef } from 'react';
import { Controller, useFormContext } from 'react-hook-form';
import { View, Text, TextInput, FlatList, TouchableOpacity, StyleSheet, Platform ,Keyboard,ScrollView} from 'react-native';
import useSelector from '../schemi/useSelector'; // Assicurati di avere il percorso corretto
import comuni from '../assets/dati/comuni.json'; // Importa i dati locali
import provincie from '../assets/dati/provincie.json';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

const InputField = ({ control, name, field, errors, stileInput}) => {


  const { label, type, obbligatorio, layout = {} } = field; // Default to an empty object if layout is undefined
  const { setValue } = useFormContext();
 
const layoutCorrente = layout

const tipoElenco = layoutCorrente?.tipoElenco || ''; // Ottieni il tipoElenco dallo schema se esiste
const tipoInput = layoutCorrente?.tipoInput || ''; // Ottieni il tipoInput dallo schema se esiste
const campo = layoutCorrente?.campo || 'nome'; // Ottieni il campo dallo schema se esiste

const placeholder = obbligatorio ? `${label} (*)` : label;

const [query, setQuery] = useState('');
const [oggettiFiltrati, setOggettiFiltrati] = useState([]);
const [oggettoSelezionato, setOggettoSelezionato] = useState('');
const [deveCaricare, setDeveCaricare] = useState(false);
const [inputLayout, setInputLayout] = useState(null);
const [keyboardHeight, setKeyboardHeight] = useState(0);

  const inputRef = useRef(null);

//const oggettoSelezione=provincie;
/*
useEffect(() => {
console.log('OGGETTO SELEZIONe',oggettoSelezione,layoutCorrente.tipoElenco)
},[oggettoSelezione])
*/
/*
useEffect(() => {
  if (oggettoSelezionato) {
    setQuery(oggettoSelezionato[campoSelezione]);
  }
  console.log('OGGETTO SELEZIONATO',oggettoSelezionato[campoSelezione],campoSelezione)
}, [oggettoSelezionato]);
  */
/*
const filterComuni = (text) => {
  setQuery(text);
  if (text) {
    const filtered = oggettoSelezione.filter((oggetto) =>
      oggetto[campoSelezione].toLowerCase().startsWith(text.toLowerCase())
    );
    setOggettoFiltrato(filtered);
  } else {
    setOggettoFiltrato([]);
    setOggettoSelezionato('');
  }
};
*/

/************** funzioni dati campi flat list ****************************** */
const updateInputLayout = () => {
  if (inputRef.current) {
    inputRef.current.measure((x, y, width, height, pageX, pageY) => {
      setInputLayout({ x: pageX, y: pageY, width, height });
    });
  }
};

useEffect(() => {
 

  const keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', (e) => {
    setKeyboardHeight(e.endCoordinates.height);
    updateInputLayout();
  });
  const keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', () => {
    setKeyboardHeight(0);
    updateInputLayout();
  });

  return () => {
    keyboardDidHideListener.remove();
    keyboardDidShowListener.remove();
  };
}, []);


const ottieniDatiElenco = (tipoElenco) => {
  switch (tipoElenco) {
    case 'comuni':
      return comuni;
    case 'provincie':
      return provincie;
    default:
      return [];
  }
};



const oggettoSelezione = ottieniDatiElenco(tipoElenco);

const caricaOggetti = () => {
  setOggettiFiltrati(oggettoSelezione);
};


useEffect(() => {
  if (deveCaricare) {
    caricaOggetti();
  }
}, [deveCaricare]);


const filtraOggetti = (testo) => {
  setQuery(testo);
  if (testo) {
    const filtrati = oggettoSelezione.filter((oggetto) =>
      oggetto[campo].toLowerCase().startsWith(testo.toLowerCase())
    );
    setOggettiFiltrati(filtrati);
  } else {
    setOggettiFiltrati([]);
    setOggettoSelezionato('');
  }
};

const gestisciSelezioneOggetto = (oggetto) => {
  setOggettoSelezionato(oggetto);
  setValue(name, oggetto[campo]);
  setQuery(oggetto[campo]);
  setOggettiFiltrati([]);
  Keyboard.dismiss(); // Chiudi la tastiera
};

/*************************************************************************** */

  useEffect(() => {
    if (!layoutCorrente?.visibile) {
      // Imposta il valore del campo non visibile
      setValue(name, field.defaultValue || '');
    }
  }, [layoutCorrente?.visibile, name, setValue, field.defaultValue]);


  if (!layoutCorrente?.visibile) {
  //  console.log('sono in input non visibile',field.label)
    return null; // Non renderizzare il campo se non è visibile
  }

  useEffect(() => {
    if (tipoInput === 'drop') {

     
      
        console.log('DROPDOWN LayoutCorrente', name, '     ', tipoElenco,tipoInput);
   
    } else {
      console.log('ALTRO LayoutCorrente',tipoInput, tipoElenco);
    }
  }, [tipoInput]);



  return (
    <ScrollView
    style={[styles.fieldContainer, { width: layoutCorrente.width, marginRight: layoutCorrente.margineDx }]}
    contentContainerStyle={{ flexGrow: 1 }}
    keyboardShouldPersistTaps="handled"
  >
    


    {/*console.log('layout',label, layoutCorrente)*/}
      <Text style={{ fontFamily: 'Roboto-Regular', fontSize: 14 }}>{label}</Text>
 

      {!tipoInput ? (

     //  { console.log('CAMPO NORMALE LayoutCorrente',name,'     ',layoutCorrente)}


      
      <Controller
          control={control}
          name={name}
          rules={{ required: obbligatorio }}
          render={({ field: { onChange, onBlur, value } }) => (
              <TextInput  style={[ styles.input, stileInput,{color: 'blue'}, Platform.OS !== 'web' && { textAlignVertical: 'center', paddingBottom: 3 }]}
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value={value}             
                  keyboardType={type === 'email' ? 'email-address' : 'default'}
              />
          )}
          defaultValue=""
         />


      ) : tipoInput === 'drop' ? (
       <> 
        <Controller
          control={control}
          name={name}
          rules={{ required: obbligatorio }}
          render={({ field: { onChange, onBlur, value } }) => (
              <TextInput 
                  ref={inputRef} 
                  style={[ styles.input, stileInput,{color: 'blue'}, Platform.OS !== 'web' && { textAlignVertical: 'center', paddingBottom: 3 }]}
                  onBlur={onBlur}
                  onFocus={() => {
                  setDeveCaricare(true); // Carica i dati quando l'input riceve il focus
                  updateInputLayout();
                }}
                  onChangeText={(text) => filtraOggetti(text)}
                  value={query                              }             
                  keyboardType={type === 'email' ? 'email-address' : 'default'}
              />
          )}
          defaultValue=""
         />
         {oggettiFiltrati && oggettiFiltrati.length > 0 && (
          <View style={[styles.dropdownContainer, { top: inputLayout.y + inputLayout.height - keyboardHeight /2 }]}>
            <FlatList
                data={oggettiFiltrati}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item }) => (
                      <TouchableOpacity  
                          onPress={() => gestisciSelezioneOggetto(item)} 
                          style={styles.itemContainer} >
                          <Text style={styles.item}>{item[campo]}</Text>
                      </TouchableOpacity>
                )}
                style={styles.dropdownList} // Applica lo stile
                nestedScrollEnabled={true} // Abilita lo scroll nidificato
            />
        </View>
        )}
     </>
      ): (
      null
      )}
    
     { errors[name] && <Text style={styles.error}>{errors[name].message}</Text>}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  fieldContainer: {
    marginBottom: 15,
   
  
  },
  label: {
    fontSize: 16,
    marginBottom: 5,
  },
  input: {
    borderColor: 'gray',
    borderWidth: 1,
    width: '100%',
    height: 40,
    fontSize: 16,
    paddingHorizontal: 10,
  },
  error: {
    color: 'red',
    marginTop: 5,
  },
  dropdownContainer: {
    position: 'absolute',
    left: 0,
    right: 0,
    zIndex: 1,
    backgroundColor: 'white',
    borderColor: 'green',
    borderWidth: 1,
    maxHeight: 200,
  },
  dropdownList: {
    backgroundColor: 'white',
    borderRadius: 4,
  },
  itemContainer: {
    padding: 10,
    borderBottomColor: 'gray',
    borderBottomWidth: 1,
  },
  item: {
    fontSize: 16,
  },
 
});

export default InputField;




/*

  <Controller
              control={control}
              name={name}
              rules={{ required: obbligatorio }}
              render={({ field: { onChange, onBlur, value } }) => (
                
                <TextInput
                style={[
                  styles.input, 
                  stileInput, 
                  { borderColor: 'red', color: 'blue' }, 
                  Platform.OS !== 'web' && { textAlignVertical: 'center', paddingBottom: 3 }
                ]}
                onBlur={onBlur}
                onChangeText={(text) =>  filterItems(text)}      
                value={value}             
            />
            
        )}
        defaultValue=""
      />


*/

/*
 // Gestione per altri tipi di input se necessario
        <Controller
          control={control}
          name={name}
          rules={{ required: obbligatorio }}
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              style={[
                styles.input, 
                stileInput,
                { color: 'blue' }, 
                Platform.OS !== 'web' && { textAlignVertical: 'center', paddingBottom: 3 }
              ]}
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
              placeholder={placeholder}
              keyboardType={type === 'email' ? 'email-address' : 'default'}
            />
          )}
          defaultValue=""
        />
*/


/*
      
        <Modal
        
            visible={modalVisible}
            transparent={true}
            animationType="slide"
            onRequestClose={() => setModalVisible(false)}
        >
         <TouchableOpacity style={styles.modalOverlay} onPress={() => setModalVisible(false)}>
            <View style={styles.modalContainer}>
           // {console.log('sono in modal',filteredItems)}
              {filteredItems && filteredItems.length > 0 && (
                  <FlatList
                        data={filteredItems}
                        keyExtractor={(item) => item.id.toString()}
                        renderItem={({ item }) => (
                            <TouchableOpacity 
                                  onPress={() => {handleSelectItem(item)}}
                                  style={styles.itemContainer}
                            >
                                <Text style={styles.item}>{item.nome}</Text>
                            </TouchableOpacity>
                        )}
                        style={styles.dropdownList} // Applica lo stile
                        nestedScrollEnabled={true} // Abilita lo scroll nidificato
                  />
              )}
            </View>
            </TouchableOpacity>
        </Modal>

*/