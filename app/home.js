import { View, Text, Button } from 'react-native';
import { useAuth } from '../Context/AuthContext';
import { useRouter } from 'expo-router';

export default function Home() {
  const { user, companyName, logout } = useAuth();
  const router = useRouter();

  const handleLogout = async () => {
    await logout(); // Logout dall'utente
    router.replace('/SignIn'); // Torna alla schermata di login
  };

  return (
    <View>
      <Text>Welcome, {user ? user.email : 'Guest'}</Text>
      {companyName && <Text>Company: {companyName}</Text>} 
      <Button title="Logout" onPress={handleLogout} />
    </View>
  );
}



