import { Stack } from "expo-router";

export default function RootAuth() {
  return (
    <Stack>
      <Stack.Screen name="SignIn" options={{ title: 'SignIn' }} />
      <Stack.Screen name="SignUp"  options={{ title: 'SignUp' }}/>
      <Stack.Screen name="SignOut" options={{ title: 'SignOut' }}/>
     
     
    </Stack>
  );
}
