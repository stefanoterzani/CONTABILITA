import { Stack } from "expo-router";

export default function RootStartAzienda() {
  return (
    <Stack>
     <Stack.Screen name="menuStartAzienda" options={{ title: 'menuStartAzienda' }} />
     <Stack.Screen name="anagraficaAzienda" options={{ title: 'Crea anagrafica Azienda' }} />
    </Stack>
  );
}