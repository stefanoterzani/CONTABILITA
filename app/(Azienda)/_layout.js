import { Stack } from "expo-router";

export default function RootAzienda() {
  return (
    <Stack>
      <Stack.Screen name="menuAzienda" options={{ title: 'menuAzienda' }}/>
     <Stack.Screen name="inserimentoAzienda" options={{ title: 'inserimentoAzienda' }}/>
    </Stack>
  );
}