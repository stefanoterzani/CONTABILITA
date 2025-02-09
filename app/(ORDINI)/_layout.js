import { Stack } from "expo-router";

export default function RootOrdiniClienti() {
  return (
    <Stack>
     <Stack.Screen name="InserimentoOrdineCliente" options={{headerShown:false}}/>
      
    </Stack>
  );
}