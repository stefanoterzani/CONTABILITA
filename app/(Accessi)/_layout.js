import { Stack } from "expo-router";

export default function RootAccessi() {
  return (
    <Stack>
      <Stack.Screen name="menuAccessi" options={{ title: 'menuAccessi' }}/>
     <Stack.Screen name="listaAccessi" options={{ title: 'Lista Accessi' }}/>
    </Stack>
  );
}