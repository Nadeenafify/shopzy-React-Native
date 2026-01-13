import { Tabs } from 'expo-router';
import React from 'react';
import "../../global.css"
import { AntDesign, Entypo, MaterialCommunityIcons } from "@expo/vector-icons";


export default function TabLayout() {



  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: "#f87c63",
        tabBarInactiveTintColor: "gray",
        tabBarShowLabel: false,

      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',

          tabBarIcon: ({ color, size }) =>
            <Entypo size={size} name="home" color={color} />,
        }}
      />



      <Tabs.Screen
        name="favourites"
        options={{
          title: 'favouries',
          tabBarIcon: ({ color, size }) =>
            <MaterialCommunityIcons
              name="heart"
              size={size}
              color={color}
            />,
            
        }}   
      />

      <Tabs.Screen
        name="cart"
        options={{
          title: 'Cart',

          tabBarIcon: ({ color, size }) =>
            <Entypo size={size} name="shopping-cart" color={color} />,
        }}
      />

        <Tabs.Screen
        name="orders"
        options={{
          title: 'orders',
          tabBarIcon: ({ color, size }) =>
           <AntDesign  name="calendar" size={size} color={color} />,
        }}
      />

      <Tabs.Screen
        name="account"
        options={{
          title: 'account',
          tabBarIcon: ({ color, size }) =>
            <Entypo size={size} name="user" color={color} />,
        }}
      />

    </Tabs>
  );
}
