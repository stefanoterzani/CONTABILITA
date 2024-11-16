import { Stack } from "expo-router";

export default function RootClienti() {
  return (
    <Stack>
      <Stack.Screen name="menuClienti" options={{ title: 'Menu Clienti' }}/>
     <Stack.Screen name="inserimentoCliente" options={{ title: 'InserisciCliente' }}/>
    </Stack>
  );
}