import { Stack } from "expo-router";

export default function RootCreazioneArchivi() {
  return (
    <Stack>
      <Stack.Screen name="HomeGenerazione" options={{ title: 'HomeGenerazione' }} />
      <Stack.Screen name="AggiungeCliente" options={{ title: 'AggiungeCliente' }} />
      <Stack.Screen name="GeneraRuolo"  options={{ title: 'GeneraRuolo' }}/>
      <Stack.Screen name="CreaArchivi"  options={{ title: 'CreaArchivi' }}/>
     
    </Stack>
  );
}