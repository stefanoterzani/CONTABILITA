import { Stack } from "expo-router";

export default function RootFornitori() {
  return (
    <Stack>
    <Stack.Screen name="menuFornitori" options={{ title: 'menuFornitori' }} />
 
    </Stack>
  );
}

/*    
<Stack.Screen name="anagraficaFornitore" options={{ title: 'AnagraficaFornitore' }} />
     <Stack.Screen name="ElencoFornitori" options={{ title: 'Elenco Fornitori' }} />
     <Stack.Screen name="dettagliFornitore" options={{ title: 'Dettagli Fornitore' }} />

     */
