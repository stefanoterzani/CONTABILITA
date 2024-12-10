import React, { useEffect,useState } from 'react';
import { Controller, useFormContext } from 'react-hook-form';
import { View, Text, TextInput, FlatList, TouchableOpacity, StyleSheet, Platform ,Modal} from 'react-native';
import useSelector from '../schemi/useSelector'; // Assicurati di avere il percorso corretto

const InputField = ({ control, name, field, errors, stileInput}) => {
  const { label, type, obbligatorio, layout = {} } = field; // Default to an empty object if layout is undefined
  const { setValue } = useFormContext();
 
// Determina se il layout è per web o mobile
const layoutCorrente = layout
  console.log('Layout',layout)
const tipoElenco = layoutCorrente?.tipoElenco || ''; // Ottieni il tipoElenco dallo schema se esiste
const tipoInput = layoutCorrente?.tipoInput || ''; // Ottieni il tipoInput dallo schema se esiste
const [modalVisible, setModalVisible] = useState(false);
const [localQuery, setLocalQuery] = useState('');
const placeholder = obbligatorio ? `${label} (*)` : label;

//console.log('sono in input')
// Usa useSelector solo se tipoInput è 'drop' e tipoElenco è definito
const { query, 
    filteredItems= [], 
    handleSelectItem= () => {},
    filterItems = () => {},
  } = (tipoInput === 'drop' && layoutCorrente?.tipoElenco) ? useSelector(layoutCorrente.tipoElenco, localQuery) : {};
  
  useEffect(() => {
    if (!layoutCorrente?.visibile) {
      // Imposta il valore del campo non visibile
      setValue(name, field.defaultValue || '');
    }
  }, [layoutCorrente?.visibile, name, setValue, field.defaultValue]);

  if (!layoutCorrente?.visibile) {
    console.log('sono in input non visibile',field.label)
    return null; // Non renderizzare il campo se non è visibile
  }





  return (
    <View style={[styles.fieldContainer, { width: layoutCorrente.width, marginRight: layoutCorrente.margineDx }]}>
    {console.log('layout',label, layoutCorrente)}
      <Text style={{ fontFamily: 'Roboto-Regular', fontSize: 14 }}>{label}</Text>
 

      {!tipoInput ? (
        <Controller
          control={control}
          name={name}
          rules={{ required: obbligatorio }}
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              style={[
                styles.input, 
                stileInput,
                {color: 'blue'}, 
                Platform.OS !== 'web' && { textAlignVertical: 'center', paddingBottom: 3 }]}
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
                      style={[
                        styles.input, 
                        stileInput, 
                        { borderColor: 'red', color: 'blue' }, 
                        Platform.OS !== 'web' && { textAlignVertical: 'center', paddingBottom: 3 }
                      ]}
                       onBlur={() => {
                        onBlur();
                        // Delay la chiusura del Modal per consentire la selezione
                        setTimeout(() => setModalVisible(false), 100);
                        }}
                      onFocus={() => {
                        if (filteredItems.length > 0) {
                            setModalVisible(true);
                        }
                      }}
                      onChangeText={(text) => {
                        setLocalQuery(text);
                          onChange(text);
                          filterItems(text);
                      }}
                     
                      value={value}             
                     autoCorrect={false}
                  />
              )}
              defaultValue=""
            />
       
             {console.log('MODAL',modalVisible)}
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
              
        </>
      ): (
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
      )}
      {errors[name] && <Text style={styles.error}>{errors[name].message}</Text>}
    </View>
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
  item: {
    padding: 10,
    borderBottomColor: 'gray',
    borderBottomWidth: 1,
  },
  dropdownList: {
    maxHeight: 200,
    backgroundColor: 'white',
    borderRadius: 5,
    marginTop: 5,
  },
 modalContainer: {
    backgroundColor: 'white',
    borderRadius: 5,
    maxHeight: 300,
    width: '100%',
    alignSelf: 'center',
    padding: 10,
  },
  itemContainer: {
    padding: 0,
  
  },
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'rgba(0,0,0,0.3)', // Sfondo semi-trasparente
  },
});

export default InputField;