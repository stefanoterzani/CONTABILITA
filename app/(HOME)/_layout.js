import { Stack } from "expo-router";

export default function RootHome() {
  return (
    <Stack>
      <Stack.Screen name="Home" options={{headerShown:false}}/>
      
    </Stack>
  );
}