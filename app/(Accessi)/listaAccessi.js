import React, { useContext, useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet ,ActivityIndicator} from 'react-native';
import { AuthContext } from '../../context/AuthContext';
import { getAccessiConNomi } from '../../context/Accessi/FunzioniAccessi';
import LottieView from 'lottie-react-native';

const AccessiUtenti = () => {
 const { dataUser} = useContext(AuthContext);
 const [accessi, setAccessi] = useState([]);
 const [loading, setLoading] = useState(true); // Stato di caricamento
 
 useEffect(() => {
    const fetchAccessi = async () => {
      if (dataUser.idAzienda) {
        const accessiConNomi = await getAccessiConNomi(dataUser.idAzienda);
        setAccessi(accessiConNomi);
        setLoading(false); // Imposta lo stato di caricamento a false
      }
    };

    fetchAccessi();
  }, []);

  const renderItem = ({ item }) => (
    <View style={styles.item}>
      <Text style={styles.title}>{item.nome}</Text>
      <View style={{flexDirection:'row'}}>
            <Text style={{paddingRight:10}}>{item.appName}</Text>
            <Text>{new Date(item.timestamp.seconds * 1000).toLocaleString()}</Text>
           
      </View>
    </View>
  );

  if (loading) {
    return (
        <View style={styles.loadingContainer}>
        <LottieView
          source={require('../../assets/animazioni/omino.json')} // Percorso dell'animazione JSON
          autoPlay
          loop
          style={styles.lottie}
        />
      </View>
    );
  }

  return (
    <FlatList
      data={accessi}
      renderItem={renderItem}
      keyExtractor={(item, index) => index.toString()}
    />
  );
};

const styles = StyleSheet.create({
  item: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  lottie: {
    width: 200,
    height: 200,
  },
});

export default AccessiUtenti;