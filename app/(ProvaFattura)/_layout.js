import { Stack } from "expo-router";

export default function RootProvaFattura() {
  return (
    <Stack>
    <Stack.Screen name="modelloFattura" options={{ title: 'Modello Fattura' }} />
    
    </Stack>
  );
}