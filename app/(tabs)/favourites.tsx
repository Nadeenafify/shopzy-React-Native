import React, { useCallback } from 'react'
import { LinearGradient } from 'expo-linear-gradient'
import FavouritesPgae from '@/features/favourites/components/FavouritesPage'
import { useAuth } from '@/context/AuthContext'
import LoginScreen from '@/features/login/LoginScreen'
import Toast from 'react-native-toast-message'
import { useFocusEffect } from '@react-navigation/native'

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

      {user?.id ? <FavouritesPgae /> : <LoginScreen />}
    </LinearGradient>
  )
}

export default Page
