import { Stack } from "expo-router";

export default function RootClienti() {
  return (
    <Stack>
    <Stack.Screen name="menuClienti" options={{ title: 'menuClienti' }} />
     <Stack.Screen name="anagraficaCliente" options={{ title: 'AnagraficaCliente' }} />
     <Stack.Screen name="ElencoClienti" options={{ title: 'Elenco Clienti' }} />
     <Stack.Screen name="dettagliCliente" options={{ title: 'Dettagli Cliente' }} />
   
    </Stack>
  );
}