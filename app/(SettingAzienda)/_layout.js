import { Stack } from "expo-router";

export default function RootSettings() {
  return (
    <Stack>
     <Stack.Screen name="MenuSetting" options={{ title: 'MenuSetting' }} />
      <Stack.Screen name="InserisciLogo" options={{ title: 'InserisciLogo' }} />
      <Stack.Screen name="CreaNuovoUtente" options={{ title: 'CreaNuovoUtente' }} />
     
    </Stack>
  );
}