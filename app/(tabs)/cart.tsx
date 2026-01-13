
import React, { useCallback } from 'react'
import { LinearGradient } from 'expo-linear-gradient';
import CartPage from '@/features/cart/components/CartPage';
import LoginScreen from '@/features/login/LoginScreen'
import { useAuth } from '@/context/AuthContext';
import Toast from 'react-native-toast-message';
import { useFocusEffect } from '@react-navigation/native';
const Page = () => {

  const { user } = useAuth()

  useFocusEffect(
    useCallback(() => {
      if (!user?.id) {
        Toast.show({
          type: "info",
          text1: "Please login or signup  to show favourite elements",
          visibilityTime: 2000,
        })
      }
    }, [user])
  )


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


      {user.id ? <CartPage /> : <LoginScreen />}
    </LinearGradient>
  )
}

export default Page

