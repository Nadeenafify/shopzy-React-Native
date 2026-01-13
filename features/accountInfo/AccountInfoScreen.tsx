import {  Image, ScrollView, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { useAuth } from '@/context/AuthContext'
import { useRouter } from 'expo-router'
import { MaterialCommunityIcons } from '@expo/vector-icons'


const AccountInfoScreen = () => {

  const { user, setUser } = useAuth()
  const router = useRouter()
 

  const handleLogout = () => {
    setUser({})
    router.replace("/")
  }


  return (
 <ScrollView style={{ flex: 1, padding: 20 }}>
     
      <View className="items-center mb-8">
        <Image
          source={{ uri: user.avatar || "https://via.placeholder.com/100" }}
          className="w-24 h-24 rounded-full mb-4"
        />
        <Text className="text-2xl font-bold">{user.name || "User Name"}</Text>
        <Text className="text-gray-500 mt-1">{user.email}</Text>
      </View>

 
      <View className="flex flex-col gap-3">
        <TouchableOpacity
          onPress={() => router.replace("/cart")}
          activeOpacity={0.8}
          className="flex-row items-center justify-between px-5 py-3 bg-gray-100 rounded-xl shadow-md"
        >
          <Text className="text-base font-semibold">My Cart</Text>
          <MaterialCommunityIcons name="cart" size={24} color="#000" />
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => router.replace("/favourites")}
          activeOpacity={0.8}
          className="flex-row items-center justify-between px-5 py-3 bg-gray-100 rounded-xl shadow-md"
        >
          <Text className="text-base font-semibold">Favourites</Text>
          <MaterialCommunityIcons name="heart" size={24} color="#e63946" />
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => router.replace("/orders")}
          activeOpacity={0.8}
          className="flex-row items-center justify-between px-5 py-3 bg-gray-100 rounded-xl shadow-md"
        >
          <Text className="text-base font-semibold">My Orders</Text>
          <MaterialCommunityIcons name="clipboard-list" size={24} color="#000" />
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => router.replace("/address?order=0")}
          activeOpacity={0.8}
          className="flex-row items-center justify-between px-5 py-3 bg-gray-100 rounded-xl shadow-md"
        >
          <Text className="text-base font-semibold">My Addresses</Text>
          <MaterialCommunityIcons name="map-marker" size={24} color="#000" />
        </TouchableOpacity>
      </View>

    
      <TouchableOpacity
        onPress={handleLogout}
        activeOpacity={0.8}
        className="flex-row mt-8 mb-5 items-center justify-center gap-2 bg-red-500 rounded-xl px-5 py-3 shadow-md"
      >
        <MaterialCommunityIcons name="logout" size={20} color="white" />
        <Text className="text-white font-semibold text-base">Logout</Text>
      </TouchableOpacity>


    </ScrollView>
  )
}

export default AccountInfoScreen
