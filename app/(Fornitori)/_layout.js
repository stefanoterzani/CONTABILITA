import { Stack } from "expo-router";

export default function RootFornitori() {
  return (
    <Stack>
      <Stack.Screen name="menuFornitori" options={{headerShown:false}}/>
     <Stack.Screen name="creaNuovoFornitore" options={{ title: 'Crea Nuovo Fornitore' }}/>
    </Stack>
  );
}