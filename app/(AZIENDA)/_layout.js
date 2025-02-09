import { Stack } from "expo-router";

export default function RootAzienda() {
  return (
    <Stack>
     <Stack.Screen name="InserimentoAzienda" options={{headerShown:false}}/>
      
    </Stack>
  );
}
/* <Stack.Screen name="InserimentoClienti" options={{headerShown:false}}/> */