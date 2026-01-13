
import React from 'react'
import LoginScreen from '@/features/login/LoginScreen'
import { LinearGradient } from 'expo-linear-gradient'
import { useAuth } from '@/context/AuthContext'
import AccountInfoScreen from '@/features/accountInfo/AccountInfoScreen'

const Page = () => {

   const {user}=useAuth()

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
      {user?.id?<AccountInfoScreen/>:<LoginScreen />}
    </LinearGradient>
  )
}

export default Page

