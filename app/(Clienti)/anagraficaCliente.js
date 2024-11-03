import React, { useState, useEffect, useContext } from 'react';
import {Alert,Modal, SafeAreaView,View, Text, TextInput, Button, ScrollView, StyleSheet, ActivityIndicator, TouchableOpacity } from 'react-native';
import { doc, setDoc, getDoc, collection, addDoc,Timestamp } from 'firebase/firestore';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { db } from '../../firebaseConfig';
import { AuthContext } from '../../Context/AuthContext';

const Anagrafica= ({ route }) => {
 // const { clienteId } = route.params;
 const router = useRouter();
  const { datiAzienda } = useContext(AuthContext);
  const aziendaId = datiAzienda.id;
  const {clienteId}=useLocalSearchParams('clienteId')
  const [clienteData, setClienteData] = useState({
    partitaIva: '',
    ragioneSociale: '',
    email: '',
    pec: '',
    sedeLegale: {
      indirizzo: '',
      citta: '',
      provincia: '',
      cap: '',
      nazione: '',
      telefono: ''
    },
    sediAmministrative: [],
    logistiche: [],
    riferimenti: [],
    dataCreazione:null,
    dataAggiornamento:null
  });
  const [originalData, setOriginalData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [modalVisible, setModalVisible] = useState(false);
  const [clienteEsterno, setClienteEsterno] = useState(null);
  console.log('ANAGRAFICA=',clienteId)

  useEffect(() => {
    const fetchClienteData = async () => {
      console.log('FECTH=',clienteId)
      if (clienteId) {
        const clienteRef = doc(db, 'aziende', aziendaId, 'Clienti', clienteId);
        const clienteSnap = await getDoc(clienteRef);
        console.log('SNAP DATA=',clienteSnap.data())
        if (clienteSnap.exists()) {
          const data=clienteSnap.data()
          setClienteData(data);
          setOriginalData(data);
                   
        } else {      
          console.log('Cliente non trovato');
        }
      }
      setIsLoading(false);
    };

    fetchClienteData();
  }, [clienteId, aziendaId]);


  
 
  const handleSave = async () => {
    try {
    
      let clienteRef;
      if (clienteId) {
        clienteRef = doc(db, 'aziende', aziendaId, 'Clienti', clienteId);
      } else {
        clienteData.dataCreazione = Timestamp.now();
        clienteRef = await addDoc(collection(db, 'aziende', aziendaId, 'Clienti'), clienteData);
      }

       
        // Confronta i dati originali con i dati modificati
      if (JSON.stringify(clienteData) !== JSON.stringify(originalData)) {
        clienteData.dataAggiornamento = Timestamp.now();
      }
     //console.log('CLIENTE ID=',clienteId)
     
      await setDoc(clienteRef, clienteData, { merge: true });
 // Aggiorna l'archivio indicePartiteIva
 
 const indiceRef = doc(db, 'indicePartiteIva', clienteData.partitaIva);
 await setDoc(indiceRef, {
   partitaIva: clienteData.partitaIva,
   idAzienda: aziendaId,
   id: clienteId ? clienteId : clienteRef.id,
   archivio: 'Clienti',
   dataAggiornamento: clienteData.dataAggiornamento
 }, { merge: true });

      clienteId ? router.back() :
                  router.replace('menuClienti');

    
    } catch (error) {
      console.error("Errore durante il salvataggio del cliente: ", error);
    }
  };

  const handlePartitaIvaChange = async (text) => {
    setClienteData({ ...clienteData, partitaIva: text });
    console.log('PARTITA IVA=',text)
    if (text.length > 0) {
      const indiceRef = doc(db, 'indicePartiteIva', text);
      const indiceSnap = await getDoc(indiceRef);
      console.log('INDICE SNAP=',indiceSnap.data())
      if (indiceSnap.exists()) {
        const indiceData = indiceSnap.data();
        console.log('INDICE DATA=',indiceData.idAzienda, aziendaId)
        if (indiceData.idAzienda === aziendaId) {
          
          Alert.alert('Partita IVA già presente', 'La partita IVA è già presente nell\'archivio della tua azienda.');
        } else {
          const IdEsternoRef = doc(db, 'aziende', indiceData.idAzienda, indiceData.archivio, indiceData.id);
          const IdEsternoSnap = await getDoc(IdEsternoRef);
          if (IdEsternoSnap.exists()) {
            setClienteEsterno(IdEsternoSnap.data());
            setModalVisible(true);
          }
        }
      }
    }
  };

  const handleTravasoDati = () => {
    setClienteData(clienteEsterno);
    setModalVisible(false);
  };

  const addSedeAmministrativa = () => {
    setClienteData({
      ...clienteData,
      sediAmministrative: [...clienteData.sediAmministrative, { indirizzo: '', citta: '', provincia: '', cap: '', nazione: '', telefono: '' }]
    });
  };

  const addLogistica = () => {
    setClienteData({
      ...clienteData,
      logistiche: [...clienteData.logistiche, { nome: '', indirizzo: '', citta: '', provincia: '', cap: '', nazione: '', telefono: '' }]
    });
  };

  const addRiferimento = () => {
    setClienteData({
      ...clienteData,
      riferimenti: [...clienteData.riferimenti, { nome: '', ufficio: '', email: '', telefono: '' }]
    });
  };

  if (isLoading) {
   return <ActivityIndicator size="large" color="#0000ff" style={{ flex: 1, justifyContent: 'center' }} />;
  }


  if (!clienteData) {
    return (
      <SafeAreaView style={styles.container}>
        <Text>Cliente non trovato</Text>
      </SafeAreaView>
    );
  }
  return (
    <SafeAreaView style={styles.container}>
    <ScrollView contentContainerStyle={styles.scrollContainer}>
        {clienteId ? <Text style={styles.title}>Modifica Cliente</Text> : <Text style={styles.title}>Inserisci Cliente</Text>}
    
      <TextInput
        style={styles.input}
        placeholder="Partita IVA"
        value={clienteData.partitaIva}
        onChangeText={handlePartitaIvaChange}
      />
      <TextInput
        style={styles.input}
        placeholder="Ragione Sociale"
        value={clienteData.ragioneSociale}
        onChangeText={(text) => setClienteData({ ...clienteData, ragioneSociale: text })}
      />
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={clienteData.email}
        onChangeText={(text) => setClienteData({ ...clienteData, email: text })}
      />
      <TextInput
        style={styles.input}
        placeholder="PEC"
        value={clienteData.pec}
        onChangeText={(text) => setClienteData({ ...clienteData, pec: text })}
      />
      <Text style={styles.subtitle}>Sede Legale</Text>
      <TextInput
        style={styles.input}
        placeholder="Indirizzo"
        value={clienteData.sedeLegale.indirizzo}
        onChangeText={(text) => setClienteData({ ...clienteData, sedeLegale: { ...clienteData.sedeLegale, indirizzo: text } })}
      />
      <TextInput
        style={styles.input}
        placeholder="Città"
        value={clienteData.sedeLegale.citta}
        onChangeText={(text) => setClienteData({ ...clienteData, sedeLegale: { ...clienteData.sedeLegale, citta: text } })}
      />
      <TextInput
        style={styles.input}
        placeholder="Provincia"
        value={clienteData.sedeLegale.provincia}
        onChangeText={(text) => setClienteData({ ...clienteData, sedeLegale: { ...clienteData.sedeLegale, provincia: text } })}
      />
      <TextInput
        style={styles.input}
        placeholder="CAP"
        value={clienteData.sedeLegale.cap}
        onChangeText={(text) => setClienteData({ ...clienteData, sedeLegale: { ...clienteData.sedeLegale, cap: text } })}
      />
      <TextInput
        style={styles.input}
        placeholder="Nazione"
        value={clienteData.sedeLegale.nazione}
        onChangeText={(text) => setClienteData({ ...clienteData, sedeLegale: { ...clienteData.sedeLegale, nazione: text } })}
      />
      <TextInput
        style={styles.input}
        placeholder="Telefono"
        value={clienteData.sedeLegale.telefono}
        onChangeText={(text) => setClienteData({ ...clienteData, sedeLegale: { ...clienteData.sedeLegale, telefono: text } })}
      />
      <Button title="Aggiungi Sede Amministrativa" onPress={addSedeAmministrativa} />
      {clienteData.sediAmministrative.map((sede, index) => (
        <View key={index}>
          <Text style={styles.subtitle}>Sede Amministrativa {index + 1}</Text>
          <TextInput
            style={styles.input}
            placeholder="Indirizzo"
            value={sede.indirizzo}
            onChangeText={(text) => {
              const newSediAmministrative = [...clienteData.sediAmministrative];
              newSediAmministrative[index].indirizzo = text;
              setClienteData({ ...clienteData, sediAmministrative: newSediAmministrative });
            }}
          />
          <TextInput
            style={styles.input}
            placeholder="Città"
            value={sede.citta}
            onChangeText={(text) => {
              const newSediAmministrative = [...clienteData.sediAmministrative];
              newSediAmministrative[index].citta = text;
              setClienteData({ ...clienteData, sediAmministrative: newSediAmministrative });
            }}
          />
          <TextInput
            style={styles.input}
            placeholder="Provincia"
            value={sede.provincia}
            onChangeText={(text) => {
              const newSediAmministrative = [...clienteData.sediAmministrative];
              newSediAmministrative[index].provincia = text;
              setClienteData({ ...clienteData, sediAmministrative: newSediAmministrative });
            }}
          />
          <TextInput
            style={styles.input}
            placeholder="CAP"
            value={sede.cap}
            onChangeText={(text) => {
              const newSediAmministrative = [...clienteData.sediAmministrative];
              newSediAmministrative[index].cap = text;
              setClienteData({ ...clienteData, sediAmministrative: newSediAmministrative });
            }}
          />
          <TextInput
            style={styles.input}
            placeholder="Nazione"
            value={sede.nazione}
            onChangeText={(text) => {
              const newSediAmministrative = [...clienteData.sediAmministrative];
              newSediAmministrative[index].nazione = text;
              setClienteData({ ...clienteData, sediAmministrative: newSediAmministrative });
            }}
          />
          <TextInput
            style={styles.input}
            placeholder="Telefono"
            value={sede.telefono}
            onChangeText={(text) => {
              const newSediAmministrative = [...clienteData.sediAmministrative];
              newSediAmministrative[index].telefono = text;
              setClienteData({ ...clienteData, sediAmministrative: newSediAmministrative });
            }}
          />
        </View>
      ))}
      <Button title="Aggiungi Logistica" onPress={addLogistica} />
      {clienteData.logistiche.map((logistica, index) => (
        <View key={index}>
          <Text style={styles.subtitle}>Logistica {index + 1}</Text>
          <TextInput
            style={styles.input}
            placeholder="Nome"
            value={logistica.nome}
            onChangeText={(text) => {
              const newLogistiche = [...clienteData.logistiche];
              newLogistiche[index].nome = text;
              setClienteData({ ...clienteData, logistiche: newLogistiche });
            }}
          />
          <TextInput
            style={styles.input}
            placeholder="Indirizzo"
            value={logistica.indirizzo}
            onChangeText={(text) => {
              const newLogistiche = [...clienteData.logistiche];
              newLogistiche[index].indirizzo = text;
              setClienteData({ ...clienteData, logistiche: newLogistiche });
            }}
          />
          <TextInput
            style={styles.input}
            placeholder="Città"
            value={logistica.citta}
            onChangeText={(text) => {
              const newLogistiche = [...clienteData.logistiche];
              newLogistiche[index].citta = text;
              setClienteData({ ...clienteData, logistiche: newLogistiche });
            }}
          />
          <TextInput
            style={styles.input}
            placeholder="Provincia"
            value={logistica.provincia}
            onChangeText={(text) => {
              const newLogistiche = [...clienteData.logistiche];
              newLogistiche[index].provincia = text;
              setClienteData({ ...clienteData, logistiche: newLogistiche });
            }}
          />
          <TextInput
            style={styles.input}
            placeholder="CAP"
            value={logistica.cap}
            onChangeText={(text) => {
              const newLogistiche = [...clienteData.logistiche];
              newLogistiche[index].cap = text;
              setClienteData({ ...clienteData, logistiche: newLogistiche });
            }}
          />
          <TextInput
            style={styles.input}
            placeholder="Nazione"
            value={logistica.nazione}
            onChangeText={(text) => {
              const newLogistiche = [...clienteData.logistiche];
              newLogistiche[index].nazione = text;
              setClienteData({ ...clienteData, logistiche: newLogistiche });
            }}
          />
          <TextInput
            style={styles.input}
            placeholder="Telefono"
            value={logistica.telefono}
            onChangeText={(text) => {
              const newLogistiche = [...clienteData.logistiche];
              newLogistiche[index].telefono = text;
              setClienteData({ ...clienteData, logistiche: newLogistiche });
            }}
          />
        </View>
      ))}
      <Button title="Aggiungi Riferimento" onPress={addRiferimento} />
      {clienteData.riferimenti.map((riferimento, index) => (
        <View key={index}>
          <Text style={styles.subtitle}>Riferimento {index + 1}</Text>
          <TextInput
            style={styles.input}
            placeholder="Nome"
            value={riferimento.nome}
            onChangeText={(text) => {
              const newRiferimenti = [...clienteData.riferimenti];
              newRiferimenti[index].nome = text;
              setClienteData({ ...clienteData, riferimenti: newRiferimenti });
            }}
          />
          <TextInput
            style={styles.input}
            placeholder="Ufficio"
            value={riferimento.ufficio}
            onChangeText={(text) => {
              const newRiferimenti = [...clienteData.riferimenti];
              newRiferimenti[index].ufficio = text;
              setClienteData({ ...clienteData, riferimenti: newRiferimenti });
            }}
          />
          <TextInput
            style={styles.input}
            placeholder="Email"
            value={riferimento.email}
            onChangeText={(text) => {
              const newRiferimenti = [...clienteData.riferimenti];
              newRiferimenti[index].email = text;
              setClienteData({ ...clienteData, riferimenti: newRiferimenti });
            }}
          />
          <TextInput
            style={styles.input}
            placeholder="Telefono"
            value={riferimento.telefono}
            onChangeText={(text) => {
              const newRiferimenti = [...clienteData.riferimenti];
              newRiferimenti[index].telefono = text;
              setClienteData({ ...clienteData, riferimenti: newRiferimenti });
            }}
          />
        </View>
      ))}
      <Button title="Salva" onPress={handleSave} />
    </ScrollView>

    <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}
      >
<View style={styles.modalView}>
          <Text style={styles.modalText}>La partita IVA esiste già in un'altra azienda. Vuoi travasare i dati nel tuo archivio?</Text>
          {clienteEsterno && (
            <View>
              <Text>Ragione Sociale: {clienteEsterno.ragioneSociale}</Text>
              <Text>Partita IVA: {clienteEsterno.partitaIva}</Text>
              <Text>Email: {clienteEsterno.email}</Text>
              <Text>PEC: {clienteEsterno.pec}</Text>
              <Text>Sede Legale:</Text>
              <Text>Indirizzo: {clienteEsterno.sedeLegale.indirizzo}</Text>
              <Text>Città: {clienteEsterno.sedeLegale.citta}</Text>
              <Text>Provincia: {clienteEsterno.sedeLegale.provincia}</Text>
              <Text>CAP: {clienteEsterno.sedeLegale.cap}</Text>
              <Text>Nazione: {clienteEsterno.sedeLegale.nazione}</Text>
              <Text>Telefono: {clienteEsterno.sedeLegale.telefono}</Text>
              <Text>Data Creazione: {clienteEsterno.dataCreazione ? clienteEsterno.dataCreazione.toDate().toLocaleString() : 'N/A'}</Text>
              <Text>Data Aggiornamento: {clienteEsterno.dataAggiornamento ? clienteEsterno.dataAggiornamento.toDate().toLocaleString() : 'N/A'}</Text>
            </View>
          )}
          <TouchableOpacity
            style={[styles.button, styles.buttonClose]}
            onPress={handleTravasoDati}
          >
            <Text style={styles.textStyle}>Travaso Dati</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.button, styles.buttonClose]}
            onPress={() => setModalVisible(!modalVisible)}
          >
            <Text style={styles.textStyle}>Annulla</Text>
          </TouchableOpacity>
        </View>
      </Modal>


    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  scrollContainer: {
    paddingBottom: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  subtitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 16,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 12,
    paddingHorizontal: 8,
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalContent: {
    alignItems: 'flex-start',
    marginBottom: 15,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonClose: {
    backgroundColor: '#2196F3',
    marginTop: 10,
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
});

export default Anagrafica;

