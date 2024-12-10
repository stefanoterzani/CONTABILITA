import { Stack } from "expo-router";

export default function RootFatture() {
  return (
    <Stack>
      <Stack.Screen name="menuFatture" options={{headerShown:false}}/>
     
    </Stack>
  );
}