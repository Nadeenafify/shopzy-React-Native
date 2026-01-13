import { Alert, ScrollView, Text, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import AddressInput from './AddressInput'
import { useAddresses } from '@/context/AdressContext'
import { Address } from '@/types/address'
import AddressCard from './AddressCard'
import { useRouter, useSearchParams } from 'expo-router/build/hooks'
import Toast from 'react-native-toast-message'
import { useOrders } from '@/context/OrdersContext'
import { useCart } from '@/context/CartContext'
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons'


const AddressPage = () => {

  const { addresses } = useAddresses()
  const [addnewAddress, setAddNewAddress] = useState(false)
  const searchParams = useSearchParams()
  const order = searchParams.get("order")
  const { addOrder } = useOrders();
  const { cart, clearCart } = useCart()
  const { selectedAddress } = useAddresses()
  const router = useRouter()

  function ConfirmOrder() {

    router.push("/orders")
    Array.from({ length: cart.length }).map((_, index) => {
      addOrder(cart[index], cart[index].quantity)
    })

    Toast.show({
      text1: "Products Ordered Successfully",
      type: "success",
      visibilityTime: 2000
    })
    setTimeout(() => {
      clearCart();
    }, 500);




  }

  return (
    <ScrollView
      contentContainerStyle={{ paddingBottom: 80 }}
      className='w-full px-4 '>

      <TouchableOpacity
        className='mb-4 mt-1'
        onPress={() => {
          router.push("/")
        }}
      >
        <Ionicons name="chevron-back-circle-outline" size={40} color="#f87171" />
      </TouchableOpacity>

      <Text className="text-3xl font-bold text-gray-800 mb-4">Address</Text>


      {addresses.map((ele: Address) => {
        return <AddressCard key={ele.id} address={ele} />
      })}

      {
        (addresses.length === 0 || addnewAddress) &&
        <AddressInput close={() => setAddNewAddress(false)} />
      }

      {
        (!addnewAddress && addresses.length > 0) &&
        <TouchableOpacity
          onPress={() => setAddNewAddress(true)}
          className={`bg-green-600 py-3 mt-10 px-5 rounded-lg items-center my-2 }`}
        >
          <Text className="text-white font-bold text-base">Add New Address</Text>
        </TouchableOpacity>
      }

      {
        (Number(order) === 1) &&
        <TouchableOpacity
          onPress={() => {

            if (selectedAddress?.id) {
              Alert.alert(
                "Confirm Order",
                "Are you sure you want to place this order? (Cash on Delivery)",
                [
                  {
                    text: "cancel",
                    style: "cancel"
                  },
                  {
                    text: "confirm",
                    onPress: ConfirmOrder,
                    style: "default"
                  }

                ]
              )
            }

            else {
              Toast.show({
                text1: "Please add Your address information",
                type: "error",
                visibilityTime: 2000
              })
            }

          }}
          activeOpacity={0.8}
          className="flex-row mb-5  items-center justify-center gap-2 bg-red-500 rounded-xl px-5 py-3 mt-5 shadow-md"
        >
          <MaterialCommunityIcons
            name="clipboard-text-outline"
            size={20}
            color="white"
          />

          <Text className="text-white font-semibold text-base">
            Order
          </Text>
        </TouchableOpacity>

      }

    </ScrollView>
  )
}

export default AddressPage

