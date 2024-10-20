import { router } from "expo-router";
import { Text, View,Pressable, StyleSheet, } from "react-native";

export default function Index() {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Text>Edit app/index.tsx to edit this screen.</Text>
      <Pressable 
          onPress={()=>  router  .push('SignIn')}  
          style={{marginTop:20}}
      >
      <Text style={{fontSize:20, color:'blue'}}>Vai a Signin</Text>
    </Pressable>

    <Pressable 
          style={{marginTop:20}}
          onPress={()=>  router  .push('SignUp')}  
      >
      <Text style={{fontSize:20, color:'blue'}}>Vai a SignUp</Text>
    </Pressable>
    </View>
  );
}
