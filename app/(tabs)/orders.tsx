
import React from 'react'
import { LinearGradient } from 'expo-linear-gradient'
import OrdersScreen from '@/features/orders/components/OrdersScreen'
import { useAuth } from '@/context/AuthContext'
import LoginScreen from '@/features/login/LoginScreen'

const Page = () => {

    const { user } = useAuth()
  

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
       
      {user.id? <OrdersScreen/>:<LoginScreen/>}

       </LinearGradient>
  )
}

export default Page
