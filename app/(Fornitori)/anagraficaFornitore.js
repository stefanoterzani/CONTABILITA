import React, { useState, useEffect, useContext } from 'react';
import {Alert,Modal, SafeAreaView,View, Text, TextInput, Button, ScrollView, StyleSheet, ActivityIndicator, TouchableOpacity } from 'react-native';
import { doc, setDoc, getDoc, collection, addDoc,Timestamp } from 'firebase/firestore';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { db } from '../../firebaseConfig';
import { AuthContext } from '../../Context/AuthContext';

const Anagrafica= ({ route }) => {
 // const { fornitoreId } = route.params;
 const router = useRouter();
  const { datiAzienda } = useContext(AuthContext);
  const aziendaId = datiAzienda.id;
  const {fornitoreId}=useLocalSearchParams('fornitoreId')
  const [fornitoreData, setFornitoreData] = useState({
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
  const [fornitoreEsterno, setFornitoreEsterno] = useState(null);
  ///console.log('ANAGRAFICA=',fornitoreId)

  useEffect(() => {
    const fetchFornitoreData = async () => {
      console.log('FECTH=',fornitoreId)
      if (fornitoreId) {
        const fornitoreRef = doc(db, 'aziende', aziendaId, 'Fornitori', fornitoreId);
        const fornitoreSnap = await getDoc(fornitoreRef);
        console.log('SNAP DATA=',fornitoreSnap.data())
        if (fornitoreSnap.exists()) {
          const data=fornitoreSnap.data()
          setFornitoreData(data);
          setOriginalData(data);
                   
        } else {      
          console.log('Fornitore non trovato');
        }
      }
      setIsLoading(false);
    };

    fetchFornitoreData();
  }, [fornitoreId, aziendaId]);


  
 
  const handleSave = async () => {
    try {
    
      let fornitoreRef;
      if (fornitoreId) {
        fornitoreRef = doc(db, 'aziende', aziendaId, 'Fornitori', fornitoreId);
      } else {
        fornitoreData.dataCreazione = Timestamp.now();
        fornitoreRef = await addDoc(collection(db, 'aziende', aziendaId, 'Fornitori'), fornitoreData);
      }

       
        // Confronta i dati originali con i dati modificati
      if (JSON.stringify(fornitoreData) !== JSON.stringify(originalData)) {
        fornitoreData.dataAggiornamento = Timestamp.now();
      }
     //console.log('FORNITORE ID=',fornitoreId)
     
      await setDoc(fornitoreRef, fornitoreData, { merge: true });
 // Aggiorna l'archivio indicePartiteIva
 
 const indiceRef = doc(db, 'indicePartiteIva', fornitoreData.partitaIva);
 await setDoc(indiceRef, {
   partitaIva: fornitoreData.partitaIva,
   idAzienda: aziendaId,
   id: fornitoreId ? fornitoreId : fornitoreRef.id,
   archivio: 'Fornitori',
   dataAggiornamento: fornitoreData.dataAggiornamento
 }, { merge: true });

      fornitoreId ? router.back() :
                  router.replace('menuFornitori');

    
    } catch (error) {
      console.error("Errore durante il salvataggio del fornitore: ", error);
    }
  };

  const handlePartitaIvaChange = async (text) => {
    setFornitoreData({ ...fornitoreData, partitaIva: text });
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
          const idEsternoRef = doc(db, 'aziende', indiceData.idAzienda, 'Fornitori', indiceData.id);
          const idEsternoSnap = await getDoc(idEsternoRef);
          if (idEsternoSnap.exists()) {
            setFornitoreEsterno(idEsternoSnap.data());
            setModalVisible(true);
          }
        }
      }
    }
  };

  const handleTravasoDati = () => {
    setFornitoreData(fornitoreEsterno);
    setModalVisible(false);
  };

  const addSedeAmministrativa = () => {
    setFornitoreData({
      ...fornitoreData,
      sediAmministrative: [...fornitoreData.sediAmministrative, { indirizzo: '', citta: '', provincia: '', cap: '', nazione: '', telefono: '' }]
    });
  };

  const addLogistica = () => {
    setFornitoreData({
      ...fornitoreData,
      logistiche: [...fornitoreData.logistiche, { nome: '', indirizzo: '', citta: '', provincia: '', cap: '', nazione: '', telefono: '' }]
    });
  };

  const addRiferimento = () => {
    setFornitoreData({
      ...fornitoreData,
      riferimenti: [...fornitoreData.riferimenti, { nome: '', ufficio: '', email: '', telefono: '' }]
    });
  };

  if (isLoading) {
   return <ActivityIndicator size="large" color="#0000ff" style={{ flex: 1, justifyContent: 'center' }} />;
  }


  if (!fornitoreData) {
    return (
      <SafeAreaView style={styles.container}>
        <Text>Fornitore non trovato</Text>
      </SafeAreaView>
    );
  }
  return (
    <SafeAreaView style={styles.container}>
    <ScrollView contentContainerStyle={styles.scrollContainer}>
        {fornitoreId ? <Text style={styles.title}>Modifica Fornitore</Text> : <Text style={styles.title}>Inserisci Fornitore</Text>}
    
      <TextInput
        style={styles.input}
        placeholder="Partita IVA"
        value={fornitoreData.partitaIva}
        onChangeText={handlePartitaIvaChange}
      />
      <TextInput
        style={styles.input}
        placeholder="Ragione Sociale"
        value={fornitoreData.ragioneSociale}
        onChangeText={(text) => setFornitoreData({ ...fornitoreData, ragioneSociale: text })}
      />
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={fornitoreData.email}
        onChangeText={(text) => setFornitoreData({ ...fornitoreData, email: text })}
      />
      <TextInput
        style={styles.input}
        placeholder="PEC"
        value={fornitoreData.pec}
        onChangeText={(text) => setFornitoreData({ ...fornitoreData, pec: text })}
      />
      <Text style={styles.subtitle}>Sede Legale</Text>
      <TextInput
        style={styles.input}
        placeholder="Indirizzo"
        value={fornitoreData.sedeLegale.indirizzo}
        onChangeText={(text) => setFornitoreData({ ...fornitoreData, sedeLegale: { ...fornitoreData.sedeLegale, indirizzo: text } })}
      />
      <TextInput
        style={styles.input}
        placeholder="Città"
        value={fornitoreData.sedeLegale.citta}
        onChangeText={(text) => setFornitoreData({ ...fornitoreData, sedeLegale: { ...fornitoreData.sedeLegale, citta: text } })}
      />
      <TextInput
        style={styles.input}
        placeholder="Provincia"
        value={fornitoreData.sedeLegale.provincia}
        onChangeText={(text) => setFornitoreData({ ...fornitoreData, sedeLegale: { ...fornitoreData.sedeLegale, provincia: text } })}
      />
      <TextInput
        style={styles.input}
        placeholder="CAP"
        value={fornitoreData.sedeLegale.cap}
        onChangeText={(text) => setFornitoreData({ ...fornitoreData, sedeLegale: { ...fornitoreData.sedeLegale, cap: text } })}
      />
      <TextInput
        style={styles.input}
        placeholder="Nazione"
        value={fornitoreData.sedeLegale.nazione}
        onChangeText={(text) => setFornitoreData({ ...fornitoreData, sedeLegale: { ...fornitoreData.sedeLegale, nazione: text } })}
      />
      <TextInput
        style={styles.input}
        placeholder="Telefono"
        value={fornitoreData.sedeLegale.telefono}
        onChangeText={(text) => setFornitoreData({ ...fornitoreData, sedeLegale: { ...fornitoreData.sedeLegale, telefono: text } })}
      />
      <Button title="Aggiungi Sede Amministrativa" onPress={addSedeAmministrativa} />
      {fornitoreData.sediAmministrative.map((sede, index) => (
        <View key={index}>
          <Text style={styles.subtitle}>Sede Amministrativa {index + 1}</Text>
          <TextInput
            style={styles.input}
            placeholder="Indirizzo"
            value={sede.indirizzo}
            onChangeText={(text) => {
              const newSediAmministrative = [...fornitoreData.sediAmministrative];
              newSediAmministrative[index].indirizzo = text;
              setFornitoreData({ ...fornitoreData, sediAmministrative: newSediAmministrative });
            }}
          />
          <TextInput
            style={styles.input}
            placeholder="Città"
            value={sede.citta}
            onChangeText={(text) => {
              const newSediAmministrative = [...fornitoreData.sediAmministrative];
              newSediAmministrative[index].citta = text;
              setFornitoreData({ ...fornitoreData, sediAmministrative: newSediAmministrative });
            }}
          />
          <TextInput
            style={styles.input}
            placeholder="Provincia"
            value={sede.provincia}
            onChangeText={(text) => {
              const newSediAmministrative = [...fornitoreData.sediAmministrative];
              newSediAmministrative[index].provincia = text;
              setFornitoreData({ ...fornitoreData, sediAmministrative: newSediAmministrative });
            }}
          />
          <TextInput
            style={styles.input}
            placeholder="CAP"
            value={sede.cap}
            onChangeText={(text) => {
              const newSediAmministrative = [...fornitoreData.sediAmministrative];
              newSediAmministrative[index].cap = text;
              setFornitoreData({ ...fornitoreData, sediAmministrative: newSediAmministrative });
            }}
          />
          <TextInput
            style={styles.input}
            placeholder="Nazione"
            value={sede.nazione}
            onChangeText={(text) => {
              const newSediAmministrative = [...fornitoreData.sediAmministrative];
              newSediAmministrative[index].nazione = text;
              setFornitoreData({ ...fornitoreData, sediAmministrative: newSediAmministrative });
            }}
          />
          <TextInput
            style={styles.input}
            placeholder="Telefono"
            value={sede.telefono}
            onChangeText={(text) => {
              const newSediAmministrative = [...fornitoreData.sediAmministrative];
              newSediAmministrative[index].telefono = text;
              setFornitoreData({ ...fornitoreData, sediAmministrative: newSediAmministrative });
            }}
          />
        </View>
      ))}
      <Button title="Aggiungi Logistica" onPress={addLogistica} />
      {fornitoreData.logistiche.map((logistica, index) => (
        <View key={index}>
          <Text style={styles.subtitle}>Logistica {index + 1}</Text>
          <TextInput
            style={styles.input}
            placeholder="Nome"
            value={logistica.nome}
            onChangeText={(text) => {
              const newLogistiche = [...fornitoreData.logistiche];
              newLogistiche[index].nome = text;
              setFornitoreData({ ...fornitoreData, logistiche: newLogistiche });
            }}
          />
          <TextInput
            style={styles.input}
            placeholder="Indirizzo"
            value={logistica.indirizzo}
            onChangeText={(text) => {
              const newLogistiche = [...fornitoreData.logistiche];
              newLogistiche[index].indirizzo = text;
              setFornitoreData({ ...fornitoreData, logistiche: newLogistiche });
            }}
          />
          <TextInput
            style={styles.input}
            placeholder="Città"
            value={logistica.citta}
            onChangeText={(text) => {
              const newLogistiche = [...fornitoreData.logistiche];
              newLogistiche[index].citta = text;
              setFornitoreData({ ...fornitoreData, logistiche: newLogistiche });
            }}
          />
          <TextInput
            style={styles.input}
            placeholder="Provincia"
            value={logistica.provincia}
            onChangeText={(text) => {
              const newLogistiche = [...fornitoreData.logistiche];
              newLogistiche[index].provincia = text;
              setFornitoreData({ ...fornitoreData, logistiche: newLogistiche });
            }}
          />
          <TextInput
            style={styles.input}
            placeholder="CAP"
            value={logistica.cap}
            onChangeText={(text) => {
              const newLogistiche = [...fornitoreData.logistiche];
              newLogistiche[index].cap = text;
              setFornitoreData({ ...fornitoreData, logistiche: newLogistiche });
            }}
          />
          <TextInput
            style={styles.input}
            placeholder="Nazione"
            value={logistica.nazione}
            onChangeText={(text) => {
              const newLogistiche = [...fornitoreData.logistiche];
              newLogistiche[index].nazione = text;
              setFornitoreData({ ...fornitoreData, logistiche: newLogistiche });
            }}
          />
          <TextInput
            style={styles.input}
            placeholder="Telefono"
            value={logistica.telefono}
            onChangeText={(text) => {
              const newLogistiche = [...fornitoreData.logistiche];
              newLogistiche[index].telefono = text;
              setFornitoreData({ ...fornitoreData, logistiche: newLogistiche });
            }}
          />
        </View>
      ))}
      <Button title="Aggiungi Riferimento" onPress={addRiferimento} />
      {fornitoreData.riferimenti.map((riferimento, index) => (
        <View key={index}>
          <Text style={styles.subtitle}>Riferimento {index + 1}</Text>
          <TextInput
            style={styles.input}
            placeholder="Nome"
            value={riferimento.nome}
            onChangeText={(text) => {
              const newRiferimenti = [...fornitoreData.riferimenti];
              newRiferimenti[index].nome = text;
              setFornitoreData({ ...fornitoreData, riferimenti: newRiferimenti });
            }}
          />
          <TextInput
            style={styles.input}
            placeholder="Ufficio"
            value={riferimento.ufficio}
            onChangeText={(text) => {
              const newRiferimenti = [...fornitoreData.riferimenti];
              newRiferimenti[index].ufficio = text;
              setFornitoreData({ ...fornitoreData, riferimenti: newRiferimenti });
            }}
          />
          <TextInput
            style={styles.input}
            placeholder="Email"
            value={riferimento.email}
            onChangeText={(text) => {
              const newRiferimenti = [...fornitoreData.riferimenti];
              newRiferimenti[index].email = text;
              setFornitoreData({ ...fornitoreData, riferimenti: newRiferimenti });
            }}
          />
          <TextInput
            style={styles.input}
            placeholder="Telefono"
            value={riferimento.telefono}
            onChangeText={(text) => {
              const newRiferimenti = [...fornitoreData.riferimenti];
              newRiferimenti[index].telefono = text;
              setFornitoreData({ ...fornitoreData, riferimenti: newRiferimenti });
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
          {fornitoreEsterno && (
            <View>
              <Text>Ragione Sociale: {fornitoreEsterno.ragioneSociale}</Text>
              <Text>Partita IVA: {fornitoreEsterno.partitaIva}</Text>
              <Text>Email: {fornitoreEsterno.email}</Text>
              <Text>PEC: {fornitoreEsterno.pec}</Text>
              <Text>Sede Legale:</Text>
              <Text>Indirizzo: {fornitoreEsterno.sedeLegale.indirizzo}</Text>
              <Text>Città: {fornitoreEsterno.sedeLegale.citta}</Text>
              <Text>Provincia: {fornitoreEsterno.sedeLegale.provincia}</Text>
              <Text>CAP: {fornitoreEsterno.sedeLegale.cap}</Text>
              <Text>Nazione: {fornitoreEsterno.sedeLegale.nazione}</Text>
              <Text>Telefono: {fornitoreEsterno.sedeLegale.telefono}</Text>
              <Text>Data Creazione: {fornitoreEsterno.dataCreazione ? fornitoreEsterno.dataCreazione.toDate().toLocaleString() : 'N/A'}</Text>
              <Text>Data Aggiornamento: {fornitoreEsterno.dataAggiornamento ? fornitoreEsterno.dataAggiornamento.toDate().toLocaleString() : 'N/A'}</Text>
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