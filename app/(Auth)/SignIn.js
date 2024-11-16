import React, { useState, useContext, useEffect } from 'react';
import { Modal, View, Text, TextInput, Button, StyleSheet,Pressable,Platform } from 'react-native';
import { useRouter } from 'expo-router';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { AuthContext } from '../../context/AuthContext';
import { Audio } from 'expo-av'; // Importa correttamente Audio da expo-av

export default function Login() {
  const [email, setEmail] = useState('pippo@gmail.com');
  const [telefono, setTelefono] = useState('1234567890'); // Usato solo per il primo accesso
  const [password, setPassword] = useState('12345678');
  const [nome,setNome]=useState('pippo')
  const { loginUser, loading , aziendaId,dataUser} = useContext(AuthContext);
  const [isModalVisible, setModalVisible] = useState(false)
  const router = useRouter();
  
 
 
  useEffect(() => {
    if (!loading && dataUser) {
      // La condizione è verificata quando il caricamento è completato e aziendaId è valido
      console.log('Azienda ID:', dataUser);
      router.replace('/home');
    }
  }, [loading, dataUser]);


/*
const playSound = async () => {
  console.log('Loading Sound');
  const { sound } = await Audio.Sound.createAsync(
    require('../../assets/suoni/credenziali .aac'), // Percorso del file audio locale
    { shouldPlay: true }
  );

  await sound.playAsync();
};
*/
const playBeep = async () => {
  const { sound } = await Audio.Sound.createAsync(
    require('../../assets/suoni/warning.mp3')
  );
  await sound.playAsync();
};

  const handleLogin = async () => {
    if (!email || !password) {
      alert('Per favore, compila tutti i campi necessari');
      return;
    }
  //  console.log('STO PER FARE LOGIN',email, password, nome, telefono)
    await loginUser(email, password, nome, telefono);
 //   console.log('DOPO LOGIN Loading=',loading, "USER",dataUser)
    
    
    if (!loading && dataUser) {
      router.replace('/home');
    }
    else if (!loading && !dataUser) {
      //playSound();
      toggleModal();
     //  setModalVisible(true)
     //router.replace('/SignIn');
    }
   
 
  };

 const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };
  
/*
  if (loading) {
    return (
      <View style={styles.container}>
        <Text>Caricamento...</Text>
      </View>
    );
  }
*/
  return (
    <View style={styles.container}>
   
    <Pressable style={{alignItems:'flex-start', marginTop:20, marginLeft:20}}
          onPress={()=> router.replace('/')}>
        <FontAwesome name="home" size={30} color="black" />
    </Pressable>
        <View style={{alignItems:'center'}}>
        <View style={
                  Platform.OS ==='web' ?   
                      styles.loginContainerWeb 
                      : 
                      styles.loginContainerMobile}>
            <Text style={{fontSize:20,fontFamily:'Poppins-Bold'}}>Login</Text>
            <TextInput
                placeholder="Email"
                value={email}
                onChangeText={setEmail}
                style={styles.input}
            />
    
            <TextInput
                placeholder="Password"
                value={password}
                onChangeText={setPassword}
                secureTextEntry
                style={styles.input}
            />
            <TextInput
                placeholder="Nome (solo per primo accesso)"
                value={nome}
                onChangeText={setNome}
                style={styles.input}
            />

            <TextInput
                placeholder="Telefono (solo per primo accesso)"
                value={telefono}
                onChangeText={setTelefono}
                style={styles.input}
            />
           
        </View>
        <View style={{marginTop:'5%'}} >
            <Button title="Login" onPress={handleLogin} />
        </View>

      {/*     
      <Modal
        isVisible={isModalVisible}
        onBackdropPress={toggleModal}
        animationIn="slideInUp"
        animationOut="slideOutDown"
        backdropOpacity={0.5} // Riduci l'opacità dello sfondo
        style={styles.modal}
      >
        <View style={styles.modalContent}>
          <Text style={styles.errorText}>La tua Azienda non esiste ancora </Text>
          <Button title="Chiudi" onPress={toggleModal} />
        </View>
      </Modal>
    */}
      </View>



    

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
   
  },
  loginContainerWeb:{
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    borderColor:'blue',
    borderWidth:2,
    width:'30%',
    marginTop:'10%'
  },
  loginContainerMobile:{
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    borderColor:'blue',
    borderWidth:2,
    width:'90%',
    marginTop:'10%'
  },
  input: {
    width: '100%',
    padding: 10,
    marginVertical: 5,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 10,
    fontFamily: 'Poppins-Regular',
    fontSize:18
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
  },
  errorText: {
    color: 'red',
    marginBottom: 10,
  },
});
