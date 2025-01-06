import { Stack } from "expo-router";
import { ColumnDimensionsProvider } from '../context/ColumnDimensionsContext';
export default function RootClienti() {
  return (
    <ColumnDimensionsProvider>    
    <Stack>
      <Stack.Screen name="InserimentoClienti" options={{headerShown:false}}/>
      
    </Stack>
    </ColumnDimensionsProvider>  
  );
}