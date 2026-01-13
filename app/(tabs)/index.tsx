import HomePage from '@/features/home/components/HomePage';
import { LinearGradient } from 'expo-linear-gradient';


export default function HomeScreen() {
   

  return (
    <LinearGradient
      colors={['#FDF0F3', '#FFFBFC']}
      style={{
        flex: 1,
        padding: 3,
        borderRadius: 5,
        paddingTop: 30,
      }}
    >

        <HomePage />
 
    </LinearGradient>

  );
}

