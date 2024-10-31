import React, { useState, useEffect,useContext } from 'react';
import { View, Text, TextInput, Button, ScrollView, StyleSheet, Alert } from 'react-native';
import { doc, setDoc, getDoc } from 'firebase/firestore';
import { db } from '../../firebaseConfig';
import { AuthContext } from '../../Context/AuthContext';

const AziendaForm = () => {
    const { azienda} = useContext(AuthContext);
//console.log('AZIENDA.id=',azienda.IdAzienda)

    const aziendaId=azienda.IdAzienda
    const [partitaIva, setPartitaIva] = useState('');
    const [nome, setNome] = useState('');
    const [codiceFiscale, setCodiceFiscale] = useState('');
    const [emails, setEmails] = useState(['']);
    const [pecs, setPecs] = useState(['']);
    const [riferimenti, setRiferimenti] = useState([{ ufficio: '', nome: '', email: '', telefono: '', fax: '' }]);
    const [sediAmministrative, setSediAmministrative] = useState([{ indirizzo: '', citta: '', provincia: '', cap: '', telefono: '', email: '' }]);
    const [sedeLegale, setSedeLegale] = useState({ indirizzo: '', citta: '', provincia: '', cap: '', telefono: '', email: '' });

    useEffect(() => {
        if (aziendaId) {
            console.log('AZIENDA.id=',azienda.idAzienda)
            const fetchData = async () => {
                const docRef = doc(db, 'Aziende', aziendaId);
                const aziendaDoc = await getDoc(docRef);
                if (aziendaDoc.exists()) {
                    const data = aziendaDoc.data();
                    setPartitaIva(data.partitaIva || '');
                    setNome(data.nome || '');
                    setCodiceFiscale(data.anagrafica?.codiceFiscale || '');
                    setEmails(data.anagrafica?.email || ['']);
                    setPecs(data.anagrafica?.pec || ['']);
                    setRiferimenti(data.anagrafica?.riferimenti || [{ ufficio: '', nome: '', email: '', telefono: '', fax: '' }]);
                    setSediAmministrative(data.anagrafica?.sediAmministrative || [{ indirizzo: '', citta: '', provincia: '', cap: '', telefono: '', email: '' }]);
                    setSedeLegale(data.anagrafica?.sedeLegale || { indirizzo: '', citta: '', provincia: '', cap: '', telefono: '', email: '' });
                }
            };
            fetchData();
        }
    }, [aziendaId]);

    const handleSave = async () => {
        if (!partitaIva || !nome) {
            Alert.alert("Errore", "I campi Partita IVA e Nome sono obbligatori");
            return;
        }

        const aziendaData = {
            partitaIva,
            nome,
            anagrafica: {
                codiceFiscale,
                email: emails,
                pec: pecs,
                riferimenti: riferimenti,
                sediAmministrative: sediAmministrative,
                sedeLegale: sedeLegale,
            },
        };

        try {
            const docRef = aziendaId ? doc(db, 'Aziende', aziendaId) : doc(db, 'Aziende', 'AUTO_GENERATE_ID');
            await setDoc(docRef, aziendaData, { merge: true });
            Alert.alert("Successo", "Anagrafica azienda salvata con successo");
            navigation.goBack();
        } catch (error) {
            console.error("Errore nel salvataggio:", error);
            Alert.alert("Errore", "Impossibile salvare i dati.");
        }
    };

    const updateArrayValue = (array, index, field, value, setFunction) => {
        const newArray = [...array];
        newArray[index] = { ...newArray[index], [field]: value };
        setFunction(newArray);
    };

    const addField = (setFunction, defaultValue) => setFunction(prev => [...prev, defaultValue]);

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <Text style={styles.label}>Partita IVA</Text>
            <TextInput style={styles.input} value={partitaIva} onChangeText={setPartitaIva} placeholder="Inserisci Partita IVA" />

            <Text style={styles.label}>Nome Azienda</Text>
            <TextInput style={styles.input} value={nome} onChangeText={setNome} placeholder="Inserisci Nome Azienda" />

            <Text style={styles.label}>Codice Fiscale</Text>
            <TextInput style={styles.input} value={codiceFiscale} onChangeText={setCodiceFiscale} placeholder="Inserisci Codice Fiscale" />

            <Text style={styles.label}>Email</Text>
            {emails.map((email, index) => (
                <TextInput
                    key={index}
                    style={styles.input}
                    value={email}
                    onChangeText={(text) => updateArrayValue(emails, index, '', text, setEmails)}
                    placeholder={`Email ${index + 1}`}
                />
            ))}
            <Button title="Aggiungi Email" onPress={() => addField(setEmails, '')} />

            <Text style={styles.label}>PEC</Text>
            {pecs.map((pec, index) => (
                <TextInput
                    key={index}
                    style={styles.input}
                    value={pec}
                    onChangeText={(text) => updateArrayValue(pecs, index, '', text, setPecs)}
                    placeholder={`PEC ${index + 1}`}
                />
            ))}
            <Button title="Aggiungi PEC" onPress={() => addField(setPecs, '')} />

            <Text style={styles.label}>Riferimenti</Text>
            {riferimenti.map((riferimento, index) => (
                <View key={index} style={styles.subContainer}>
                    <TextInput style={styles.input} placeholder="Ufficio" value={riferimento.ufficio} onChangeText={(text) => updateArrayValue(riferimenti, index, 'ufficio', text, setRiferimenti)} />
                    <TextInput style={styles.input} placeholder="Nome" value={riferimento.nome} onChangeText={(text) => updateArrayValue(riferimenti, index, 'nome', text, setRiferimenti)} />
                    <TextInput style={styles.input} placeholder="Email" value={riferimento.email} onChangeText={(text) => updateArrayValue(riferimenti, index, 'email', text, setRiferimenti)} />
                    <TextInput style={styles.input} placeholder="Telefono" value={riferimento.telefono} onChangeText={(text) => updateArrayValue(riferimenti, index, 'telefono', text, setRiferimenti)} />
                    <TextInput style={styles.input} placeholder="Fax" value={riferimento.fax} onChangeText={(text) => updateArrayValue(riferimenti, index, 'fax', text, setRiferimenti)} />
                </View>
            ))}
            <Button title="Aggiungi Riferimento" onPress={() => addField(setRiferimenti, { ufficio: '', nome: '', email: '', telefono: '', fax: '' })} />

            <Text style={styles.label}>Sedi Amministrative</Text>
            {sediAmministrative.map((sede, index) => (
                <View key={index} style={styles.subContainer}>
                    <TextInput style={styles.input} placeholder="Indirizzo" value={sede.indirizzo} onChangeText={(text) => updateArrayValue(sediAmministrative, index, 'indirizzo', text, setSediAmministrative)} />
                    <TextInput style={styles.input} placeholder="Città" value={sede.citta} onChangeText={(text) => updateArrayValue(sediAmministrative, index, 'citta', text, setSediAmministrative)} />
                    <TextInput style={styles.input} placeholder="Provincia" value={sede.provincia} onChangeText={(text) => updateArrayValue(sediAmministrative, index, 'provincia', text, setSediAmministrative)} />
                    <TextInput style={styles.input} placeholder="CAP" value={sede.cap} onChangeText={(text) => updateArrayValue(sediAmministrative, index, 'cap', text, setSediAmministrative)} />
                    <TextInput style={styles.input} placeholder="Telefono" value={sede.telefono} onChangeText={(text) => updateArrayValue(sediAmministrative, index, 'telefono', text, setSediAmministrative)} />
                    <TextInput style={styles.input} placeholder="Email" value={sede.email} onChangeText={(text) => updateArrayValue(sediAmministrative, index, 'email', text, setSediAmministrative)} />
                </View>
            ))}
            <Button title="Aggiungi Sede Amministrativa" onPress={() => addField(setSediAmministrative, { indirizzo: '', citta: '', provincia: '', cap: '', telefono: '', email: '' })} />

            <Text style={styles.label}>Sede Legale</Text>
            <TextInput style={styles.input} placeholder="Indirizzo" value={sedeLegale.indirizzo} onChangeText={(text) => setSedeLegale({ ...sedeLegale, indirizzo: text })} />
            <TextInput style={styles.input} placeholder="Città" value={sedeLegale.citta} onChangeText={(text) => setSedeLegale({ ...sedeLegale, citta: text })} />
            <TextInput style={styles.input} placeholder="Provincia" value={sedeLegale.provincia} onChangeText={(text) => setSedeLegale({ ...sedeLegale, provincia: text })} />
            <TextInput style={styles.input} placeholder="CAP" value={sedeLegale.cap} onChangeText={(text) => setSedeLegale({ ...sedeLegale, cap: text })} />
            <TextInput style={styles.input} placeholder="Telefono" value={sedeLegale.telefono} onChangeText={(text) => setSedeLegale({ ...sedeLegale, telefono: text })} />
            <TextInput style={styles.input} placeholder="Email" value={sedeLegale.email} onChangeText={(text) => setSedeLegale({ ...sedeLegale, email: text })} />

            <Button title="Salva" onPress={handleSave} />
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        padding: 16,
        backgroundColor: '#fff',
    },
    label: {
        fontSize: 16,
        fontWeight: 'bold',
        marginVertical: 8,
    },
    input: {
        height: 40,
        borderColor: '#ccc',
        borderWidth: 1,
        borderRadius: 5,
        paddingHorizontal: 10,
        marginBottom: 10,
    },
    subContainer: {
        marginBottom: 20,
        padding: 10,
        backgroundColor: '#f0f0f0',
        borderRadius: 8,
    }
});

export default AziendaForm;
