import { Stack } from "expo-router";

export default function RootOrdiniCliente() {
  return (
    <Stack>
      <Stack.Screen name="creaOrdineCliente" options={{headerShown:false}}/>
    
    </Stack>
  );
}