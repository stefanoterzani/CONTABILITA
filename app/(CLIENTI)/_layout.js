import { Stack } from "expo-router";

export default function RootClienti() {
  return (
    <Stack>
      <Stack.Screen name="InserimentoClienti" options={{headerShown:false}}/>
      
    </Stack>
  );
}