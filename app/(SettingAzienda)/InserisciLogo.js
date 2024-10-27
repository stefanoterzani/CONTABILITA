import React, { useState, useContext } from 'react';
import { View, Button, Image, ActivityIndicator, StyleSheet } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { db } from '../../firebaseConfig';
import { doc, setDoc } from 'firebase/firestore';
import { useRouter, useSearchParams } from 'expo-router';
import { AuthContext } from '../../Context/AuthContext';

export default function InserisciLogo() {
  const [image, setImage] = useState(null);
  const [uploading, setUploading] = useState(false);
  const { currentUser, logoutUser, loading,azienda,dataUser} = useContext(AuthContext);
    
  const companyId=azienda.IdAzienda
 //console.log("COMPANY=",companyId)



const pickImage = async () => {
  
  let result = await ImagePicker.launchImageLibraryAsync({
    allowsEditing: true,
    quality: 1,
  });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
     
    }

    console.log(result.assets[0].uri)
  };
 
  const uploadImage = async () => {
    if (!image) return;

    setUploading(true);

    const storage = getStorage();
    const response = await fetch(image);
    const blob = await response.blob();

    // Crea una directory esclusiva per ciascuna azienda basata su ID azienda
    const storageRef = ref(storage, `aziende/${companyId}/logo`);
    await uploadBytes(storageRef, blob);

    const downloadURL = await getDownloadURL(storageRef);
    await setDoc(doc(db, 'aziende', companyId), {
      logoURL: downloadURL,
    }, { merge: true });

    setUploading(false);
  };

  return (
    <View style={styles.container}>
      <Button title="Scegli Immagine" onPress={pickImage} />
      {image && <Image source={{ uri: image }} style={styles.image} />}
      {uploading ? <ActivityIndicator size="large" color="#0000ff" /> : <Button title="Carica Immagine" onPress={uploadImage} />}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    width: 200,
    height: 200,
    marginVertical: 10,
  },
});
