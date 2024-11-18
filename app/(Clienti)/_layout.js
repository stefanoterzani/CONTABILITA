import { Stack } from "expo-router";

export default function RootClienti() {
  return (
    <Stack>
      <Stack.Screen name="menuClienti" options={{headerShown:false}}/>
     <Stack.Screen name="creaNuovoCliente" options={{ title: 'Crea Nuovo Cliente' }}/>
    </Stack>
  );
}