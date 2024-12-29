import { Text, TouchableOpacity, View } from "react-native";
import React from "react";
import {useRouter } from "expo-router";

export default function Index() {
  const router = useRouter();
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
    <TouchableOpacity onPress={()=> router.push('/Home')}>
      <Text style={{color:'blue', fontSize:30}}>Vai a Home</Text>
      </TouchableOpacity>
    </View>
  );
}
