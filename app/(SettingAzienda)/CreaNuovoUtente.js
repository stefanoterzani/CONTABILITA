import React, { useState,useContext, useEffect } from 'react';
import { View, TextInput, Button, StyleSheet, Text } from 'react-native';
import { useAuth,AuthContext } from '../../Context/AuthContext';



export default function CreaNuovoUtente() {
  const [email, setEmail] = useState('');
  const [nome,setNome]=useState('')
  const [telefono, setTelefono] = useState('');
  const [idAzienda, setIdAzienda] = useState('');
  const [nomeAzienda, setNomeAzienda] = useState('');
  const [qualifica, setQualifica] = useState('');
  const { creaUtenteTemporaneo } = useAuth();
  const { azienda} = useContext(AuthContext);

  useEffect(()=>{
    setIdAzienda(azienda.IdAzienda)
   
  },[])


  const handleCreateProvisionalUser = () => {
    creaUtenteTemporaneo(email, telefono, idAzienda, qualifica);
  };

  return (
    <View style={styles.container}>
      <TextInput
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        style={styles.input}
      />
      

      <TextInput
        placeholder="Telefono"
        value={telefono}
        onChangeText={setTelefono}
        style={styles.input}
      />
      <TextInput
        placeholder="ID Azienda"
        value={idAzienda}
        onChangeText={setIdAzienda}
        style={styles.input}
      />
      <TextInput
        placeholder="Qualifica"
        value={qualifica}
        onChangeText={setQualifica}
        style={styles.input}
      />
      <Button title="Crea Utente Provvisorio" onPress={handleCreateProvisionalUser} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    justifyContent: 'center',
  },
  input: {
    borderWidth: 1,
    padding: 8,
    marginVertical: 8,
  },
});
